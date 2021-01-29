// Displays name, artist and picture
import React from "react";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  id,
  key,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  const songSelect = async () => {
    await setCurrentSong(song);
    // SET ACTIVE
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);

    // Play Audio immediately when new song
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelect}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3> {song.name} </h3>
        <h4> {song.artist} </h4>
      </div>
    </div>
  );
};

export default LibrarySong;
