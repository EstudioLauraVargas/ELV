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
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
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
  GET_COURSE_FAILURE

} from './actions-type';




export const fetchVideos = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/videos/videos`, {
      method: 'GET',
      // headers: {
      //     Authorization: `Bearer ${tokens.access_token}`,
      // },
    });

    console.log('Response received:', response);

    if (!response.ok) {
      // Lanza un error si la respuesta HTTP no es exitosa
      throw new Error(`Error HTTP! Estado: ${response.status}`);
    }

    const data = await response.json();
    const videos = data.data.videos; // Asegúrate de acceder correctamente al array de videos

    dispatch({ type: FETCH_VIDEOS_SUCCESS, payload: videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    dispatch({ type: FETCH_VIDEOS_FAILURE, payload: error.message });
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
      dispatch({ type: GET_COURSE_REQUEST }); // Inicia la carga

      const response = await axios.get(`${BASE_URL}/cursos/${idCourse}`);
      const course = response.data.data; 

      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: course, // Guardamos el curso en el payload
      });
    } catch (error) {
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