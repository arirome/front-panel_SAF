import { combineReducers } from "redux";

import auth from "./login.reducer";
import inventarioReducer from "./inventario.reducer"; 
import productosReducer from "./productos.reducer"
import puntosReducer from "./puntos.reducer";
import parteDelDiaReducer from "./parteDelDia.reducer";
import distribuidoresReducer from "./distribuidores.reducer"
import notificacionesReducer from "./notificaciones.reducer";
import noticiaReducer from "./noticia.reducer";
import nutriNoticiaReducer from "./nutriNoticia.reducer";
import programaVivoReducer from "./programaVivo.reducer";
import cronogramaReducer from "./cronograma.reducer"
import asistenciaReducer from "./asistencia.reducer"
export default combineReducers({

  auth,
  notificacionesReducer,
  inventarioReducer,
  productosReducer,
  puntosReducer,
  parteDelDiaReducer,
  distribuidoresReducer,
  noticiaReducer,
  nutriNoticiaReducer,
  programaVivoReducer,
  cronogramaReducer,
  asistenciaReducer
});
