import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../Redux/Actions/actions";

const GestionCursos = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos || []); //
  const [selectedVideos, setSelectedVideos] = useState([]);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const handleCheckboxChange = (youtube_id) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.includes(youtube_id)
        ? prevSelected.filter((id) => id !== youtube_id)
        : [...prevSelected, youtube_id]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Videos</h1>
      {videos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Seleccionar</th>
              <th className="py-2 px-4 border-b">Título</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Duración</th>
              <th className="py-2 px-4 border-b">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.youtube_id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    value={video.youtube_id}
                    checked={selectedVideos.includes(video.youtube_id)}
                    onChange={() => handleCheckboxChange(video.youtube_id)}
                  />
                </td>
                <td className="py-2 px-4 border-b">{video.title}</td>
                <td className="py-2 px-4 border-b">
                  {video.description || "Sin descripción"}
                </td>
                <td className="py-2 px-4 border-b">
                  {video.duration
                    ? video.duration.replace("PT", "").toLowerCase()
                    : "Duración no disponible"}
                </td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-16 h-auto"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay videos disponibles.</p>
      )}
    </div>
  );
};

export default GestionCursos;
