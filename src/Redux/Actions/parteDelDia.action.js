import axios from 'axios'

import {
    MOSTRAR_PARTES_DIAS,
    MOSTRAR_PARTE_DIA_UNICO,
    ERROR_PARTE_DIA,
    LIMPIAR_PARTES_DIAS,
    AGREGAR_PARTE_DIA,
    ACTUALIZAR_PARTE_DIA,
    MOSTRAR_PARTES_DIAS_POR_FECHA,
    ERROR_PARTES_DIAS_POR_FECHA,

    LIMPIAR_INVENTARIO,
    
    LIMPIAR_PRODUCTOS,
    LIMPIAR_PUNTOS
} from "../Types/types";

import { AlertaModal } from "../../Components/Layouts/Alertas/ModalAlerta"
import { fetchConToken } from '../../Components/helpers/fetch';

//Get Inventarios
export const mostrarParteDia = (limit,skip, fechaInicio, fechaFinal) => async dispatch => {

    dispatch({type: LIMPIAR_PUNTOS})
    dispatch({type: LIMPIAR_INVENTARIO})
    dispatch({type: LIMPIAR_PARTES_DIAS})
    dispatch({type: LIMPIAR_PRODUCTOS})
/* console.log(fechaInicio)
console.log(fechaFinal) */
    try {
        //const res = await axios.get(`http://localhost:5000/api/ver-partes-dias-grupos?limit=${limit}&skip=${skip}`)
        let res;
        if( fechaInicio && fechaFinal){
             res = await fetchConToken(`ver-partes-dias-grupos?limit=${limit}&skip=${skip}&fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`)
        }else{
             res = await fetchConToken(`ver-partes-dias-grupos?limit=${limit}&skip=${skip}`)
        }
        //console.log(res)
        const data = await res.json()
        dispatch({
            type: MOSTRAR_PARTES_DIAS,
            payload: data
        })
        
    } catch (err) {
        dispatch({
            type: ERROR_PARTE_DIA,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Post Inventario
export const crearParteDia = formData => async dispatch => {

    //const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        //const res = await axios.post(`http://localhost:5000/api/crear-parte`, formData, config)
        const res = await fetchConToken(`/crear-parte`, formData, 'POST')
       /*  const data = res.json() */
        console.log(res)
            
        dispatch({
            type: AGREGAR_PARTE_DIA,
            payload: formData
        })

        if (res.status == 200) {
            return AlertaModal({
                tituloModal: "Se Registro Correctamente",
                tipoModal: 'success',
                colorModal: '#7cd164',
                tiempoModal: 2000
              })
        }

        

    } catch (err) {

        if(err.response){
            dispatch({
                type: ERROR_PARTE_DIA,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const limpiarInventario = () => {
    dispatch({
        type: LIMPIAR_PARTES_DIAS,
        payload: null
    })
}

export const mostrarParteDiaPorFecha = pd => async dispatch =>{
    //pd == Parte Del Dia
   /*  console.log(pd) */

    dispatch({type: LIMPIAR_PARTES_DIAS})

    try {
        
        dispatch({
            type: MOSTRAR_PARTES_DIAS_POR_FECHA,
            payload: pd.datos 
        })
        
    } catch (err) {
        /* console.log(err) */
        dispatch({
            type: ERROR_PARTES_DIAS_POR_FECHA,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

