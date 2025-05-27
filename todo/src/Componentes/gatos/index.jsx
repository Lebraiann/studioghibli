import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Gatos() {
  const [gatos, setGatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerGatos = async () => {
      try {
        // Obtener datos de la especie "gatos"
        const resEspecie = await fetch('https://ghibliapi.vercel.app/species/603428ba-8a86-4b0b-a9f1-65df6abef3d3');
        const especie = await resEspecie.json();

        // Obtener personajes de la especie "gatos"
        const personajesPromises = especie.people.map(async (url) => {
          const resPersonaje = await fetch(url);
          const personaje = await resPersonaje.json();

          // Obtener la imagen de la primera película asociada al personaje
          if (personaje.films.length > 0) {
            const resFilm = await fetch(personaje.films[0]);
            const film = await resFilm.json();
            personaje.image = film.image; // Agregar la imagen de la película al personaje
          } else {
            personaje.image = null; // Si no hay películas, no hay imagen
          }

          return personaje;
        });

        const personajes = await Promise.all(personajesPromises);
        setGatos(personajes);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerGatos();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="gatos">
      <h1>Gatos de Studio Ghibli</h1>
      <ul>
        {gatos.map((gato) => (
          <li key={gato.id}>
            {gato.image && (
              <img
                src={gato.image}
                alt={`Imagen de ${gato.name}`}
                style={{ width: '150px', borderRadius: '10px', marginBottom: '10px' }}
              />
            )}
            <p><strong>Nombre:</strong> {gato.name}</p>
            <p><strong>Género:</strong> {gato.gender}</p>
            <p><strong>Edad:</strong> {gato.age}</p>
            <p><strong>Color de cabello:</strong> {gato.hair_color}</p>
            <p><strong>Color de ojos:</strong> {gato.eye_color}</p>
            <p><strong>Películas:</strong></p>
            <ul>
              {gato.films.map((filmUrl, index) => {
                const filmId = filmUrl.split('/').pop(); // Extraer el ID de la película
                return (
                  <li key={index}>
                    <button
                      onClick={() => navigate(`/ghibli/${filmId}`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-accent)',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Ver película
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gatos;