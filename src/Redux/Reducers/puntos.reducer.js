import {
  MOSTRAR_PUNTOS,
  ERROR_PUNTO,
  LIMPIAR_PUNTOS,
  ACTUALIZAR_PUNTO,
  AGREGAR_PUNTO,
  MOSTRAR_PUNTO_UNICO,
} from "../Types/types";

const initialState = {
  puntos: [],
  punto: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MOSTRAR_PUNTOS:
      return {
        puntos: payload,
        punto: null,
        loading: false,
        error: {},
      };
    case MOSTRAR_PUNTO_UNICO:
      return {
        ...state,
        punto: payload,
        loading: false,
        error: {},
      };
    case AGREGAR_PUNTO:
      return {
          loading: false,
          puntos: payload,
          error: '',
      };
      case ACTUALIZAR_PUNTO:
      return {
        ...state,
        loading: false
      }
    case LIMPIAR_PUNTOS:
      return {
        ...state,
        puntos: [],
        loading: false,
        error: {},
      };
    case ERROR_PUNTO:
      return {
        puntos: [],
        punto: null,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
  