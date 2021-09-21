import React, { useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useEffect } from "react";
import * as rtc_pc from "../utils/rtc_pc_config";
// import * as ws from "ws"

const Test: React.FC<{}> = ({}) => {
  let newSocket: WebSocket;
  const [pc, setPc] = useState<RTCPeerConnection>();
  const [socket, setSocket] = useState<Socket>();
  const [init, setInit] = useState(false);

  let localVideoRef = useRef<HTMLVideoElement>(null);
  let remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!init) {
      console.log("starting creating socket!");
      newSocket = new WebSocket("wss://localhost:5000");

      newSocket.onopen = (id) => {
        console.log(id);
      };

      // newSocket.on("open", (id) => {
      //   //socket.emit("join-room", 1234, "id", "user");
      //   console.log(id);
      // });
      /*let newPC = new RTCPeerConnection(rtc_pc.pc_config);

      newSocket.on(
        "all_users",
        (allUsers: Array<{ userID: string; userName: string }>) => {
          let len = allUsers.length;
          if (len > 0) {
            createOffer();
          }
        }
      );

      

      newSocket.on("error", (err: Error) => {
        console.log("peer connection error", err);
        //   newSocket.reconnect()
      });

      newSocket.on("getOffer", (sdp: RTCSessionDescription) => {
        console.log("get offer");
        createAnswer(sdp);
      });

      newSocket.on("getAnswer", (sdp: RTCSessionDescription) => {
        console.log("get answer");
        newPC.setRemoteDescription(new RTCSessionDescription(sdp));
        console.log(sdp);
      });

      newSocket.on("getCandidate", (candidate: RTCIceCandidateInit) => {
        newPC.addIceCandidate(new RTCIceCandidate(candidate)).then(() => {
          console.log("candidate add success");
        });
      });*/

      // setSocket(newSocket);
      //setPc(newPC);

      /*navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          if (localVideoRef.current) localVideoRef.current.srcObject = stream;

          stream.getTracks().forEach((track) => {
            newPC.addTrack(track, stream);
          });
          newPC.onicecandidate = (e) => {
            if (e.candidate) {
              console.log("onicecandidate");
              newSocket.emit("candidate", e.candidate);
            }
          };

          newPC.ontrack = (ev) => {
            console.log("add remotetrack success");
            if (remoteVideoRef.current)
              remoteVideoRef.current.srcObject = ev.streams[0];
          };

          newSocket.emit("join_room", {
            ROOM_ID: "1234",
            id: "sample",
            user: "user",
          });
        })
        .catch((error) => {
          console.log(`getUserMedia error: ${error}`);
        });

      const createOffer = () => {
        console.log("create offer");
        newPC
          .createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
          .then((sdp) => {
            newPC.setLocalDescription(new RTCSessionDescription(sdp));
            newSocket.emit("offer", sdp);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const createAnswer = (sdp: RTCSessionDescription) => {
        newPC.setRemoteDescription(new RTCSessionDescription(sdp)).then(() => {
          console.log("answer set remote description success");
          newPC
            .createAnswer({
              offerToReceiveVideo: true,
              offerToReceiveAudio: true,
            })
            .then((sdp1) => {
              console.log("create answer");
              newPC.setLocalDescription(new RTCSessionDescription(sdp1));
              newSocket.emit("answer", sdp1);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      };
      */
      setInit(true);
    }
  });

  return (
    <div>
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
      ></video>
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
      ></video>

      <div className="main__message_container">
        <input
          id="chat_message"
          type="text"
          autoComplete="off"
          placeholder="Type message here..."
        />
        <div
          id="send"
          className="options__button"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};
export default Test;
