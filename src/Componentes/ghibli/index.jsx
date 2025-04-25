import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 
import './style.css';

function Ghibli() {
  const { name } = useParams(); 
  const [filmData, setFilmData] = useState(null);

  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${name}`)
      .then(response => response.json())
      .then(responseData => setFilmData(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]); 

  if (!filmData) return <p>Cargando...</p>;

  return (
    <div className="film-details">
      <img 
        src={filmData.image || 'https://via.placeholder.com/300'} 
        alt={filmData.title} 
        width="300"
      />
      <h1>{filmData.title}</h1>
      <p><strong>Director:</strong> {filmData.director}</p>
      <p><strong>Productor:</strong> {filmData.producer}</p>
      <p><strong>Fecha de lanzamiento:</strong> {filmData.release_date}</p>
      <p><strong>Duración:</strong> {filmData.running_time} minutos</p>
      <p><strong>Descripción:</strong> {filmData.description}</p>
      <p><strong>Puntuación RT:</strong> {filmData.rt_score}</p>
    </div>
  );
}

export default Ghibli;