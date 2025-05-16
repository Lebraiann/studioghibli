import { useContext, useState } from 'react';
import { AppContext } from '../../contexto/contexto';
import './style.css'; 


function Lista({ filtroBusqueda }) {
  const { peliculas, favoritos, setFavoritos } = useContext(AppContext);
  const [hovered, setHovered] = useState(null);

  // Filtrado por búsqueda
  const filtradas = peliculas.filter(p =>
    p.title.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  const toggleFavorito = (pelicula) => {
    if (favoritos.some(fav => fav.id === pelicula.id)) {
      setFavoritos(favoritos.filter(fav => fav.id !== pelicula.id));
    } else {
      setFavoritos([...favoritos, { id: pelicula.id, title: pelicula.title, image: pelicula.image }]);
    }
  };

  return (
    <div className="c-lista">
      {filtradas.map(p => (
        <div
          className="c-lista-film"
          key={p.id}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <img src={p.image} alt={p.title} height="220" />
          <div className="film-info">
            <span className="film-title">{p.title}</span>
            <span className="film-year">{p.release_date}</span>
            <button className="fav-btn" onClick={() => toggleFavorito(p)}>
              {favoritos.some(fav => fav.id === p.id) ? '❤️' : '🤍'}
            </button>
          </div>
          {hovered === p.id && (
            <div className="film-sinopsis">
              <strong>Sinopsis:</strong>
              <p>{p.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Lista;