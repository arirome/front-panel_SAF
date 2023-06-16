import {
  MOSTRAR_PRODUCTOS,
  LIMPIAR_PRODUCTOS,
  AGREGAR_PRODUCTO,
  ACTUALIZAR_PRODUCTO,
  ERROR_PRODUCTO,
  MOSTRAR_PRODUCTO_UNICO,
  ELIMINAR_PRODUCTOS
} from "../Types/types";

const initialState = {
  productos: [],
  producto: null,
  loading: true,
  error: {},
  totalProductos: 0,
  totalPaginas: 0,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
      case MOSTRAR_PRODUCTOS:
          return {
            productos: payload.productosFiltrados.reverse(),
            producto: null,
            loading: false,
            error: {},
            totalPaginas: payload.totalPages,
            totalProductos: payload.totalProductos,
          }
      case MOSTRAR_PRODUCTO_UNICO:
          return {
           
            producto: payload,
            loading: false,
            error: {}
          }
      case AGREGAR_PRODUCTO:
        return {
          loading: false,
          productos: action.payload,
          error: '',
        };
      case LIMPIAR_PRODUCTOS:
          return {
            ...state,
            productos: [],
            loading: false,
            error: {},
            totalProductos: 0,
            totalPaginas: 0,
          }
      case ERROR_PRODUCTO:
          return {
            productos: [],
            producto: null,
            error: payload,
            loading: false
          }
          
      default:
          return state
  }

}
