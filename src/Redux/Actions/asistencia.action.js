import {
    MOSTRAR_CONVOCADOS,
    AGREGAR_CONVOCADO,
    ERROR_CONVOCADO,
    LIMPIAR_CONVOCADOS,
    ACTUALIZAR_CONVOCADO,
    MOSTRAR_ASISTENCIA_UNICA,
    ERROR_ASISTENCIA
} from "../Types/types.js"

import { fetchConToken } from "../../Components/helpers/fetch";

export const getConvocados = () => async (dispatch) => {
      
      try {
        const res = await fetchConToken(`ver-convocados`)
        const body = await res.json()
        /* console.log(body) */
    
        dispatch({
        type: MOSTRAR_CONVOCADOS,
        payload: body
    })
    
    } catch (error) {
     /*  console.log(error) */
      dispatch({
        type: ERROR_CONVOCADO,
        payload: { 
            msg: error
        }
    })
    }
}

export const getAsistencias = () => async (dispatch) => {
      
    try {
      const res = await fetchConToken(`ver-asistencia-puntos`)
      const body = await res.json()

  
      dispatch({
      type: MOSTRAR_ASISTENCIA_UNICA,
      payload: body
  })
  
  } catch (error) {
   /*  console.log(error) */
    dispatch({
      type: ERROR_ASISTENCIA,
      payload: { 
          msg: error
      }
  })
  }
}
    