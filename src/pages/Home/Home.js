import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import CategorySection from '../../components/CategorySection';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import './Home.css';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/videos')
            .then(response => response.json())
            .then(data => {
                setVideos(data);
            })
            .catch(error => console.error('Error al obtener videos:', error));
    }, [])

    const handleEdit = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const handleSave = (updatedVideo) => {
        setVideos(videos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
    };

    const handleDelete = (videoId) => {
        setVideos(videos.filter(video => video.id !== videoId));
    };

    const frontendVideos = videos.filter(video => video.category === 'Frontend');
    const backendVideos = videos.filter(video => video.category === 'Backend');
    const innovationVideos = videos.filter(video => video.category === 'Innovación y Gestión');

    return (
        <div className="home">
            <Header />
            <Banner />
            <CategorySection title="Frontend" videos={frontendVideos} onEdit={handleEdit} onDelete={handleDelete} />
            <CategorySection title="Backend" videos={backendVideos} onEdit={handleEdit} onDelete={handleDelete} />
            <CategorySection title="Innovación y Gestión" videos={innovationVideos} onEdit={handleEdit} onDelete={handleDelete} />
            <Footer />
            {isModalOpen && <Modal video={selectedVideo} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
        </div>
    );
};

export default Home;
