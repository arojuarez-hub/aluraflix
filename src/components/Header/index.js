import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src='/img/logo.png' alt='Logo Aluraflix' />
            </Link>
            {/* <div className="logo">Aluraflix</div> */}
            <nav>
                <ul>
                    <li><Link to="/"><button className="botonHome">Home</button></Link></li>
                    <li><Link to="/new-video"><button className="botonNuevoVideo">Nuevo Video</button></Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
