import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


axios.defaults.baseURL = "http://localhost:3001/";

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  <ToastContainer/>
  </>
);