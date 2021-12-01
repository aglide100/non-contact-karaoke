import { useRef, MutableRefObject, useCallback } from "react";
import { EventEmitter } from "stream";
import { WsManager } from "./ws_manager";

const pc_config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export type UserProps = {
  id: string;
  name: string;
};

export class RtcManager {
  private static instance: RtcManager;
  private static pcsRef: MutableRefObject<{
    [socketId: string]: RTCPeerConnection;
  }>;
  private static localViedoRef: MutableRefObject<HTMLVideoElement>;
  private static localStreamRef: MutableRefObject<MediaStream>;
  private static users: UserProps[];
  private static socketRef: MutableRefObject<WebSocket>;
  private static WsManager: WsManager;

  constructor() {
    RtcManager.WsManager = WsManager.getInstance();
    // RtcManager.socketRef.current = RtcManager.WsManager.getSocket();
    this.getLocalStream();
    RtcManager.WsManager.on(
      "res-user-in-room",
      (allUsers: Array<{ id: string; name: string }>) => {
        allUsers.forEach(async (user) => {
          if (!RtcManager.localStreamRef.current) return;
          const pc = this.createPeerConnection(user.id, user.name);
          if (!pc) return;
          RtcManager.pcsRef.current = {
            ...RtcManager.pcsRef.current,
            [user.id]: pc,
          };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log("create offer success");
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            RtcManager.WsManager.emit("offer", {
              sdp: localSdp,
              offerSendID: RtcManager.WsManager.getUserID(),
              offerSendName: RtcManager.WsManager.getUserName(),
            });
          } catch (e) {
            console.log(e);
          }
        });
      }
    );
    RtcManager.WsManager.on(
      "getOffer",
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string;
        offerSendName: string;
      }) => {
        const { sdp, offerSendID, offerSendName } = data;
        console.log("get offer");
        if (!RtcManager.localStreamRef.current) return;
        const pc = this.createPeerConnection(offerSendID, offerSendName);
        if (!(pc && RtcManager.socketRef.current)) return;
        RtcManager.pcsRef.current = {
          ...RtcManager.pcsRef.current,
          [offerSendID]: pc,
        };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log("answer set remote description success");
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          RtcManager.WsManager.emit("answer", {
            sdp: localSdp,
            answerSendID: RtcManager.WsManager.getUserID(),
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.log(e);
        }
      }
    );
    RtcManager.WsManager.on(
      "getAnswer",
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log("get answer");
        const pc: RTCPeerConnection = RtcManager.pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    );
    RtcManager.WsManager.on(
      "getCandidate",
      async (data: {
        candidate: RTCIceCandidateInit;
        candidateSendID: string;
      }) => {
        console.log("get candidate");
        const pc: RTCPeerConnection =
          RtcManager.pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log("candidate add success");
      }
    );
    RtcManager.WsManager.on("user_exit", (data: { id: string }) => {
      if (!RtcManager.pcsRef.current[data.id]) return;
      RtcManager.pcsRef.current[data.id].close();
      delete RtcManager.pcsRef.current[data.id];
      RtcManager.users = RtcManager.users.filter((user) => user.id !== data.id);
    });
    // return () => {
    //   if (socketRef.current) {
    //     socketRef.current.disconnect();
    //   }
    //   users.forEach((user) => {
    //     if (!pcsRef.current[user.id]) return;
    //     pcsRef.current[user.id].close();
    //     delete pcsRef.current[user.id];
    //   });
    // };
  }

  public static getInstance(): RtcManager {
    if (!RtcManager.instance) {
      console.log("creating RtcManager instance!");
      RtcManager.instance = new RtcManager();
    }

    return RtcManager.instance;
  }

  public async getLocalStream() {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });
      RtcManager.localStreamRef.current = localStream;

      if (RtcManager.localViedoRef.current) {
        RtcManager.localViedoRef.current.srcObject = localStream;
      }
    } catch (e) {
      console.log("getUserMedia gots error: ", e);
    }
  }

  public createPeerConnection(socketId: string, name: string) {
    try {
      const pc = new RTCPeerConnection(pc_config);

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          return;
        }

        console.log("oniceandidate");
        RtcManager.WsManager.emit("candidate", {
          candidate: e.candidate,
          candidateSendID: RtcManager.WsManager.getUserID(),
          candidateReceiveID: socketId,
        });
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      pc.ontrack = (e) => {
        console.log("ontack success");

        RtcManager.users = RtcManager.users.concat({ id: socketId, name });
      };

      if (RtcManager.localStreamRef.current) {
        console.log("localstream add");
        RtcManager.localStreamRef.current.getTracks().forEach((track) => {
          if (!RtcManager.localStreamRef.current) return;
          pc.addTrack(track, RtcManager.localStreamRef.current);
        });
      } else {
        console.log("no local stream");
      }
      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}
