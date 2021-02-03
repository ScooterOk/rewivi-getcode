import { useState, useRef } from 'react';

import play from '../../assets/img/icon-play.svg';

import './style.scss';

const VideoPlayer = ({ src }) => {
  const [control, setControl] = useState(false);
  const player = useRef();

  const onPlay = () => {
    setControl(true);
    player.current.play();
  };

  return (
    <div className="video-player">
      {!control && (
        <div className="video--button">
          <button onClick={onPlay}>
            <img src={play} alt="play" />
          </button>
        </div>
      )}
      <video ref={player} src={src} controls={control}></video>
    </div>
  );
};

export default VideoPlayer;
