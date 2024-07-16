import React from 'react';
import VideoCard from '../../components/VideoCard';
import './CategorySection.css';

const CategorySection = ({ title, videos }) => {
    return (
        <section className="category-section">
            <h2>{title}</h2>
            <div className="video-cards">
                {videos.map(video => <VideoCard key={video.id} video={video} />)}
            </div>
        </section>
    );
};

export default CategorySection;
