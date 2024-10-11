import { BASE_URL } from "../../Config";
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from 'axios';

import {

  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  GET_COURSES_SUCCESS, 
  GET_COURSES_FAILURE,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  FETCH_VIDEOS_REQUEST ,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  REMOVE_VIDEO,
  FETCH_SUBSCRIPTIONS_REQUEST,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  FETCH_SUBSCRIPTION_ID_REQUEST,
  FETCH_SUBSCRIPTION_ID_SUCCESS,
  FETCH_SUBSCRIPTION_ID_FAILURE,
  CREATE_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  DELETE_SUBSCRIPTION_REQUEST,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_FAILURE,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,

  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,

  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_BY_DOCUMENT_REQUEST,
  FETCH_ORDERS_BY_DOCUMENT_SUCCESS,
  FETCH_ORDERS_BY_DOCUMENT_FAILURE,

  FETCH_LATEST_ORDER_REQUEST,
  FETCH_LATEST_ORDER_SUCCESS,
  FETCH_LATEST_ORDER_FAILURE,

  CLEAR_ORDER_STATE

} from './actions-type';



export const uploadVideo = (videoData) => async (dispatch) => {
  try {
    // Opcional: Puedes despachar una acción para indicar que el upload está en progreso
    dispatch({ type: UPLOAD_VIDEO_REQUEST });

    const response = await axios.post(`${BASE_URL}/videos`, videoData);

    if (response.status === 201) {
      const newVideo = response.data.data;
      
      // Despachar acción exitosa con el nuevo video
      dispatch({ type: UPLOAD_VIDEO_SUCCESS, payload: newVideo });
    }
  } catch (error) {
    console.error("Error uploading video:", error);
    
    // Despachar acción de error
    dispatch({ type: UPLOAD_VIDEO_FAILURE, payload: error.message });
  }
};

export const fetchVideos = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_VIDEOS_REQUEST });

    const response = await axios.get(`${BASE_URL}/videos`);
    
    if (response.status === 200) {
      const videos = response.data.data; // Asegúrate de que este sea el formato correcto
      dispatch({ type: FETCH_VIDEOS_SUCCESS, payload: videos });
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    dispatch({ type: FETCH_VIDEOS_FAILURE, payload: error.message });
  }
};
export const removeVideo = (idVideo) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/videos/${idVideo}`);
    dispatch({ type: REMOVE_VIDEO, payload: idVideo });
  } catch (error) {
    console.error("Error eliminando video:", error);
    // Manejar error aquí (opcional)
  }
};

// actions.js
export const createCourse = (courseData) => async (dispatch) => {
  dispatch({ type: CREATE_COURSE_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/cursos/add`, courseData);
    dispatch({ type: CREATE_COURSE_SUCCESS, payload: response.data });
    return response.data; 
  } catch (error) {
    dispatch({ type: CREATE_COURSE_FAILURE, payload: error.response?.data?.message || error.message });
    throw error; 
  }
};

export const getCourses = () => {
  return async (dispatch) => {
      try {
          const response = await axios.get(`${BASE_URL}/cursos`);
          const courses = response.data; // Asegúrate de manejar el 'data' dentro de la respuesta
          
          dispatch({
              type: GET_COURSES_SUCCESS,
              payload: courses
          });
      } catch (error) {
          dispatch({
              type: GET_COURSES_FAILURE,
              payload: error.message
          });
      }
  };
};

// Acción para obtener un curso por su id
export const getCourseById = (idCourse) => {
  return async (dispatch) => {
    try {
      console.log(`Fetching course with ID: ${idCourse}`); // Log para verificar el ID del curso
      dispatch({ type: GET_COURSE_REQUEST }); // Inicia la carga

      const response = await axios.get(`${BASE_URL}/cursos/${idCourse}`);
      const course = response.data.data; 

      console.log('Course data fetched:', course); // Log para ver la respuesta de la API

      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: course, // Guardamos el curso en el payload
      });
    } catch (error) {
      console.error('Error fetching course:', error.message); // Log para capturar errores
      dispatch({
        type: GET_COURSE_FAILURE,
        payload: error.message, // Enviamos el mensaje de error si ocurre
      });
    }
  };
};




export const updateCourse = (idCourse, updatedCourseData) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_UPDATE_REQUEST });

    const { data } = await axios.put(`${BASE_URL}/cursos/update/${idCourse}`, updatedCourseData);

    console.log('Respuesta de la API:', data); // Agrega esto para verificar la respuesta

    dispatch({
      type: COURSE_UPDATE_SUCCESS,
      payload: data,
    });

    toast.success('Curso actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload: error.response?.data.message || 'Error al actualizar el curso',
    });

    toast.error(error.response?.data.message || 'Error al actualizar el curso');
  }
};



export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${BASE_URL}/users/signup`,userData, config)
   

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Asegúrate de que la URL sea correcta
    const { data } = await axios.post(`${BASE_URL}/users/signin`, { email, password }, config);
    console.log(`${BASE_URL}/auth/signin`);

    // Decodifica el token para obtener el rol del usuario
    const decodedToken = jwtDecode(data.data.token); // Accede a data.data.token
    const userInfo = {
      token: data.data.token, // Accede a data.data.token
      role: decodedToken.role,
      document: decodedToken.document,
      message: data.data.message,
    };

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo,
    });

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};




export const fetchSubscriptions = () => async (dispatch) => {
  dispatch({ type: FETCH_SUBSCRIPTIONS_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/suscripcion`);
    console.log("Response data:", response.data); // Verifica la respuesta de la API
    dispatch({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.error("Error fetching subscriptions:", error); // Verifica si hay errores
    dispatch({ type: FETCH_SUBSCRIPTIONS_FAILURE, payload: error.message });
  }
};

// Acción para obtener una suscripción por ID
export const fetchSubscriptionById = (idSub) => async (dispatch) => {
  dispatch({ type: FETCH_SUBSCRIPTION_ID_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/suscripcion/${idSub}`);
    dispatch({ type: FETCH_SUBSCRIPTION_ID_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_SUBSCRIPTION_ID_FAILURE, payload: error.message });
  }
};




// Crear una suscripción
export const createSubscription = (subscriptionData) => async (dispatch) => {
  dispatch({ type: CREATE_SUBSCRIPTION_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/suscripcion`, subscriptionData);
    dispatch({ type: CREATE_SUBSCRIPTION_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: CREATE_SUBSCRIPTION_FAILURE, payload: error.message });
  }
};

// Actualizar una suscripción
export const updateSubscription = (idSub, subscriptionData) => async (dispatch) => {
  dispatch({ type: UPDATE_SUBSCRIPTION_REQUEST });
  try {
    const response = await axios.put(`${BASE_URL}/suscripcion/${idSub}`, subscriptionData);
    dispatch({ type: UPDATE_SUBSCRIPTION_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: UPDATE_SUBSCRIPTION_FAILURE, payload: error.message });
  }
};

// Eliminar una suscripción
export const deleteSubscription = (idSub) => async (dispatch) => {
  dispatch({ type: DELETE_SUBSCRIPTION_REQUEST });
  try {
    await axios.delete(`${BASE_URL}/suscripcion/${idSub}`);
    dispatch({ type: DELETE_SUBSCRIPTION_SUCCESS, payload: idSub });
  } catch (error) {
    dispatch({ type: DELETE_SUBSCRIPTION_FAILURE, payload: error.message });
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const { data } = await axios.post(`${BASE_URL}/order/`, orderData);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.data.orderCompra, // Ajusta según la respuesta de tu backend
    });

    // Retorna la acción para manejarla en el componente
    return { type: ORDER_CREATE_SUCCESS, payload: data.data.orderCompra };
   
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
    // Retorna la acción de fallo
    return { type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message };
  }
};

export const clearOrderState = () => ({
  type: CLEAR_ORDER_STATE,
});

export const fetchOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const response = await axios.get(`${BASE_URL}/order`);
    console.log("Response data from backend:", response.data); // Verifica los datos que llegan

    // Asegúrate de que la estructura de los datos sea la correcta
    const orders = response.data.data.orders;

    dispatch({ 
      type: FETCH_ORDERS_SUCCESS, 
      payload: orders 
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    dispatch({ 
      type: FETCH_ORDERS_FAILURE, 
      payload: error.message 
    });
  }
};




export const fetchOrdersByDocument = (document) => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_BY_DOCUMENT_REQUEST });

  try {
    const response = await axios.get(`${BASE_URL}/order/${document}`);  // Usa axios y asegúrate de que la URL sea correcta
    console.log("Response data by document from backend:", response.data);
    
    dispatch({
      type: FETCH_ORDERS_BY_DOCUMENT_SUCCESS,
      payload: response.data.data.orders  // Extrae directamente el array de "orders"
    });
  } catch (error) {
    console.error("Error fetching orders by document:", error);
    dispatch({
      type: FETCH_ORDERS_BY_DOCUMENT_FAILURE,
      payload: error.message
    });
  }
};


export const fetchLatestOrder = () => async (dispatch) => {
  dispatch({ type: FETCH_LATEST_ORDER_REQUEST });
  try {
    const { data } = await axios.get(`${BASE_URL}/order?latest=true`);
    dispatch({ type: FETCH_LATEST_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_LATEST_ORDER_FAILURE, payload: error.response.data });
  }
};





