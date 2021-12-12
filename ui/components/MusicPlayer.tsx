import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Lrc } from "react-lrc";
import { SAMPLELRC } from "../public/SampleLrc";
import { Line } from "rc-progress";
import { LyrisFrame, PlayOrStopFrame } from "./roomStyle";
const sampleMusic = require("../public/test.mp3");

type MusicPlayerProps = {
  lrc: string;
  isPublic?: boolean;
  src?: string;
};

const MusicPlayer: React.FC<MusicPlayerProps> = (props: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let audioRef;
  const forTest = true;
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  return (
    <>
      <div
        className="flex flex-col w-full overflow-scroll"
        style={{ height: "500px" }}
      >
        <div
          style={PlayOrStopFrame}
          onClick={(e) => {
            e.preventDefault();
            if (isPlaying) {
              audioRef.audioEl.current.pause();
              setIsPlaying(false);
            } else {
              audioRef.audioEl.current.play();
              setIsPlaying(true);
            }
          }}
        >
          {!isPlaying ? "Play" : "Stop"}
        </div>
        <div>
          <Line percent={percent} strokeWidth={1.1} strokeColor={"#32CD32"} />
        </div>
        <Lrc
          className="relative top-32"
          currentMillisecond={time}
          lrc={SAMPLELRC}
          autoScroll={true}
          topBlank={false}
          bottomBlank={false}
          lineRenderer={({ index, active, line }) => (
            <div
              className="flex flex-row justify-center"
              style={{
                fontSize: active ? "20px" : "18px",
                color: active ? "red" : "#333",
                fontWeight: active ? 500 : 300,
                lineHeight: "40px",
              }}
            >
              {line.content}
            </div>
          )}
        />
      </div>

      {forTest ? (
        <>
          <ReactAudioPlayer
            volume={0.1}
            autoPlay={false}
            src={sampleMusic}
            ref={(element) => {
              audioRef = element;

              if (!isLoading) {
                if (audioRef != undefined) {
                  //   alert(element.audioEl.current.duration);
                  setTimeout(() => {
                    if (element.audioEl.current.duration !== undefined) {
                      setDuration(Math.floor(element.audioEl.current.duration));
                      console.log("길이: ", duration);
                      setIsLoading(true);
                    }
                  }, 1000);
                }
              }
            }}
            controls={false}
            listenInterval={1000}
            onListen={(e) => {
              const time = e * 1000;
              setPercent((Math.floor(e) / duration) * 100);
              setTime(Math.floor(time));
              console.log("percent: ", percent);
            }}
          />
          {/* <audio src={sampleMusic} ref={audioRef} onChange={} /> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MusicPlayer;
