import { 
    MOSTRAR_NOTICIAS,
    ERROR_NOTICIA,
    AGREGAR_NOTICIA,
    LIMPIAR_NOTICIAS,
    ELIMINAR_NOTICIA,
    ACTUALIZAR_NOTICIA,
    MOSTRAR_NOTICIA_UNICA
} from "../Types/types";
   
   import { fetchConToken } from "../../Components/helpers/fetch";
   import { AlertaModal } from "../../Components/Layouts/Alertas/ModalAlerta"
import axios from "axios";
   //import { mostrarNotificaciones } from "./notificaciones.action.js"
   //GET Noticias
   export const mostrarNoticias = (limit, skip) => async dispatch => {
   
     
     try {
         const res = await fetchConToken(`ver-noticias?limit=${limit}&skip=${skip}`)
         const body = await res.json();
 
         dispatch({
             type: MOSTRAR_NOTICIAS,
             payload: body
         })
         
     } catch (err) { 
         //console.log(err)
         dispatch({
             type: ERROR_NOTICIA,
             payload: { 
                 msg: err
             }
         })
     }
   }
 
   export const guardarNoticia = (noticia) => async dispatch => {
    const config = {headers : {"Content-type": "multipart/form-data"}}
    //console.log(noticia)
    //console.log(resp)
    try {
      //const resp = await fetchConToken(`/guardar-noticiasNutricion`,noticia, 'POST');
      const resp = await axios.post('https://soberaniabackend.onrender.com/api/guardar-noticia', noticia, config)
       /*  console.log(resp) */
    console.log(noticia)
    //mostrarNotificaciones()
    //console.log(resp.status) 
    if (resp.status == 200) {
        return AlertaModal({
            tituloModal: "Noticia Enviada",
            tipoModal: 'success',
            colorModal: '#7cd164',
            tiempoModal: 2000
        })    
    }
    dispatch({
        type: AGREGAR_NOTICIA,
        payload: noticia
    })
  } catch (error) {
     dispatch({
         type: ERROR_NOTICIA,
         payload: { 
             msg: error
         }
     })
  }
 
   //console.log("holaUpdate");
   //console.log(resp);
 
    }; 

    export const actualizarNoticia = (idNoticia, formData) => async dispatch => {
        const config = {headers : {"Content-type": "multipart/form-data"}}
      /*   console.log(idNoticia)
        console.log(data) */
        try {
            /* const resp = await fetchConToken(`actualizar-noticia/${idNoticia}`, data, 'PUT'); */
           const resp = await  axios.put(`https://soberaniabackend.onrender.com/api/actualizar-noticia/${idNoticia}`, formData, config)
           /*  console.log(resp) */
            if(resp.status == 200){
                return AlertaModal({
                    tituloModal: "Noticia Actualizada",
                    tipoModal: 'success',
                    colorModal: '#7cd164',
                    tiempoModal: 2000
                })    
            }else{
                return AlertaModal({
                    tituloModal: "Error Al Actualizar La Noticia",
                    tipoModal: 'error',
                    colorModal: '#f5061d',
                    tiempoModal: 2000
                })    
            }
        } catch (error) {
            
        }
    }