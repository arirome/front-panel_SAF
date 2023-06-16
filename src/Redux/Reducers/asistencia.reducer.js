import {
    MOSTRAR_CONVOCADOS,
    AGREGAR_CONVOCADO,
    ERROR_CONVOCADO,
    LIMPIAR_CONVOCADOS,
    ACTUALIZAR_CONVOCADO,
    MOSTRAR_ASISTENCIA_UNICA,
    ERROR_ASISTENCIA
} from "../Types/types.js"
  
  const INITIAL_STATE = {
    convocados: [],
    convocadosPunto: [],
    asistenciaPunto:[],
    loading: true,
    errorConvocados : {},
    errorAsistencias: {}
  };
  
  export default function (state = INITIAL_STATE, action) {
  
    switch (action.type) {
      case MOSTRAR_CONVOCADOS:
        return {
          ...state,
          convocados: action.payload,
          loading: false
        };
      case MOSTRAR_ASISTENCIA_UNICA:
        return {
          ...state,
          asistenciaPunto: action.payload,
          loading: false
        };
      case ERROR_CONVOCADO:
        return {
          ...state,
          errorConvocados: action.payload,
          loading: false
        };
      case ERROR_ASISTENCIA:
        return {
          ...state,
          errorAsistencias: action.payload,
          loading: false
        };
      case LIMPIAR_CONVOCADOS:
        return {
          convocados: [],
          convocadosPunto: [],
          asistenciaPunto:[],
          loading: true,
          errorConvocados : {},
          errorAsistencias: {}
        };
      default:
        return state;
    }
  };