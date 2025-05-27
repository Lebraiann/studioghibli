import { useState, useEffect } from 'react'
import './style.css'

function Aleatorios() {
  const [peliculas, setPeliculas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [puntaje, setPuntaje] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [numPreguntas, setNumPreguntas] = useState(0);
  const TOTAL_PREGUNTAS = 10;

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await fetch('https://ghibli.rest/films');
        const data = await response.json();
        setPeliculas(data);
        generarPregunta(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchPeliculas();
  }, []);

  const generarPregunta = (peliculasData) => {
    const preguntaAleatoria = Math.floor(Math.random() * peliculasData.length);
    const peliculaCorrecta = peliculasData[preguntaAleatoria];
    
    let opcionesPosibles = peliculasData
      .filter(p => p.title !== peliculaCorrecta.title)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const todasOpciones = [...opcionesPosibles, peliculaCorrecta]
      .sort(() => Math.random() - 0.5);

    setPreguntaActual({
      pelicula: peliculaCorrecta,
      pregunta: `¿En qué año se estrenó ${peliculaCorrecta.title}?`
    });
    setOpciones(todasOpciones);
  };

  const verificarRespuesta = (peliculaSeleccionada) => {
    if (peliculaSeleccionada.release_date === preguntaActual.pelicula.release_date) {
      setPuntaje(puntaje + 1);
    }

    const siguientePregunta = numPreguntas + 1;
    setNumPreguntas(siguientePregunta);

    if (siguientePregunta >= TOTAL_PREGUNTAS) {
      setJuegoTerminado(true);
    } else if (peliculas.length > 0) {
      generarPregunta(peliculas);
    }
  };

  const reiniciarJuego = () => {
    setPuntaje(0);
    setNumPreguntas(0);
    setJuegoTerminado(false);
    generarPregunta(peliculas);
  };

  if (!preguntaActual) return <div>Cargando...</div>;

  return (
    <div className="trivia-container">
      <h1>Trivia Studio Ghibli</h1>
      <div className="puntaje">
        Puntaje: {puntaje}
        <br />
        Pregunta: {numPreguntas + 1} de {TOTAL_PREGUNTAS}
      </div>
      
      {!juegoTerminado ? (
        <>
          <div className="pregunta">{preguntaActual.pregunta}</div>
          <div className="opciones">
            {opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => verificarRespuesta(opcion)}
                className="opcion-btn"
              >
                {opcion.release_date}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="juego-terminado">
          <h2>¡Juego terminado!</h2>
          <p>Puntaje final: {puntaje} de {TOTAL_PREGUNTAS}</p>
          <button onClick={reiniciarJuego}>Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
}

export default Aleatorios