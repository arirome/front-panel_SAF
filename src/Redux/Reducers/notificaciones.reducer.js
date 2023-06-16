import {
    MOSTRAR_NOTIFICACIONES,
    CAMBIAR_ESTADO_NOTIFICACION,
    LIMPIAR_NOTIFICACIONES,
    ERROR_NOTIFIACIONES
  } from "../Types/types";
  
  const INITIAL_STATE = {
    notificaciones: [],
    loading: true,
    error: {}
  };
  
  export default function (state = INITIAL_STATE, action) {
  
    switch (action.type) {
      case MOSTRAR_NOTIFICACIONES:
        return {
          ...state,
          notificaciones: action.payload,
          loading: false
        };
      case LIMPIAR_NOTIFICACIONES:
        return {
          notificaciones: [],
          loading: true,
          error: {}
        };
      case ERROR_NOTIFIACIONES:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };