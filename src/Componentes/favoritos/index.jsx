import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay películas favoritas aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((pelicula, index) => (
            <div
              className='c-lista-film'
              onClick={() => navigate(`/pelicula/${pelicula.id}`)}
              key={pelicula.id || index}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={pelicula.image || 'https://via.placeholder.com/200x300?text=Sin+Imagen'}
                alt={`Película ${pelicula.title || 'Sin título'}`}
                width='auto'
                height='200'
                loading='lazy'
              />
              <p>{pelicula.title || 'Sin título'}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;