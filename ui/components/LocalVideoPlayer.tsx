import React, { useEffect, useRef, useState, MutableRefObject } from "react";

export type localViedioPlayerProps = {
  ref: MutableRefObject<HTMLVideoElement>;
  muted?: boolean;
};

const ViedoPlayer = (props: localViedioPlayerProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  return (
    <div>
      <video
        style={{ width: 240, height: 240 }}
        ref={ref}
        muted={isMuted}
        autoPlay
      ></video>
    </div>
  );
};

export default ViedoPlayer;
