import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux';
import { store } from './Redux/Store/store';


//axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = " https://elv.onrender.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  <ToastContainer/>
  </Provider>
);