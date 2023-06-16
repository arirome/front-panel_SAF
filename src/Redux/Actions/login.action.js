import axios from 'axios'

import { 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT, 
    LIMPIAR_USER, 
    NO_EXISTE_USER,


    LIMPIAR_PARTES_DIAS,
    LIMPIAR_PRODUCTOS,
    LIMPIAR_PUNTOS,
    LIMPIAR_INVENTARIO,
    LIMPIAR_DISTRIBUIDORES,
    LIMPIAR_CRONOGRAMA,
    LIMPIAR_NOTIFICACIONES,
    LIMPIAR_NOTICIAS,
    LIMPIAR_PROGRAMAS

} from "../Types/types";

import { AlertaModal } from "../../Components/Layouts/Alertas/ModalAlerta"
import setAuthToken from '../../Components/Helpers/setAuthToken'
import { fetchSinToken, fetchConTokenSinFile, fetchConToken } from "../../Components/helpers/fetch";
//LOGIN USUARIO
export const loginUser = (correo, password) => async dispatch => {
    
    const config = {headers : {'Content-Type':'application/json'}}

    const body = JSON.stringify({correo, password})

    
    try {
        const res = await axios.post("https://soberaniabackend.onrender.com/api/login", body, config)
        //const res2 = await fetchSinToken(`login`, body, 'POST')
       
       // const data = await res2.json()
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })


        
        dispatch(loadUser())
        
    } catch (err) {

        const errors = err
       // console.log(errors)
/*          
        if(errors){
            errors.forEach(error => dispatch(console.log(error)))
        } */
        
        dispatch({
            type: LOGIN_FAIL
        })

        return AlertaModal({
            tituloModal: "Error Al Iniciar Sesion",
            tipoModal: 'error',
            colorModal: '#f5061d',
            tiempoModal: 2000
          })
    }
}

export const loadUser = () => async dispatch => {

    if(localStorage.token) {
        setAuthToken(localStorage.token)
        /* console.log(localStorage.token) */
    }

    
    
    try {
        const res = await fetchConTokenSinFile(`loadUser`)
     
        const data = await res.json()
        //const res = await axios.get("https://soberaniabackend.onrender.com/api/loadUser")
        //console.log(data)
        dispatch({
            type: USER_LOADED,
            payload: data
        })

        

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const noExisteUsuario = () => async dispatch => {
    try {
       
        dispatch({
            type: NO_EXISTE_USER,
            payload: false
        })

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const logout = () => dispatch => {
   dispatch({type : LOGOUT }) 
   dispatch({type: LIMPIAR_USER})

   dispatch({type : LIMPIAR_PARTES_DIAS })
   dispatch({type : LIMPIAR_PRODUCTOS })
   dispatch({type : LIMPIAR_PUNTOS })
   dispatch({type : LIMPIAR_INVENTARIO })
   dispatch({type : LIMPIAR_DISTRIBUIDORES })
   dispatch({type : LIMPIAR_CRONOGRAMA })
   dispatch({type : LIMPIAR_NOTIFICACIONES })
   dispatch({type : LIMPIAR_NOTICIAS })
   dispatch({type : LIMPIAR_PROGRAMAS })
} 
