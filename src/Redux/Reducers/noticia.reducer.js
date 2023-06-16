

    import {
        MOSTRAR_NOTICIAS,
        ERROR_NOTICIA,
        AGREGAR_NOTICIA,
        LIMPIAR_NOTICIAS,
        ELIMINAR_NOTICIA,
        ACTUALIZAR_NOTICIA,
        MOSTRAR_NOTICIA_UNICA
      } from "../Types/types";
      
      const INITIAL_STATE = {
        noticias: [],
        noticia: {},
        loading: true,
        error: {}
      };
      
      export default function (state = INITIAL_STATE, action) {
      
        switch (action.type) {
          case MOSTRAR_NOTICIAS:
            return {
              ...state,
              noticias: action.payload,
              loading: false
            };
          case AGREGAR_NOTICIA:
            return {
              ...state,
              noticias: [action.payload, ...state.noticias],
              loading: false
            };
          case LIMPIAR_NOTICIAS:
            return {
              noticias: [],
              noticia: {},
              loading: true,
              error: {}
            };
          case ERROR_NOTICIA:
            return {
              ...state,
              loading: false,
              error: action.payload
            };
          default:
            return state;
        }
      };