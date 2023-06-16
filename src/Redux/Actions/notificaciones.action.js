import { 
   MOSTRAR_NOTIFICACIONES,
   CAMBIAR_ESTADO_NOTIFICACION,
   LIMPIAR_NOTIFICACIONES,
   ERROR_NOTIFIACIONES
   } from "../Types/types";
  
  import { fetchConToken, fetchSinToken, fetchConTokenSinFile } from "../../Components/helpers/fetch";

  
  //GET Notificaciones
  export const mostrarNotificaciones = () => async dispatch => {
  
    dispatch({type: LIMPIAR_NOTIFICACIONES})
    try { //ver-notificaciones?limit=7&skip=0
        const res = await fetchConToken(`ver-notificaciones?limit=7&skip=0`)
        const body = await res.json();
     
        
        
        dispatch({
            type: MOSTRAR_NOTIFICACIONES,
            payload: body
        })
        
    } catch (err) { 
        //console.log(err)
        dispatch({
            type: ERROR_NOTIFIACIONES,
            payload: { 
                msg: err
            }
        })
    }
  }

  export const leerNotificiacion = (id) => async dispatch => {
    

  const resp = await fetchConTokenSinFile(`leer-notificacion/${id}`, 'PUT');

 try {
    
    if (resp.ok) {
        mostrarNotificaciones()  
        /* console.log(resp.ok) */
  } 
 } catch (error) {
    dispatch({
        type: ERROR_NOTIFIACIONES,
        payload: { 
            msg: error
        }
    })
 }

  //console.log("holaUpdate");
  //console.log(resp);

};
  
  