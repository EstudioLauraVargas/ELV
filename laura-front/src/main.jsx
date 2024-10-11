/* eslint-disable react/no-deprecated */
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux';
import { store } from './Redux/Store/store';



//axios.defaults.baseURL = "https://elv.onrender.com";
axios.defaults.baseURL ="http://localhost:3001"

ReactDOM.render(
  <Provider store={store}>
    
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
  </Provider>,
  document.getElementById('root')
);