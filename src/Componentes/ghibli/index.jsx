import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import './style.css';
import { AppContext } from '../../contexto/contexto.jsx';

function Ghibli() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);

  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then(response => response.json())
      .then(data => setPelicula(data))
      .catch(error => console.error("Error:", error));
  }, [id]);

  const esFavorito = favoritos.some(fav => fav.id === pelicula?.id);

  const toggleFavorito = () => {
    if (!pelicula) return;
    if (esFavorito) {
      setFavoritos(favoritos.filter(fav => fav.id !== pelicula.id));
    } else {
      setFavoritos([
        ...favoritos,
        {
          id: pelicula.id,
          title: pelicula.title,
          image: pelicula.image
        }
      ]);
    }
  };

  if (!pelicula) return <p>Cargando...</p>;

  return (
    <div className="film-details">
      <img
        src={pelicula.image}
        alt={pelicula.title}
        width="250"
        style={{ borderRadius: '10px' }}
      />
      <h1>{pelicula.title}</h1>
      <p><strong>Director:</strong> {pelicula.director}</p>
      <p><strong>Productor:</strong> {pelicula.producer}</p>
      <p><strong>Año:</strong> {pelicula.release_date}</p>
      <p><strong>Descripción:</strong> {pelicula.description}</p>
      <button onClick={toggleFavorito} style={{ fontSize: '2em', marginTop: '10px' }}>
        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
    </div>
  );
}

export default Ghibli;

<Route path="/ghibli/:name" element={<Ghibli />} />