
import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/auth/Login"
import ForgotPassword from "./components/pages/auth/ForgotPassword"
import ChangePassword from "./components/pages/auth/ChangePassword"
import Landing from "./components/Landing/Landing";
import Procedimientos from "./components/Procedimientos/Procedimientos";
import Register from "./components/pages/auth/Register";
import Cursos from "./components/Cursos/Cursos";
import Users from "./components/Users"; 
import Video from "./components/services/Video"
import Panel from "./components/Dashboard/Panel";
import MisCursos from "./components/Cursos/MisCursos"
import GestionCursos from "./components/Dashboard/GestionCursos";
import ABMCursos from "./components/Dashboard/ABMCursos";
import ListarCursos from "./components/Dashboard/ListarCursos"

function App() {
  return (
  
      <Routes>
      
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changePass" element={<ChangePassword />} />
        <Route path="/forgotPass" element={<ForgotPassword />} />
        <Route path="/video/:id" element={<Video/>} />
        <Route path="/procedimiento" element={<Procedimientos />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/users" element={<Users />} />
        <Route path="/panel" element={<Panel/>} />
        <Route path="/misCursos" element={<MisCursos/>} />
        <Route path="/gestioncursos" element={<GestionCursos/>} />
        <Route path="/listarCursos" element={<ListarCursos/>} />
        <Route path="/abmcursos" element={<ABMCursos/>} />

      </Routes>
   
  );
}

export default App;


