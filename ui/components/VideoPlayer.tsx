import React, { useEffect, useRef, useState } from "react";

export type viedioPlayerProps = {
  name: string;
  stream: MediaStream;
  muted?: boolean;
};

const ViedoPlayer = (props: viedioPlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = props.stream;
    }
  });

  return (
    <div>
      <video ref={ref} muted={isMuted} autoPlay></video>
      <div>{props.name}</div>
    </div>
  );
};
