import React from 'react';
import './VideoCard.css';

const VideoCard = ({ video, onDelete, onEdit }) => {
    const handleDelete = () => {
        fetch(`http://localhost:5000/videos/${video.id}`, {
            method: 'DELETE'
        })
        .then(() => onDelete(video.id))
        .catch(error => console.error('Error al eliminar video:', error));
    };

    return (
        <div className="video-card">
            <img src={video.image} alt={video.title} />
            <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <button onClick={() => onEdit(video)}>Editar</button>
                <button onClick={handleDelete}>Borrar</button>
            </div>
        </div>
    );
};

export default VideoCard;
