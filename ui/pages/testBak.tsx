import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import io, { SocketIOClient } from "socket.io-client";
import Video from "../components/Video";
import { getCookie } from "../utils/cookie";

type WebRTCUser = {
  id: string;
  email: string;
  stream: MediaStream;
};

const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const constraints = {
  audio: true,
  video: { width: 640, height: 480 },
};

const getWebcam = async (callback) => {
  try {
    await navigator.mediaDevices.getUserMedia(constraints).then(callback);
  } catch (err) {
    if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
      //required track is missing
      console.log(`getUserMedia NotFoundError error: ${err}`);
    } else if (
      err.name == "NotReadableError" ||
      err.name == "TrackStartError"
    ) {
      //webcam or mic are already in use
      console.log(`getUserMedia NotReadableError error: ${err}`);
    } else if (
      err.name == "OverconstrainedError" ||
      err.name == "ConstraintNotSatisfiedError"
    ) {
      //constraints can not be satisfied by avb. devices
      console.log(`getUserMedia OverconstrainedError error: ${err}`);
    } else if (
      err.name == "NotAllowedError" ||
      err.name == "PermissionDeniedError"
    ) {
      //permission denied in browser
      console.log(`getUserMedia NotAllowedError error: ${err}`);
    } else if (err.name == "TypeError" || err.name == "TypeError") {
      //empty constraints object
      console.log(`getUserMedia TypeError error: ${err}`);
    } else {
      //other errors
      console.log(`getUserMedia error: ${err}`);
    }
    return undefined;
  }
};

const SOCKET_SERVER_URL = "wss://wss.non-contact-karaoke.xyz";

const Room: React.FC = ({}) => {
  const router = useRouter();
  let roomId = getCookie("room_id");
  let userID = getCookie("user_name");
  if (userID == undefined) {
    userID = "unamed";
  }

  if (roomId == undefined) {
    roomId = "undefined";
  }

  const [chatMsg, setChatMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>(null);
  const [users, setUsers] = useState<WebRTCUser[]>([]);

  const [playing, setPlaying] = React.useState(undefined);

  const createPeerConnection = useCallback(
    (socketID: string, email: string) => {
      try {
        const pc = new RTCPeerConnection(pc_config);

        pc.onicecandidate = (e) => {
          if (!(socketRef.current && e.candidate)) return;
          console.log("onicecandidate");
          socketRef.current.emit("candidate", {
            candidate: e.candidate,
            candidateSendID: socketRef.current.id,
            candidateReceiveID: socketID,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

        pc.ontrack = (e) => {
          console.log("ontrack success");
          setUsers((oldUsers) =>
            oldUsers
              .filter((user) => user.id !== socketID)
              .concat({
                id: socketID,
                email,
                stream: e.streams[0],
              })
          );
        };

        if (localStreamRef.current) {
          console.log("localstream add");
          localStreamRef.current.getTracks().forEach((track) => {
            if (!localStreamRef.current) return;
            pc.addTrack(track, localStreamRef.current);
          });
        } else {
          console.log("no local stream");
        }

        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    []
  );

  useEffect(() => {
    console.log("In UseEffect");
    socketRef.current = io.connect(SOCKET_SERVER_URL);

    if (navigator.mediaDevices === undefined) {
      alert("Your browers is looks like too old!");
    }
    if (!socketRef.current) {
      return;
    }

    getWebcam((localStream) => {
      console.log("!!!!!!!");
      setPlaying(true);
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;

      socketRef.current.emit("join_room", {
        room: roomId,
        email: userID,
      });
    });

    socketRef.current.on(
      "all_users",
      (allUsers: Array<{ id: string; email: string }>) => {
        allUsers.forEach(async (user) => {
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(user.id, user.email);
          if (!(pc && socketRef.current)) return;
          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log("create offer success", user.email, user.id);
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));

            socketRef.current.emit("offer", {
              sdp: localSdp,
              offerSendID: socketRef.current.id,
              offerSendEmail: user.email,
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      }
    );

    socketRef.current.on(
      "getOffer",
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string;
        offerSendEmail: string;
      }) => {
        const { sdp, offerSendID, offerSendEmail } = data;
        console.log("get offer");
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendEmail);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log("answer set remote description success");
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit("answer", {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      }
    );

    socketRef.current.on(
      "getAnswer",
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log("get answer");
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    );

    socketRef.current.on(
      "getCandidate",
      async (data: {
        candidate: RTCIceCandidateInit;
        candidateSendID: string;
      }) => {
        console.log("get candidate");
        const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log("candidate add success");
      }
    );

    socketRef.current.on("user_exit", (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection]);

  const startOrStop = async () => {
    if (playing) {
      const s = localStreamRef.current;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((localStream) => {
        setPlaying(true);
        console.log("!!!!!!!!!!", localStream);

        localStreamRef.current = localStream;
        if (localVideoRef.current)
          localVideoRef.current.srcObject = localStream;

        // videoRef.current.srcObject = stream;
      });
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="text-green-500">room id : {roomId}</div>
        <button color="warning" onClick={() => startOrStop()}>
          {playing ? "Stop" : "Start"}{" "}
        </button>
        <div className="flex flex-row">
          <video
            style={{
              width: 240,
              height: 240,
              margin: 5,
              backgroundColor: "black",
            }}
            muted
            ref={localVideoRef}
            autoPlay
          />
          {users.map((user, index) => (
            <Video key={index} email={user.email} stream={user.stream} />
          ))}
        </div>
      </div>
      <input
        id="chat_message"
        type="text"
        autoComplete="off"
        placeholder="Type message here..."
        onChange={(e) => {
          setChatMsg(e.target.value);
        }}
      />
      <div
        id="send"
        className="options__button"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Send Message!
      </div>
    </div>
  );
};

export default Room;
