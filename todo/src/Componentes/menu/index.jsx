import { useState, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';

function Menu() {
    const [esAdmin, setEsAdmin] = useState(false);

    useEffect(() => {
        async function verificarRol() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('usuarios')
                    .select('rol')
                    .eq('id', user.id)
                    .single();
                
                if (data && data.roll === 'admin') {
                    setEsAdmin(true);
                }
            }
        }
        verificarRol();
    }, []);

    return (
        <nav className="c-menu">
          <Link to="/">Lista</Link>
          <Link to="/explorar">Explorar</Link>
          <Link to="/aleatorios">Aleatorio</Link>
          <Link to="/usuarios">Usuario</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/gatos">Gatos</Link>
          {esAdmin && <Link to="/administrador">Administrador</Link>}
        </nav>
    )
}

export default Menu