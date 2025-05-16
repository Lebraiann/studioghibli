import { useState, useEffect } from 'react';
import './style.css'

function Explorar() {
  const [peliculas, setPeliculas] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [detalles, setDetalles] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener todas las películas al cargar
  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(res => res.json())
      .then(setPeliculas);
  }, []);

  // Cuando se selecciona una película, obtener sus conexiones
  useEffect(() => {
    if (!seleccionada) {
      setDetalles(null);
      return;
    }
    setLoading(true);
    fetch(`https://ghibliapi.vercel.app/films/${seleccionada}`)
      .then(res => res.json())
      .then(async data => {
        // Obtener detalles de personajes, especies, locaciones y vehículos
        const getDetails = async (urls) => {
          const results = await Promise.all(
            urls.map(url => fetch(url).then(r => r.json()))
          );
          return results;
        };
        const [personajes, especies, locaciones, vehiculos] = await Promise.all([
          getDetails(data.people.filter(url => url !== "https://ghibliapi.vercel.app/people/")),
          getDetails(data.species.filter(url => url !== "https://ghibliapi.vercel.app/species/")),
          getDetails(data.locations.filter(url => url !== "https://ghibliapi.vercel.app/locations/")),
          getDetails(data.vehicles.filter(url => url !== "https://ghibliapi.vercel.app/vehicles/")),
        ]);
        setDetalles({ ...data, personajes, especies, locaciones, vehiculos });
        setLoading(false);
      });
  }, [seleccionada]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Explorador de Conexiones Ghibli</h1>
      <label>
        Selecciona una película:
        <select
          value={seleccionada || ''}
          onChange={e => setSeleccionada(e.target.value)}
          style={{ marginLeft: 10, padding: 5 }}
        >
          <option value="">-- Elige una película --</option>
          {peliculas.map(peli => (
            <option key={peli.id} value={peli.id}>{peli.title}</option>
          ))}
        </select>
      </label>

      {loading && <p>Cargando conexiones...</p>}

      {detalles && (
        <div style={{ marginTop: 30 }}>
          <h2>{detalles.title}</h2>
          <img src={detalles.image} alt={detalles.title} style={{ width: 200, borderRadius: 10 }} />
          <p><strong>Director:</strong> {detalles.director}</p>
          <p><strong>Productor:</strong> {detalles.producer}</p>
          <p><strong>Descripción:</strong> {detalles.description}</p>
          <hr />
          <h3>Personajes</h3>
          <ul>
            {detalles.personajes.length > 0
              ? detalles.personajes.map(p => <li key={p.id}>{p.name}</li>)
              : <li>No hay personajes registrados.</li>
            }
          </ul>
          <h3>Especies</h3>
          <ul>
            {detalles.especies.length > 0
              ? detalles.especies.map(e => <li key={e.id}>{e.name}</li>)
              : <li>No hay especies registradas.</li>
            }
          </ul>
          <h3>Locaciones</h3>
          <ul>
            {detalles.locaciones.length > 0
              ? detalles.locaciones.map(l => <li key={l.id}>{l.name}</li>)
              : <li>No hay locaciones registradas.</li>
            }
          </ul>
          <h3>Vehículos</h3>
          <ul>
            {detalles.vehiculos.length > 0
              ? detalles.vehiculos.map(v => <li key={v.id}>{v.name}</li>)
              : <li>No hay vehículos registrados.</li>
            }
          </ul>
        </div>
      )}
    </div>
  );
}

export default Explorar;