import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../supabase';

function RequireAdmin({ children, usuario }) {
    const [cargando, setCargando] = useState(true);
    const [esAdmin, setEsAdmin] = useState(false);

    useEffect(() => {
        async function verificarRol() {
            if (!usuario) {
                console.log("No hay usuario");
                setCargando(false);
                return;
            }

            console.log("Verificando rol para usuario:", usuario.id);
            
            const { data, error } = await supabase
                .from('usuario')
                .select('roll')
                .eq('id', usuario.id)
                .single();
            
            if (error) {
                console.error("Error al verificar rol:", error);
                setCargando(false);
                return;
            }

            console.log("Datos del usuario:", data);
            
            if (data?.roll === 'admin') {
                console.log("Usuario confirmado como admin");
                setEsAdmin(true);
            }
            
            setCargando(false);
        }

        verificarRol();
    }, [usuario]);

    if (cargando) return <div>Verificando permisos...</div>;
    
    if (!esAdmin) return <Navigate to="/" replace />;

    return children;
}

export default RequireAdmin;