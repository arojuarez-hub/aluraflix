import './Titulo.css';

function Titulo({ children, color }) {
    return (
        <div className="container" style={{ background: `${color}` }}>
            {children}
        </div>
    )
}

export default Titulo;