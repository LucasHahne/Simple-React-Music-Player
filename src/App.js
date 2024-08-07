import Player from "./components/Player";
import Song from "./components/Song";
import { chillHop } from "./util";
import "./styles/App.scss";
import { useState } from "react";

function App() {
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);

  return (
    <div className="App">
      <Song currentSong={currentSong}></Song>
      <Player></Player>
    </div>
  );
}

export default App;
