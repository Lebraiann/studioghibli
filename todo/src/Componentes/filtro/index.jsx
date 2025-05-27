import { useState, useEffect } from 'react';
import './style.css'; 

function Filtro({ onFiltroChange }) {
    const filtros = [
      "Todos",
      "Hayao Miyazaki",
      "Isao Takahata",
      "Yoshifumi Kondō",
      "Hiroyuki Morita",
      "Hiromasa Yonebayashi",
      "Gorō Miyazaki"
    ];
  
    return (
      <div className="c-filtro">
        {filtros.map((filtro, index) => (
          <button className='' key={index} onClick={() => onFiltroChange(filtro)}>
            {filtro}
          </button>
        ))}
      </div>
    );
}

export default Filtro;