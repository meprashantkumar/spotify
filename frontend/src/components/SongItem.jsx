import React, { useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";

const SongItem = ({ image, name, desc, id }) => {
  const [saved, setSaved] = useState(false);

  const { addToPlaylist, user } = UserData();

  const { setSelectedSong, isPlaying, setIsPlaying } = SongData();

  const playList = user.playlist;

  useEffect(() => {
    if (playList && playList.includes(id)) {
      setSaved(true);
    }
  }, [user]);

  const savetoPlaylistHandler = () => {
    setSaved(!saved);
    addToPlaylist(id);
  };
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img src={image} className="rounded w-[160px]" alt="" />
        <div className="flex gap-2">
          <button className="absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={()=>{
            setSelectedSong(id);
            setIsPlaying(true)
          }}>
            <FaPlay />
          </button>
          <button
            className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={savetoPlaylistHandler}
          >
            {saved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
