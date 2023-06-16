

import {
    MOSTRAR_PROGRAMAS,
    AGREGAR_PROGRAMA,
    ERROR_PROGRAMA,
    LIMPIAR_PROGRAMAS,
    ACTUALIZAR_PROGRAMA,
    MOSTRAR_PROGRAMA_UNICO,
    ELIMINAR_PROGRAMA
  } from "../Types/types";
  
  const INITIAL_STATE = {
    programasNF: [],
    programaNF: {},
    loading: true,
    error: {}
  };
  
  export default function (state = INITIAL_STATE, action) {
  
    switch (action.type) {
      case MOSTRAR_PROGRAMAS:
        return {
          ...state,
          programasNF: action.payload,
          loading: false
        };
      case AGREGAR_PROGRAMA:
        return {
          ...state,
          programasNF: [action.payload, ...state.programasNF],
          loading: false
        };
      case LIMPIAR_PROGRAMAS:
        return {
          programasNF: [],
          programaNF: {},
          loading: true,
          error: {}
        };
      case ERROR_PROGRAMA:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };