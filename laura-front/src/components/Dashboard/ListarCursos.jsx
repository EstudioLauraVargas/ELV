import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditarCurso from './EditarCursos'; // Asegúrate de importar el nuevo componente
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Lista de Cursos</h1>

      {cursos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Título</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Videos</th>
              <th className="py-2 px-4 border-b">Acciones</th>
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
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(curso.idCourse)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(curso.idCourse)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Eliminar
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
  );
};

export default ListarCursos;


