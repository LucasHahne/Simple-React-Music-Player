import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover}></img>
      <h3>{currentSong.name}</h3>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
