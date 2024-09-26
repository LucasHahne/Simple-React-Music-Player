import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { playAudio } from "../util";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  songs,
  setSongs,
}) => {
  //Ref
  useEffect(() => {
    // add active state
    const newSong = songs.map((e) => {
      if (e.id === currentSong.id) {
        return {
          ...e,
          active: true,
        };
      } else {
        return {
          ...e,
          active: false,
        };
      }
    });
    setSongs(newSong);
  }, [currentSong]);
  //States
  // currentTime needs to 0 as otherwise the Input throws an error. Even if it's directly updated

  //EventHandler
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((e) => e.id === currentSong.id);
    if (direction === "back") {
      currentIndex === 0
        ? setCurrentSong(songs[songs.length - 1])
        : setCurrentSong(songs[currentIndex - 1]);
    }
    if (direction === "forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      // currentIndex === songs.length - 1
      //   ? setCurrentSong(songs[0])
      //   : setCurrentSong(songs[currentIndex + 1]);
    }
    playAudio(isPlaying, audioRef);
  };

  const getTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    // Ensure seconds are always two digits by padding with a leading zero if necessary

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler("back")}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playSongHandler}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler("forward")}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Player;
