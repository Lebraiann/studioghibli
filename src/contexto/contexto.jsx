import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Puedes ajustar el total de películas si lo necesitas
  const totalPeliculas = 23;

  // Favoritos guardados en localStorage
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritosGhibli")) || [];
  const [favoritos, setFavoritos] = useState(favoritosGuardados);

  // Estado para las películas y filtro de director
  const [peliculas, setPeliculas] = useState([]);
  const [directorSeleccionado, setDirectorSeleccionado] = useState('Todos');

  // Películas vistas/capturadas guardadas en localStorage
  const vistosGuardados = JSON.parse(localStorage.getItem("vistosGhibli")) || [];
  const [vistos, setVistos] = useState(vistosGuardados);

  useEffect(() => {
    const obtenerPeliculas = async () => {
      if (directorSeleccionado === 'Todos') {
        const res = await fetch('https://ghibliapi.vercel.app/films');
        const json = await res.json();
        setPeliculas(json);
      } else {
        const res = await fetch('https://ghibliapi.vercel.app/films');
        const json = await res.json();
        const filtradas = json.filter(p => p.director === directorSeleccionado);
        setPeliculas(filtradas);
      }
    };

    obtenerPeliculas();
  }, [directorSeleccionado]);

  useEffect(() => {
    localStorage.setItem("favoritosGhibli", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("vistosGhibli", JSON.stringify(vistos));
  }, [vistos]);

  return (
    <AppContext.Provider value={{
      favoritos, setFavoritos,
      peliculas, setPeliculas,
      directorSeleccionado, setDirectorSeleccionado,
      vistos, setVistos,
      totalPeliculas
    }}>
      {children}
    </AppContext.Provider>
  );
}