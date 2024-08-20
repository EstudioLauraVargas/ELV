/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import {
 
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
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
  CREATE_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  DELETE_SUBSCRIPTION_REQUEST,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_FAILURE,
  FETCH_SUBSCRIPTION_ID_REQUEST,
  FETCH_SUBSCRIPTION_ID_SUCCESS,
  FETCH_SUBSCRIPTION_ID_FAILURE,
  

} from "../Actions/actions-type";

const initialState = {

  loading: false,
  error: null,
  videos:[],
  courses:[],
  subscriptions: [],

  userRegister: {
    userInfo: null,
    loading: false,
    error: null,
  },
 

  userLogin: {
    userInfo: null,
    loading: false,
    error: null,
  },

  
};



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,

        
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    
      case CREATE_COURSE_REQUEST:
        return { 
          ...state,
           loading: true 
          };
      case CREATE_COURSE_SUCCESS:
        return {
          ...state,
          loading: false,
          courses: [...state.courses, action.payload]
        };
      case CREATE_COURSE_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: action.payload
        };
        case COURSE_UPDATE_REQUEST:
          return { 
            ...state, 
            loading: true 
          };
    
        case COURSE_UPDATE_SUCCESS:
          return { 
            ...state, 
            loading: false, 
            courses: action.payload 
          };
    
        case COURSE_UPDATE_FAIL:
          return {
            ...state, 
            loading: false, 
            error: action.payload 
          };
  
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          loading: true,
          error: null,
        },
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          loading: false,
          userInfo: action.payload,
          error: null,
        },
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          loading: false,
          error: action.payload,
        },
      };
    case USER_LOGOUT:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          userInfo: null,
        },
      };
   
      case FETCH_SUBSCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      console.log("Subscriptions payload:", action.payload); // Verifica el payload recibido
      return {
        ...state,
        loading: false,
        subscriptions: action.payload, // Asegúrate de que esta línea maneje el array de suscripciones
      };
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case FETCH_SUBSCRIPTION_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_SUBSCRIPTION_ID_SUCCESS:
        console.log("Subscriptions payload:", action.payload); // Verifica el payload recibido
        return {
          ...state,
          loading: false,
          subscriptions: action.payload, // Asegúrate de que esta línea maneje el array de suscripciones
        };
      case FETCH_SUBSCRIPTION_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case CREATE_SUBSCRIPTION_REQUEST:
        return { ...state, loading: true };
      case CREATE_SUBSCRIPTION_SUCCESS:
        return { ...state, loading: false, subscriptions: [...state.subscriptions, action.payload.data] };
      case CREATE_SUBSCRIPTION_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_SUBSCRIPTION_REQUEST:
        return { ...state, loading: true };
      case UPDATE_SUBSCRIPTION_SUCCESS:
        return {
          ...state,
          loading: false,
          subscriptions: state.subscriptions.map((sub) =>
            sub.idSub === action.payload.data.idSub ? action.payload.data : sub
          ),
        };
      case UPDATE_SUBSCRIPTION_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case DELETE_SUBSCRIPTION_REQUEST:
        return { ...state, loading: true };
      case DELETE_SUBSCRIPTION_SUCCESS:
        return {
          ...state,
          loading: false,
          subscriptions: state.subscriptions.filter((sub) => sub.idSub !== action.payload),
        };
      case DELETE_SUBSCRIPTION_FAILURE:
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default rootReducer;
