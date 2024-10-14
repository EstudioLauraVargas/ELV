
import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/auth/Login"
import ForgotPassword from "./components/pages/auth/ForgotPassword"
import ChangePassword from "./components/pages/auth/ChangePassword"
import Landing from "./components/Landing/Landing";
import Procedimientos from "./components/Procedimientos/Procedimientos";
import Register from "./components/pages/auth/Register";
import Cursos from "./components/Cursos/Cursos";
import Users from "./components/Dashboard/Users"; 
import Video from "./components/services/Video"
import Panel from "./components/Dashboard/Panel";

import GestionCursos from "./components/Dashboard/GestionCursos";
import ABMCursos from "./components/Dashboard/ABMCursos";
import ABMBeneficios from "./components/Dashboard/ABMBeneficios"
import ListarCursos from "./components/Dashboard/ListarCursos";
import SubscriptionList from "./components/Dashboard/Subscriptions/SubscriptionList";
import SubscriptionForm from "./components/Dashboard/Subscriptions/SubscriptionForm";
import EditarCurso from "./components/Dashboard/EditarCursos";
import Suscripciones from "./components/Dashboard/Subscriptions/Suscripciones";
import EditSuscription from "./components/Dashboard/Subscriptions/EditSuscription ";
import PaymentDetail from "./components/Dashboard/Subscriptions/PaymentDetail";
import Navbar from "./components/Navbar";
import CursosDisponibles from "./components/Cursos/CursosDisponibles";
import TiendaCursos from "./components/Cursos/TiendaCursos";
import CourseDetail from "./components/Cursos/CourseDetail";
import SubscriptionCourseSelection from "./components/Cursos/SubscriptionCourseSelection";
import Footer from "./components/Footer/Footer";
import PaymentConfirmation from "./components/Cursos/PaymentConfirmation";
import OrderList from "./components/Dashboard/OrderList";
import MisCursos from "./components/pages/MisCursos";
import CargarVideos from "./components/Dashboard/CargarVideos"
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
  <div>
    <Navbar />
      <Routes>
      
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changePass" element={<ChangePassword />} />
        <Route path="/forgotPass" element={<ForgotPassword />} />
        <Route path="/video/:id" element={<PrivateRoute><Video/></PrivateRoute>} /> 
        <Route path="/procedimiento" element={<Procedimientos />} />
        <Route path="/cursos" element={<Cursos />}/> 
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/panel" element={<PrivateRoute><Panel/></PrivateRoute>} />
        <Route path="/videos" element={<PrivateRoute><CargarVideos/></PrivateRoute>} />
        <Route path="/gestioncursos" element={<PrivateRoute><GestionCursos/></PrivateRoute>} />
        <Route path="/listarCursos" element={<PrivateRoute><ListarCursos/></PrivateRoute>} />
    
        <Route path="/listarOrdenes" element={<PrivateRoute><OrderList/></PrivateRoute>} />
        <Route path="/editarCurso/:idCourse" element={<PrivateRoute><EditarCurso/></PrivateRoute>} />
        <Route path="/abmcursos" element={<PrivateRoute><ABMCursos/></PrivateRoute>} />
        <Route path="/beneficios" element={<PrivateRoute><ABMBeneficios/></PrivateRoute>} />
        <Route path="/tiendaCursos" element={<TiendaCursos/>}/>
        <Route path="/curso/:idCourse" element={<CourseDetail />} />
        <Route path="/suscCourse" element={<SubscriptionCourseSelection/>}/>
        <Route path="/pay" element={<PrivateRoute><PaymentConfirmation/></PrivateRoute>}/>
        <Route path="/listarSuscripciones" element={<PrivateRoute><SubscriptionList/></PrivateRoute>} />
        <Route path="/crudSubs" element={<PrivateRoute><Suscripciones/></PrivateRoute>} />
        <Route path="/misCursos" element={<PrivateRoute><MisCursos/></PrivateRoute>} />
        <Route path="/crearSubs" element={<PrivateRoute><SubscriptionForm/></PrivateRoute>} />
        <Route path="/editarSubs/:idSub" element={<PrivateRoute><EditSuscription/></PrivateRoute>} />
        
        <Route path="/detallePago/:idSub" element={<PrivateRoute><PaymentDetail /></PrivateRoute>} />
        <Route path="/cursosDisponibles" element={<CursosDisponibles />} />
      </Routes>
      <Footer/>
      </div>
  );
}

export default App;


