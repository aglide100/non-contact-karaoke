import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  MutableRefObject,
} from "react";
import { useRouter } from "next/router";
import * as ws_manager from "../../utils/ws_manager";
import * as rtc_manager from "../../utils/rtc_manager";
// import { localViedioPlayerProps } from "../../components/LocalVideoPlayer";
import ViedoPlayer from "../../components/VideoPlayer";
// import dynamic from "next/dynamic";

// const MyVideo = dynamic(
//   () =>
//     import("../../components/LocalVideoPlayer").catch((err) => {
//       return () => <>err..{err}</>;
//     }),
//   {
//     loading: () => <></>,
//     ssr: false,
//   }
// );
let wsclient: ws_manager.WsManager;
let rtcclient: rtc_manager.RtcManager;

const Room: React.FC = ({}) => {
  const router = useRouter();
  const { id } = router.query;

  const [chatMsg, setChatMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoList, setVideoList] = useState<ReactElement[]>([]);
  const [localVideo, setLocalVideo] = useState<ReactElement>();
  const [localViedoRef, setLocalVideoRef] =
    useState<MutableRefObject<HTMLVideoElement>>();
  const [localStreamRef, setLocalStreamRef] =
    useState<MutableRefObject<MediaStream>>();

  async function getWsManager() {
    var clientTemp = await ws_manager.WsManager.getInstance();
    return clientTemp;
  }

  async function getRtcManager() {
    var clientTemp = await rtc_manager.RtcManager.getInstance();
    return clientTemp;
  }

  useEffect(() => {
    if (!isLoaded && router.isReady) {
      let roomID = JSON.stringify(router.query.id);

      console.log("roomID: " + roomID);

      getWsManager().then(function (wsclientTemp) {
        setIsLoaded(true);
        wsclientTemp.joinRoom(roomID);
        wsclient = wsclientTemp;

        getRtcManager().then(function (clientTemp) {
          clientTemp.getLocalRef((localRef, streamRef) => {
            setLocalVideoRef(localRef);
            setLocalStreamRef(streamRef);
          });

          rtcclient.getUsers((res) => {
            let videoListElement;
            if (res != undefined) {
              videoListElement = res.map((user, index) => {
                return (
                  <ViedoPlayer
                    key={index}
                    stream={user.stream}
                    name={user.name}
                  ></ViedoPlayer>
                );
              });
            }

            let localVideoElement = (
              <>
                <video
                  style={{ width: 240, height: 240 }}
                  muted
                  autoPlay
                  ref={localViedoRef}
                ></video>
              </>
            );

            setLocalVideo(localVideoElement);
            setVideoList(videoListElement);
          });

          return (rtcclient = clientTemp);
        });
      });

      getRtcManager().then(function (clientTemp) {
        return (rtcclient = clientTemp);
      });
    }
  }, [router.isReady]);

  return (
    <>
      <div className="text-green-500">room id : {id}</div>

      {localVideo}
      {videoList}

      <canvas id="photo"></canvas>

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
          wsclient.sendChatMsg(chatMsg, id);
        }}
      >
        Send Message!
      </div>
    </>
  );
};

export default Room;
