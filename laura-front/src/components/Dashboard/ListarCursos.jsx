import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditarCurso from './EditarCursos'; // Asegúrate de importar el nuevo componente
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import backgroundImage from "../../lauraassets/bg1.png"
import { FaEdit, FaTrash } from "react-icons/fa";

const ListarCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null); // Estado para almacenar el curso a editar
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/cursos")
      .then((response) => {
        if (!response.data.error) {
          setCursos(response.data.data); // Asegúrate de acceder a la propiedad 'data'
        } else {
          console.error("Error en la respuesta:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
      });
  }, []);

  const handleEdit = (idCourse) => {
    setCursoSeleccionado(idCourse); // Almacena el id del curso a editar
    navigate(`/editarCurso/${idCourse}`);   
  };

  const handleDelete = (idCourse) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este curso?");
    
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/cursos/delete/${idCourse}`, { data: { idCourse } })
        .then((response) => {
          if (!response.data.error) {
            setCursos(cursos.filter((curso) => curso.idCourse !== idCourse));
            toast.success("Curso eliminado con éxito!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            console.error("Error en la respuesta:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el curso:", error);
          toast.error("Error al eliminar el curso. Inténtalo de nuevo.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  if (cursoSeleccionado) {
    // Si hay un curso seleccionado, renderiza el componente de edición
    return <EditarCurso idCourse={cursoSeleccionado} />;
  }
  const handleGoToPanel = () => {
    navigate("/panel");
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center relative p-4 mt-4"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
      <Navbar/>
      <div className="container mx-auto p-4 mt-24 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        style={{ zIndex: 9999 }}
      />
     <div className="flex justify-between items-center mb-4">
  <button
    onClick={handleGoToPanel}
    className="bg-pink-500 text-white px-4 py-2 rounded"
  >
    Ir a Panel
  </button>
  <h1 className="text-2xl font-bold text-center flex-grow">
    Cursos Disponibles
  </h1>
</div>
      {cursos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Título</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Videos</th>
              <th className="py-2 px-4 border-b">Editar / Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.idCourse} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{curso.title}</td>
                <td className="py-2 px-4 border-b">
                  {curso.description || "Sin descripción"}
                </td>
                <td className="py-2 px-4 border-b">
                  {curso.Videos.length > 0
                    ? curso.Videos.map((video) => (
                        <div key={video.idVideo} className="mb-2">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-16 h-auto inline-block mr-2"
                          />
                          <span>{video.title}</span>
                        </div>
                      ))
                    : "No hay videos disponibles"}
                </td>
                <td className="py-2 px-4 border-b flex items-center">
              <button
                onClick={() => handleEdit(curso.idCourse)}
                className="text-pink-500 hover:text-pink-700 mr-2"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(curso.idCourse)}
                className="text-grey-300 hover:text-grey-700"
              >
                <FaTrash size={20} />
              </button>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay cursos disponibles.</p>
      )}
    </div>
    </div>
  );
};

export default ListarCursos;


