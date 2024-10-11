import React from 'react';
import backgroundImage from '../../lauraassets/sombras.png'; // Asegúrate de que la ruta sea correcta
import CursosCarousel from '../../components/Cursos/CursosCarousel'

const Section2 = () => {
  return (
    <div className="relative h-screen bg-black">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.3 }}
      ></div>

      {/* Capa de color negro con opacidad sobre la imagen */}
      <div className="absolute inset-0 "></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full xl: mt-28 xl: mb-36">
        <h1 className="xl:text-4xl text-center lg:text-5xl font-bold text-white mb-4 bg-pink-200 bg-opacity-50 p-4">
          ACERCA DE LAURA VARGAS
        </h1>

        <div className="flex flex-col lg:flex-column  items-center lg:justify-center px-4 lg:px-8 w-full">
          {/* Recuadro semitransparente con texto clickeable */}
          

          {/* Contenido del lado derecho */}
          <div className="flex flex-col items-center lg:items-start lg:justify-center lg:w-2/3 max-w-lg p-4 lg:p-8 text-center lg:text-right relative z-20 lg:mt-0">
            <p className="text-center lg:text-3xl text-white font-quicksand font-semibold">
              Laura es micropigmentadora especialista en cejas y labios, se ha capacitado desde hace más de 4 años para tener técnicas exclusivas con acabados súper naturales buscando realzar la belleza de sus clientas y estudiantes.
            </p>
          </div>
          <a 
            href="/tiendaCursos"
            className="w-full lg:w-2/3 h-72 flex items-center justify-center bg-pink-400 bg-opacity-30 text-white text-center p-8 rounded-lg shadow-lg z-20 no-underline hover:opacity-80 mb-36"
          >
            <CursosCarousel/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Section2;





