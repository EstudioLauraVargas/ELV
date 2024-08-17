import React, { useEffect, useState } from "react";
import axios from "axios";

const ListarCursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    // Hacer la petición a la ruta que trae los cursos
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
    // Lógica para editar el curso
    console.log(`Editar curso con ID: ${idCourse}`);
  };

  const handleDelete = (idCourse) => {
    // Lógica para eliminar el curso
    axios
      .delete(`http://localhost:3001/cursos/delete/${idCourse}`, { data: { idCourse } })
      .then((response) => {
        if (!response.data.error) {
          setCursos(cursos.filter((curso) => curso.idCourse !== idCourse));
          console.log(`Curso con ID: ${idCourse} eliminado`);
        } else {
          console.error("Error en la respuesta:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el curso:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
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
