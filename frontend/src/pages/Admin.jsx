import React, { useState } from "react";
import { UserData } from "../context/User";
import { Link, useNavigate } from "react-router-dom";
import { SongData } from "../context/Song";
import { MdDelete } from "react-icons/md";

const Admin = () => {
  const { user } = UserData();
  const {
    albums,
    songs,
    addAlbum,
    loading,
    addSong,
    addThumbnail,
    deleteSong,
  } = SongData();
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [singer, setSinger] = useState("");
  const [album, setAlbum] = useState("");

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const addAlbumHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    addAlbum(formData, setTitle, setDescription, setFile);
  };

  const addSongHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("singer", singer);
    formData.append("album", album);
    formData.append("file", file);
    addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum);
  };

  const addThumbnailHandler = (id) => {
    const formData = new FormData();
    formData.append("file", file);

    addThumbnail(id, formData, setFile);
  };

  const deleteHandler = (id) => {
    if (confirm("are you sure you want to delete this song")) {
      deleteSong(id);
    }
  };
  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link
        to="/"
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Go to home page
      </Link>
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>

      <form
        onSubmit={addAlbumHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="auth-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Descripiton</label>
          <input
            type="text"
            placeholder="Descripiton"
            className="auth-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            className="auth-input"
            accept="image/*"
            onChange={fileChangeHandler}
            required
          />
        </div>

        <button
          disabled={loading}
          className="auth-btn"
          style={{ width: "100px" }}
        >
          {loading ? "Please Wait..." : "Add"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6 mt-6">Add Songs</h2>

      <form
        onSubmit={addSongHandler}
        className="bg-[#181818] p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="auth-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Descripiton</label>
          <input
            type="text"
            placeholder="Descripiton"
            className="auth-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Singer</label>
          <input
            type="text"
            placeholder="Singer"
            className="auth-input"
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
            required
          />
        </div>

        <select
          className="auth-input"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        >
          <option value="">Choose Album</option>
          {albums &&
            albums.map((e, i) => (
              <option value={e._id} key={i}>
                {e.title}
              </option>
            ))}
        </select>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">audio</label>
          <input
            type="file"
            className="auth-input"
            accept="audio/*"
            onChange={fileChangeHandler}
            required
          />
        </div>

        <button
          disabled={loading}
          className="auth-btn"
          style={{ width: "100px" }}
        >
          {loading ? "Please Wait..." : "Add"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {songs &&
            songs.map((e, i) => (
              <div key={i} className="bg-[#181818] p-4 rounded-lg shadow-md">
                {e.thumbnail ? (
                  <img
                    src={e.thumbnail.url}
                    alt=""
                    className="mr-1 w-52 h-52"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <input type="file" onChange={fileChangeHandler} />
                    <button
                      onClick={() => addThumbnailHandler(e._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Add Thumbnail
                    </button>
                  </div>
                )}

                <h4 className="text-lg font-bold">{e.title}</h4>
                <h4 className="text-sm text-gray-500">{e.singer}</h4>
                <h4 className="text-sm text-gray-500">{e.description}</h4>

                <button
                  onClick={() => deleteHandler(e._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
