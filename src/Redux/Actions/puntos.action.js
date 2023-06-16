import {
    MOSTRAR_PUNTOS,
    ERROR_PUNTO,
    LIMPIAR_PUNTOS,
    ACTUALIZAR_PUNTO,
    MOSTRAR_PUNTO_UNICO,
    AGREGAR_PUNTO,
    ELIMINAR_PUNTOS,

    LIMPIAR_INVENTARIO,
    LIMPIAR_PARTES_DIAS,
    LIMPIAR_PRODUCTOS,
   
  } from "../Types/types";

import axios from 'axios'
import { fetchConToken, fetchConTokenFormData, fetchConTokenSinFile } from "../../Components/helpers/fetch";

import imagenSucesss from "../../../src/Components/Assets/Images/paqueteOK.png"
import imagenSucesssEdit from "../../../src/Components/Assets/Images/educacion.png"

//Get Puntos
export const mostrarPunto = () => async dispatch => {

  dispatch({type: LIMPIAR_PUNTOS})
  dispatch({type: LIMPIAR_INVENTARIO})
  dispatch({type: LIMPIAR_PARTES_DIAS})
  dispatch({type: LIMPIAR_PRODUCTOS})
 
    

  try {
      
        const res = await fetchConToken(`/ver-puntos`)
        const body = await res.json()
      dispatch({
          type: MOSTRAR_PUNTOS,
          payload: body.reverse()
      })
      
  } catch (err) { 
      /* console.log(err) */
      dispatch({
          type: ERROR_PUNTO,
          payload: { 
              msg: err.response.statusText,
              status: err.response.status
          }
      })
  }
}

export const mostrarPuntoUnico = (data) => async dispatch => {

  dispatch({type: LIMPIAR_PUNTOS})

  try {
     //console.log(data)

      dispatch({
          type: MOSTRAR_PUNTO_UNICO,
          payload: data
      })
      
  } catch (err) { 
    
      dispatch({
          type: ERROR_PUNTO,
          payload: { 
              msg: err.response.statusText,
              status: err.response.status
          }
      })
  }
}

//Post Punto
export const fetchRegistroPunto = (data) => async dispatch =>{
/*   console.log(data) */
  /* const resp = await fetchConTokenFormData(
    "guardar-punto",
    data,
    "POST"
  ); */
  const config = {headers : {'Content-Type': 'multipart/form-data'}}
  const resp =  await axios.post("https://soberaniabackend.onrender.com/api/guardar-punto", data, config)
  try {
 
    dispatch({
      type: AGREGAR_PUNTO,
      payload: data,
      
    });
    
/*     console.log(resp) */
    
    if (resp.status == 201) {
      Swal.fire({

        position: "center",
        title: "Punto enviado",
        imageUrl: imagenSucesss,
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false,
        timer: 3000,
      })
    } else {
/* 
      console.log(resp); */

      Swal.fire({
        position: "center",
        icon: "error",
        title: "error, revise los datos ingresados",
        
        showConfirmButton: false,
        timer: 1000,
      });

    }
  
  } catch (err) {

  /*   console.log(err) */
    dispatch({
      type: ERROR_PUNTO,
      payload: {
        msg: err
      },
    });
  }
};

//PUT Puntos

export const updatePuntos = (punto) => {
    return ({
      type: ACTUALIZAR_PUNTO,
      payload: punto
    })
  }

 
export const cambiarEstadoPunto = (id, data) => async dispatch => {
  const config = {headers : {'Content-Type':'application/json'}}
/* 
  console.log(id, data) */

  await axios.put(`https://soberaniabackend.onrender.com/api/publicacion-punto/${id}`, data, config)
}

export const startUpdatePunto = (data) => async (dispatch) => {

  const config = {headers : {'Content-Type': 'multipart/form-data'}}
 // console.log(data)

    const resp = await axios.put(`https://soberaniabackend.onrender.com/api/actualizar-punto/${data.idPunto}`, data.punto, config);
  
    /* console.log(resp.status) */
    if (resp.status == 200) {
      dispatch(updatePuntos(data.punto));
      Swal.fire({
        position: "center",
        title: "Punto Actualizado",
        imageUrl: imagenSucesssEdit,
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false,
        timer: 3000,
      })
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "error, revise los datos ingresados",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    

  
    /* console.log("holaUpdate");
    console.log(resp); */
  
  };

export const limpiarPunto  = () => {
  dispatch({
      type: LIMPIAR_PUNTOS,
      payload: null
  })
}

export const eliminarPunto = (id) => async (dispatch) => {
    //console.log(id);
    try {
      //await axios.put(`http://localhost:5000/api/eliminar-punto-log/${id}`);
      const res = await fetchConTokenSinFile(`eliminar-punto-log/${id}`, 'PUT')
  /*     console.log(res) */
      dispatch({
        type: ELIMINAR_PUNTOS,
        payload: id,
      });
  
      /* dispatch(setAlert('Post eliminado', 'success'))    */
    } catch (err) {
      /* console.log(err); */

      dispatch({
        type: ERROR_PUNTO,
        payload: {
          msg: err
        },
      });
    }
  };