import {
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETE_ACCOUNT,
    LIMPIAR_USER,
    NO_EXISTE_USER
  } from "../Types/types";
  
  const initialState = {
    token: localStorage.getItem("x-token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
  
      case LOGOUT:
      case DELETE_ACCOUNT:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
        };
      case LIMPIAR_USER:
        return {
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        };
      case NO_EXISTE_USER:
        return {
          ...state,
          isAuthenticated: payload,
          loading: false,
         
        };
      default:
        return state;
    }
  }
  
  
  