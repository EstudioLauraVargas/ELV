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
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
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
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  FETCH_LATEST_ORDER_REQUEST,
  FETCH_LATEST_ORDER_SUCCESS,
  FETCH_LATEST_ORDER_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_BY_DOCUMENT_REQUEST,
  FETCH_ORDERS_BY_DOCUMENT_SUCCESS,
  FETCH_ORDERS_BY_DOCUMENT_FAILURE

  
} from "../Actions/actions-type";

const initialState = {
  loading: false,
  orders:[],
  ordersByDocument: [],
  error: null,
  videos: [],
  courses: [],
  course: null,
  subscriptions: [],

  userRegister: {
    userInfo: null,
    loading: false,
    error: null,
  },

  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    loading: false,
    error: null,
  },
  order: {
    loading: false,
    success: false,
    error: null,
    order: {},
  },
  latestOrder: {
    loading: false,
    success: false,
    error: null,
    data: {},
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

    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        error: null,
      };
    case GET_COURSES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };
    case GET_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_COURSE_REQUEST:
      return {
        ...state,

        error: null,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,

        courses: [...state.courses, action.payload], // Añade el nuevo curso al arreglo
      };
    case CREATE_COURSE_FAILURE:
      return {
        ...state,

        error: action.payload,
      };
    case COURSE_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COURSE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload,
      };

    case COURSE_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
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
      localStorage.removeItem("userInfo");
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
      return {
        ...state,
        loading: false,
        subscriptions: [...state.subscriptions, action.payload.data],
      };
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
        subscriptions: state.subscriptions.filter(
          (sub) => sub.idSub !== action.payload
        ),
      };
    case DELETE_SUBSCRIPTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case ORDER_CREATE_REQUEST:
      return {
        ...state,
        order: {
          ...state.order,
          loading: true,
          success: false,
          error: null,
        },
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: {
          ...state.order,
          loading: false,
          success: true,
          order: action.payload,
          error: null,
        },
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        order: {
          ...state.order,
          loading: false,
          success: false,
          error: action.payload,
        },
      };

      case FETCH_LATEST_ORDER_REQUEST:
      return {
        ...state,
        latestOrder: {
          ...state.latestOrder,
          loading: true,
          error: null,
        },
      };
    case FETCH_LATEST_ORDER_SUCCESS:
      return {
        ...state,
        latestOrder: {
          ...state.latestOrder,
          loading: false,
          success: true,
          data: action.payload.data,
        },
      };
    case FETCH_LATEST_ORDER_FAILURE:
      return {
        ...state,
        latestOrder: {
          ...state.latestOrder,
          loading: false,
          error: action.payload,
        },
      };
      case FETCH_ORDERS_REQUEST:
    case FETCH_ORDERS_BY_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
      case FETCH_ORDERS_SUCCESS:
        console.log('Action payload:', action.payload);  // Verifica qué está llegando aquí
        return {
          ...state,
          loading: false,
          orders: action.payload,  // Verifica que estás actualizando correctamente el estado "orders"
        };
      

    case FETCH_ORDERS_BY_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ordersByDocument: action.payload,
      };

    case FETCH_ORDERS_FAILURE:
    case FETCH_ORDERS_BY_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    default:
      return state;
  }
};
export default rootReducer;
