

import { 
    MOSTRAR_NUTRI_NOTICIAS,
    ERROR_NUTRI_NOTICIAS,
    AGREGAR_NUTRI_NOTICIAS,
    LIMPIAR_NUTRI_NOTICIAS,
    ELIMINAR_NUTRI_NOTICIAS,
    ACTUALIZAR_NUTRI_NOTICIAS,
    MOSTRAR_NUTRI_NOTICIA_UNICA
} from "../Types/types";


  const INITIAL_STATE = {
    nutriNoticias: [],
    nutriNoticia: {},
    loading: true,
    error: {}
  };
  
  export default function (state = INITIAL_STATE, action) {
  
    switch (action.type) {
      case MOSTRAR_NUTRI_NOTICIAS:
        return {
          ...state,
          nutriNoticias: action.payload,
          loading: false
        };
      case AGREGAR_NUTRI_NOTICIAS:
        return {
          ...state,
          nutriNoticias: [action.payload, ...state.nutriNoticias],
          loading: false
        };
      case LIMPIAR_NUTRI_NOTICIAS:
        return {
            nutriNoticias: [],
            nutriNoticia: {},
          loading: true,
          error: {}
        };
      case ERROR_NUTRI_NOTICIAS:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };