import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import './NewVideo.css';

const NewVideo = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        // image: '', // Comentado temporalmente
        video: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Video agregado:', data);
            // Redirigir a la página de inicio (Home)
            navigate('/');
        })
        .catch(error => console.error('Error al agregar video:', error));
    };
    
    return (
        <div className="new-video">
            <Header />
            <main className='container-main' >
                <h1>Nuevo Video</h1>
                <h3>Complete el formulario para crear una nueva tarjeta de video</h3>
                <h2 className='texto-h2'>Crear Tarjeta</h2>
                <form className='container-form' onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder='Ingrese el título' />
                    </label>
                    <label>
                        Categoría:
                        <select className='container-select' name="category" value={formData.category} onChange={handleChange}>
                            <option value="" disabled>Seleccione una categoría</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Innovación">Innovación y Gestión</option>
                        </select>
                    </label>
                    {/* Comentado temporalmente
                    <label>
                        Imagen:
                        <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                    </label>
                    */}
                    <label>
                        Video:
                        <input type="text" name="video" value={formData.video} onChange={handleChange} placeholder='Ingrese el enlace del video' />
                    </label>
                    <label>
                        Descripción:
                        <textarea className='container-textarea' name="description" value={formData.description} onChange={handleChange} placeholder='¿De qué se trata este video?'></textarea>
                    </label>
                    <div className="botones">
                        <button className='botonGuardar' type="submit">Guardar</button>
                        <button className='botonLimpiar' type="reset" onClick={() => setFormData({
                            title: '',
                            category: '',
                            // image: '', // Comentado temporalmente
                            video: '',
                            description: ''
                        })}>Limpiar</button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default NewVideo;
