import React, { useState, useRef } from "react";
import "./styles/app.scss";

// APP DATA -> SONGS
import data from "./data";

// COMPONENTS
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { library } from "@fortawesome/fontawesome-svg-core";


function App() {
  // STATE
  // data() - returns the song data
  const [songs, setSongs] = useState(data());
  // songs[0] -> default currentSong
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // Paused by default
  const [isPlaying, setIsPlaying] = useState(false);
  // Default Time
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // Library closed by default
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdate = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  // Reference -> audio
  const audioRef = useRef(null);

  // SKIPPING FORWARD -> when song ends
  const songEnd = async () => {
    let currentIdx = songs.findIndex((song) => song.id === currentSong.id);
    // CHECK IF LAST SONG
    if (currentIdx === songs.length - 1) {
      await setCurrentSong(songs[0]);
      if (isPlaying) audioRef.current.play();
      return;
    }
    await setCurrentSong(songs[currentIdx + 1]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdate}
        onLoadedMetadata={timeUpdate}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEnd}
      ></audio>
    </div>
  );
}

export default App;
