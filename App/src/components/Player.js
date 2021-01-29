// Controls for music player
import React from "react";
// Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  audioRef,
}) => {
  // Updating '.selected' -> to highlight currentSong
  const activeLibrary = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  };

  // [EVENT HANDLERS]
  // Play/Pause functionality
  const playSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  // Returns time in readable format
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  // Value = song.currentTime -> so to update scrollbar -> update currentTime
  const dragHandler = (event) => {
    // Syncing audio with scrollbar
    audioRef.current.currentTime = event.target.value;
    setSongInfo({ ...songInfo, currentTime: event.target.value });
  };

  // NEXT/PAST SONG
  const skipTrack = async (direction) => {
    let currentIdx = songs.findIndex((song) => song.id === currentSong.id);
    // SKIPPING FORWARD
    if (direction === "skip-forward") {
      // CHECK IF LAST SONG
      if (currentIdx === songs.length - 1) {
        await setCurrentSong(songs[0]);
        activeLibrary(songs[0]);
        return;
      }
      await setCurrentSong(songs[currentIdx + 1]);
      activeLibrary(songs[currentIdx + 1]);
    } else {
      // SKIPPING BACKWARD
      if (currentIdx === 0) {
        // CHECK IF 1ST SONG
        await setCurrentSong(songs[songs.length - 1]);
        activeLibrary(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[currentIdx - 1]);
      activeLibrary(songs[currentIdx - 1]);
    }
    if (isPlaying) audioRef.current.play();
  };

  // [MAIN BODY]
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          onChange={dragHandler}
          value={songInfo.currentTime}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrack("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSong}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrack("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
