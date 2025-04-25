import { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';


function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Lista</Link>
          <Link to="/explorar">Explorar</Link>
          <Link to="/aleatorios">Aleatorio</Link>
          <Link to="/usuarios">Usuario</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/gatos">Gatos</Link>
        </nav>
    )
  }
  
  export default Menu