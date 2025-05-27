import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';
import { supabase } from "./supabase";
import Menu from './Componentes/menu';
import Aleatorios from './Componentes/aleatorios';
import Explorar from './Componentes/explorar';
import Favoritos from './Componentes/favoritos';
import Lista from './Componentes/lista';
import Usuario from './Componentes/usuarios';
import Ghibli from './Componentes/ghibli';
import Gatos from './Componentes/gatos';
import Administrador from './Componentes/administrador';
import Registro from './Componentes/registro';
import Login from './Componentes/login'; // Asegúrate de tener este componente
import RequireAdmin from './Componentes/requireadmin'; // Asegúrate de importar el componente RequireAdmin

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();
    // Escucha cambios en la sesión
    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}
        <Routes>
          <Route path="/" element={usuario ? <Lista /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuario /> : <Navigate to="/login" />} />
          <Route path="/aleatorios" element={usuario ? <Aleatorios /> : <Navigate to="/login" />} />
          <Route path="/explorar" element={usuario ? <Explorar /> : <Navigate to="/login" />} />
          <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path="/ghibli/:id" element={usuario ? <Ghibli /> : <Navigate to="/login" />} />
          <Route path="/gatos" element={usuario ? <Gatos /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/administrador" element={
            usuario ? (
              <RequireAdmin usuario={usuario}>
                <Administrador />
              </RequireAdmin>
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;