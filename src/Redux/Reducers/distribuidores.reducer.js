import {
    VER_DISTRIBUIDORES_SUCCESS, VER_PRODUCTOS_POR_DISTRIBUIDORES, ERROR_PRODUCTOS_POR_DISTRIBUIDORES, LIMPIAR_DISTRIBUIDORES
  } from "../Types/types";
  
  const INITIAL_STATE = {
    distribuidores: [],
    productos_distribuidores: [],
    cantidad_productos_distribuidores: 0,
    loading: {},
    error : {}
  };
  
  export default function (state = INITIAL_STATE, action) {
  
    switch (action.type) {
      case VER_DISTRIBUIDORES_SUCCESS:
        return {
          ...state,
          distribuidores: action.payload,
          loading: false
        };
      case VER_PRODUCTOS_POR_DISTRIBUIDORES:
        return {
          ...state,
          productos_distribuidores: action.payload.productos,
          cantidad_productos_distribuidores: action.payload.cantidadProductos,
          loading: false
        };
      case ERROR_PRODUCTOS_POR_DISTRIBUIDORES:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case LIMPIAR_DISTRIBUIDORES:
        return {
          distribuidores: [],
          productos_distribuidores: [],
          cantidad_productos_distribuidores: 0,
          loading: {},
          error : {}
        };
      default:
        return state;
    }
  };
  