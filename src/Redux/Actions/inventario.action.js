import axios from 'axios'

import {
    MOSTRAR_INVENTARIOS,
    MOSTRAR_INVENTARIO_UNICO,
    AGREGAR_INVENTARIO,
    EDITAR_INVENTARIO,
    ELIMINAR_INVENTARIO,
    LIMPIAR_INVENTARIO,
    ERROR_INVENTARIO,

    
    
    LIMPIAR_PARTES_DIAS,
    LIMPIAR_PRODUCTOS,
    LIMPIAR_PUNTOS
} from "../Types/types";

import { AlertaModal } from "../../Components/Layouts/Alertas/ModalAlerta"
import { fetchConToken, fetchConTokenFiles } from '../../Components/helpers/fetch';

//Get Inventarios
export const mostrarInventarios = (limit, skip) => async dispatch => {

    
    dispatch({type: LIMPIAR_INVENTARIO})
    dispatch({type: LIMPIAR_PARTES_DIAS})
    dispatch({type: LIMPIAR_PRODUCTOS})
    dispatch({type: LIMPIAR_PUNTOS})
    try {
        //const res = await axios.get(`http://localhost:5000/api/ver-inventario?limit=${limit}&skip=${skip}`)
        const res = await fetchConToken(`ver-inventario?limit=${limit}&skip=${skip}`)

        const data = await res.json()
        //console.log(res)
        dispatch({
            type: MOSTRAR_INVENTARIOS,
            payload: data
        })
        
    } catch (err) {
        dispatch({
            type: ERROR_INVENTARIO,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
export const mostrarInventarioUnico = (id) => async dispatch => {

    try {
        //const res = await axios.get(`http://localhost:5000/api/ver-inventario-unico/${id}`)
        const res = await fetchConToken(`/ver-inventario-unico/${id}`)
        const data = res.json()

        dispatch({
            type: MOSTRAR_INVENTARIO_UNICO,
            payload: data
        })
        
    } catch (err) {
        dispatch({
            type: ERROR_INVENTARIO,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Post Inventario
export const crearInventario = formData => async dispatch => {

    //const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        //const res = await axios.post(`http://localhost:5000/api/guardar-inventario`, formData, config)
        //console.log(res)
        const res = await fetchConToken(`/guardar-inventario`, formData, 'POST')
        const data = await res.json()
        
       /*  console.log(data) */
        dispatch({
            type: AGREGAR_INVENTARIO,
            payload: formData
        })

        if (res.status == 200) {
            return AlertaModal({
                tituloModal: data.msg,
                tipoModal: 'success',
                colorModal: '#7cd164',
                tiempoModal: 2000
              })
        }

        

    } catch (err) {

        if(err.response){
            dispatch({
                type: ERROR_INVENTARIO,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const actualizarInventario = formData => async dispatch => {
  /*   console.log(formData.idInventario.idInventario) */

    try {
        const resp = await fetchConToken(`actualizar-inventario/${formData.idInventario.idInventario}/${formData.idProducto.id}`, formData.producto, 'PUT');
   
        /* dispatch({
            type: EDITAR_INVENTARIO,
            payload: resp
        }) */
        //console.log(resp)
        if (resp.ok) {
            return AlertaModal({
                tituloModal: "Producto Actualizado",
                tipoModal: 'success',
                colorModal: '#7cd164',
                tiempoModal: 2000
              })
        }else {
            return AlertaModal({
                tituloModal: "Error Al Actualizar",
                tipoModal: 'error',
                colorModal: '#f5061d',
                tiempoModal: 2000
              })
        }
   
    } catch (error) {
        /* console.log(error) */
        dispatch({
            type: ERROR_INVENTARIO,
            payload: { 
                msg: error
            }
        })
    }
}

//Eliminar Inventario
export const eliminarInventario = (id) => async dispatch => {  
//console.log(id)
    try {

        //await axios.put(`http://localhost:5000/api/eliminar-log-inventario/${id}`)
        const res = await fetchConTokenFiles(`/eliminar-log-inventario/${id}`, 'PUT')
        const data = await res.json()
        /* console.log(data) */
        dispatch({
            type: ELIMINAR_INVENTARIO,
            payload: id
        })

        /* dispatch(setAlert('Post eliminado', 'success'))    */ 
        
        
    } catch (err) {
        
        dispatch({
            type: ERROR_INVENTARIO,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    } 
}

export const limpiarInventario = () => {
    dispatch({
        type: LIMPIAR_INVENTARIO,
        payload: null
    })
}

