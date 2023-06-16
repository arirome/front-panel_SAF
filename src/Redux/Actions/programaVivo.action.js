import { 
    MOSTRAR_PROGRAMAS,
    AGREGAR_PROGRAMA,
    ERROR_PROGRAMA,
    LIMPIAR_PROGRAMAS,
    ACTUALIZAR_PROGRAMA,
    MOSTRAR_PROGRAMA_UNICO,
    ELIMINAR_PROGRAMA
} from "../Types/types";
   
   import { fetchConToken } from "../../Components/helpers/fetch";
   import { AlertaModal } from "../../Components/Layouts/Alertas/ModalAlerta"
  

   export const mostrarProgramasNF = (limit, skip) => async dispatch => {
   
     
     try {
         const res = await fetchConToken(`ver-programas?limit=${limit}&skip=${skip}`)
         const body = await res.json();
 
         dispatch({
             type: MOSTRAR_PROGRAMAS,
             payload: body
         })
         
     } catch (err) { 
         //console.log(err)
         dispatch({
             type: ERROR_PROGRAMA,
             payload: { 
                 msg: err
             }
         })
     }
   }
 
   export const guardarProgramaNF = (programaNF) => async dispatch => {
     

    try {
      const resp = await fetchConToken(`guardar-programa`,programaNF, 'POST');
        //console.log(programaNF)
        if (resp.status == 200) {
            return AlertaModal({
                tituloModal: "Programa NF Enviado",
                tipoModal: 'success',
                colorModal: '#7cd164',
                tiempoModal: 2000
            })    
        }
        dispatch({
            type: AGREGAR_PROGRAMA,
            payload: programaNF
        })
  } catch (error) {
     dispatch({
         type: ERROR_PROGRAMA,
         payload: { 
             msg: error
         }
     })
  }
 
   //console.log("holaUpdate");
   //console.log(resp);
 
    }; 

   export const actualizarProgramaNF = (idProgramaNF, data) => async dispatch => {
       /*  console.log(idProgramaNF)
         console.log(data) */
        try {
            const resp = await fetchConToken(`actualizar-programa/${idProgramaNF}`, data, 'PUT');

            if(resp.status == 200){
                return AlertaModal({
                    tituloModal: "Programa Actualizado",
                    tipoModal: 'success',
                    colorModal: '#7cd164',
                    tiempoModal: 2000
                })    
            }else{
                return AlertaModal({
                    tituloModal: "Error Al Actualizar El Programa",
                    tipoModal: 'error',
                    colorModal: '#f5061d',
                    tiempoModal: 2000
                })    
            }
        } catch (error) {
                /* console.log(error) */
                dispatch({
                    type: ERROR_PROGRAMA,
                    payload: { 
                        msg: error
                    }
                })
        }
    }