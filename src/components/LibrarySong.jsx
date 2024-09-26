import React from "react";

const LibrarySong = ({
  songs,
  setSongs,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    // add active state
    const newSong = songs.map((e) => {
      if (e.id === song.id) {
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
    // check if song is playing
    if (isPlaying) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };

  return (
    <div
      onClick={() => songSelectHandler()}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
