import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Filtro from '../filtro';
import './style.css';

function Lista() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Todos'); // Estado para el filtro seleccionado

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch('https://ghibliapi.vercel.app/films/');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  let resultados = data;

  // Filtrar por búsqueda
  if (busqueda.length >= 2) {
    resultados = resultados.filter(film =>
      film.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // Filtrar por director
  if (filtro !== 'Todos') {
    resultados = resultados.filter(film => film.director === filtro);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar película"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />
      <Filtro onFiltroChange={setFiltro} /> {/* Componente Filtro */}
      <section className='c-lista'>
        {resultados.map((film) => (
          <div
            className='c-lista-film'
            onClick={() => navigate(`/ghibli/${film.id}`)}
            key={film.id}
          >
            <img
              src={film.image || 'https://via.placeholder.com/150'}
              alt={`Película ${film.title}`}
              width='auto'
              height='150'
              loading='lazy'
            />
            <p><strong>{film.title}</strong></p>
            <p>{film.description.substring(0, 100)}...</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;