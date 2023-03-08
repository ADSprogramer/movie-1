import { useEffect, useState } from 'react';
import './App.css';
import PageWrapper from './pageWrapper';
import Paginacion from './Paginacion';
import Pelicula from './Movie';
// import peliculasJson from './api';

function App() {

  const [paginaActual, setPaginaActual] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  const TOTAL_POR_PAGINA = 7;

  useEffect(() => {
    anyApi();
  }, []);

  // let peliculas = peliculasJson;

  const anyApi = async () => {

    // https://cors-anywhere.herokuapp.com/

    let response = await fetch('https://raw.githubusercontent.com/jaito789/json/main/peliculas.json', {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
            // "Accept": 'aplication/json',
            // "Content-type": 'aplication/json',
            // "origin": 'https://www.omdbapi.com/?i=tt3896198&apikey=7f1fd26d'
        }
    });

    let json = await response.json();

    setPeliculas(json);

  }

  const getTotalPaginas = () => {
    let cantidadTotalDePeliculas = peliculas.length;
    return Math.ceil(cantidadTotalDePeliculas / TOTAL_POR_PAGINA);
  }

  let slicePeliculas = peliculas.slice(
    (paginaActual - 1) * TOTAL_POR_PAGINA,
    paginaActual * TOTAL_POR_PAGINA
);

  return (
    <PageWrapper>

      {slicePeliculas.map(peliculas =>
        <Pelicula titulo={peliculas.titulo} calificacion={peliculas.calificacion}
          director={peliculas.director} actores={peliculas.actores} fecha={peliculas.fecha_lanzamiento} duracion={peliculas.duracion}
          img={peliculas.img}>
          {peliculas.descripcion}
        </Pelicula>
      )}

      <Paginacion pagina={paginaActual} total={getTotalPaginas()} onChange={(pagina) => {
        setPaginaActual(pagina)
      }} />

    </PageWrapper>
  );
}

export default App;