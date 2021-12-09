// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 240px;
  height: 270px;
  margin: 5px;
`;


interface Props {
  email: string;
  stream: MediaStream;
  muted?: boolean;
}

const Video = ({ email, stream, muted }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <Container>
      <video ref={ref} muted={isMuted} autoPlay playsInline style={{width: "300px", height: "300px"}}  />
      <p style={{top: "320px", left: "0px", position: "absolute"}}>{email}</p>
    </Container>
  );
};

export default Video;
