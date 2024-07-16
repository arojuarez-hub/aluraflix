import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ video, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...video });

    useEffect(() => {
        setFormData({ ...video });
    }, [video]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/videos/${video.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            onSave(data);
            onClose();
        })
        .catch(error => console.error('Error al editar video:', error));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Card</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </label>
                    <label>
                        Categoría:
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Innovación">Innovación y Gestión</option>
                        </select>
                    </label>
                    <label>
                        Imagen:
                        <input type="text" name="image" value={formData.image} onChange={handleChange} />
                    </label>
                    <label>
                        Video:
                        <input type="text" name="video" value={formData.video} onChange={handleChange} />
                    </label>
                    <label>
                        Descripción:
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                    </label>
                    <div className='botonesModal'>
                        <button className='boton-guardarModal' type="submit">Guardar</button>
                        <button className='boton-cerrarModal' type="button" onClick={onClose}>Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
