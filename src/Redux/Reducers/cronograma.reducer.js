import {
    VER_CRONOGRAMA,
    VER_CRONOGRAMA_UNICO,
    ERROR_CRONOGRAMA,
    LIMPIAR_CRONOGRAMA,
    ACTUALIZAR_CRONOGRAMA
  } from "../Types/types";
  
  const INITIAL_STATE = {
    cronograma: [],
    cronograma_editar: [],
    loading: true,
    error : {}
  };
  
  export default function (state = INITIAL_STATE, action) {
  
    switch (action.type) {
      case VER_CRONOGRAMA:
        return {
          ...state,
          cronograma: action.payload,
          loading: false
        };
      case ERROR_CRONOGRAMA:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case LIMPIAR_CRONOGRAMA:
        return {
          cronograma: [],
          cronograma_editar: [],
          loading: true,
          error : {}
        };
      default:
        return state;
    }
  };