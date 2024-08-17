import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchVideos } from '../../Redux/Actions/actions';

const Videos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videos = useSelector(state => state.videos.data.videos || []); // Asegurarse de que videos es un array
   

    useEffect(() => {
        dispatch(fetchVideos())
    }, [ dispatch, navigate]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">YouTube Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {videos.length > 0 ? (
                    videos.map(video => (
                        <div key={video.youtube_id} className="border p-4 rounded-lg shadow-md">
                            <img src={video.thumbnail} alt={video.title} className="mb-2" />
                            <h2 className="text-xl font-semibold">{video.title}</h2>
                            <p className="text-sm">{video.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay videos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Videos;

