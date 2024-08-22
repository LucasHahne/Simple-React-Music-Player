import Player from "./components/Player";
import Song from "./components/Song";
import { chillHop } from "./util";
import "./styles/App.scss";
import { useState } from "react";

function App() {
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}></Song>
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      ></Player>
    </div>
  );
}

export default App;
