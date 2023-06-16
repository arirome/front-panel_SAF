import { 
    MOSTRAR_NUTRI_NOTICIAS,
    ERROR_NUTRI_NOTICIAS,
    AGREGAR_NUTRI_NOTICIAS,
    LIMPIAR_NUTRI_NOTICIAS,
    ELIMINAR_NUTRI_NOTICIAS,
    ACTUALIZAR_NUTRI_NOTICIAS,
    MOSTRAR_NUTRI_NOTICIA_UNICA
} from "../Types/types";
   
   import { fetchConToken } from "../../Components/helpers/fetch";
   import { AlertaModal } from "../../Components/Layouts/Alertas/ModalAlerta"
import axios from "axios";
   
   //GET Noticias
   export const mostrarNutriNoticias = (limit, skip) => async dispatch => {
   
     
     try {
         const res = await fetchConToken(`ver-nutriNoticias?limit=${limit}&skip=${skip}`)
         const body = await res.json();
 
         dispatch({
             type: MOSTRAR_NUTRI_NOTICIAS,
             payload: body
         })
         
     } catch (err) { 
         //console.log(err)
         dispatch({
             type: ERROR_NUTRI_NOTICIAS,
             payload: { 
                 msg: err
             }
         })
     }
   }
 
   export const guardarNutriNoticia = (nutriNoticia) => async dispatch => {
    const config = {headers : {"Content-type": "multipart/form-data"}}
   
    try {
     
      const resp = await axios.post('http://localhost:5000/api/guardar-nutriNoticias', nutriNoticia, config)
       
      console.log("resp",resp)

    console.log("nutriNoticia",nutriNoticia)
  
    if (resp.status == 200) {
        return AlertaModal({
            tituloModal: "Nutri-Noticias Enviada",
            tipoModal: 'success',
            colorModal: '#7cd164',
            tiempoModal: 2000
        })    
    }
    dispatch({
        type: AGREGAR_NUTRI_NOTICIAS,
        payload: nutriNoticia
    })
  } catch (error) {
     dispatch({
         type: ERROR_NUTRI_NOTICIAS,
         payload: { 
             msg: error
         }
     })
  }
 
   //console.log("holaUpdate");
   //console.log(resp);
 
    }; 

    export const actualizarNutriNoticia = (idNoticia, formData) => async dispatch => {
        const config = {headers : {"Content-type": "multipart/form-data"}}
      /*   console.log(idNoticia)
        console.log(data) */
        try {
            /* const resp = await fetchConToken(`actualizar-noticia/${idNoticia}`, data, 'PUT'); */
           const resp = await  axios.put(`http://localhost:5000/api/actualizar-nutriNoticias/${idNoticia}`, formData, config)
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

             console.log("errores",error)
        }
    }