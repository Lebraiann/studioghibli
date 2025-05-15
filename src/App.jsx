import { useState } from 'react'
import { AppProvider } from './contexto/contexto';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Aleatorios from './Componentes/aleatorios'
import  Explorar from './Componentes/explorar'  
import Favoritos from './Componentes/favoritos'
import Lista from './Componentes/lista' 
import Usuario from './Componentes/usuarios'
import Menu from './Componentes/menu';
import Ghibli from './Componentes/ghibli';
import Gatos from './Componentes/gatos';

function App() {

  return (
     <AppProvider>
    <Router>

<Menu />


<Routes>
  <Route path="/" element={<Lista />} />
  <Route path="/usuarios" element={<Usuario />} />
  <Route path="/aleatorios" element={<Aleatorios />} />
  <Route path="/explorar" element={<Explorar />} />
  <Route path="/favoritos" element={<Favoritos />} />
  <Route path="/ghibli/:name" element={<Ghibli />} />
  <Route path="/gatos" element={<Gatos />} />
</Routes>

</Router>
 </AppProvider>
  )
}

export default App