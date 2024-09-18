import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchVideos } from '../../Redux/Actions/actions';

const Videos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videos = useSelector(state => state.videos || []); 
    const [selectedVideo, setSelectedVideo] = useState(null); 

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch, navigate]);

   
    const handleVideoSelect = (video) => {
        setSelectedVideo(video.youtube_id); 
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Curso Disponibles</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {videos.length > 0 ? (
                    videos.map(video => (
                        <div 
                            key={video.youtube_id} 
                            className="border p-4 rounded-lg shadow-md"
                        >
                            {selectedVideo === video.youtube_id ? (
                                
                                <iframe 
                                    width="100%" 
                                    height="315" 
                                    src={`https://www.youtube.com/embed/${video.youtube_id}`} 
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                
                                <div onClick={() => handleVideoSelect(video)}>
                                    <img 
                                        src={video.thumbnail} 
                                        alt={video.title} 
                                        className="mb-2 cursor-pointer"
                                    />
                                    <h2 className="text-xl font-semibold">{video.title}</h2>
                                    <p className="text-sm">{video.description}</p>
                                </div>
                            )}
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


