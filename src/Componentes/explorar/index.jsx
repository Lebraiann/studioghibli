import { useState, useEffect } from 'react';
import './style.css';

function Explorar() {
  const [peliculas, setPeliculas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(res => res.json())
      .then(data => {
        // Ordenar por año de lanzamiento
        data.sort((a, b) => a.release_date.localeCompare(b.release_date));
        setPeliculas(data);
      });
  }, []);

  const peli = peliculas.find(p => p.id === seleccionada);

  return (
    <div className="explorar-timeline">
      <h1>Línea de tiempo Studio Ghibli</h1>
      <div className="timeline">
        {peliculas.map((film) => (
          <div
            key={film.id}
            className={`timeline-item${film.id === seleccionada ? ' active' : ''}`}
            onClick={() => setSeleccionada(film.id)}
            title={film.title}
          >
            <div className="timeline-dot" />
            <span className="timeline-year">{film.release_date}</span>
            <span className="timeline-title">{film.title}</span>
          </div>
        ))}
      </div>

      {peli && (
        <div className="timeline-details">
          <h2>{peli.title} ({peli.release_date})</h2>
          <img src={peli.image} alt={peli.title} style={{ width: 220, borderRadius: 10, margin: '20px 0' }} />
          <p><strong>Director:</strong> {peli.director}</p>
          <p><strong>Productor:</strong> {peli.producer}</p>
          <p><strong>Duración:</strong> {peli.running_time} min</p>
          <p><strong>Descripción:</strong> {peli.description}</p>
          <p><strong>Puntuación RT:</strong> {peli.rt_score}</p>
        </div>
      )}
    </div>
  );
}

export default Explorar;