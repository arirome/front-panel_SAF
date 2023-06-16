import { 
  MOSTRAR_PRODUCTOS,
  LIMPIAR_PRODUCTOS,
  AGREGAR_PRODUCTO,
  ACTUALIZAR_PRODUCTO,
  ERROR_PRODUCTO,
  MOSTRAR_PRODUCTO_UNICO,
  ELIMINAR_PRODUCTOS,

  LIMPIAR_INVENTARIO,
  LIMPIAR_PARTES_DIAS,
  LIMPIAR_PUNTOS
 } from "../Types/types";

import { fetchConToken, fetchConTokenSinFile, fetchSinToken } from "../../Components/helpers/fetch";
import axios from 'axios'
import imagenSucesss from "../../../src/Components/Assets/Images/paqueteOK.png"

import imagenSucesssEdit from "../../../src/Components/Assets/Images/educacion.png"


//GET Productos
export const mostrarProductos = (limit,skip, filtroProducto) => async dispatch => {

  dispatch({type: LIMPIAR_PUNTOS})
  dispatch({type: LIMPIAR_INVENTARIO})
  dispatch({type: LIMPIAR_PARTES_DIAS})
  dispatch({type: LIMPIAR_PRODUCTOS})
  /* console.info("FILTRO: " +filtroProducto) */
  try {
    let res;
    if(filtroProducto){
       res = await fetchConToken(`ver-producto?limit=${limit}&skip=${skip}&filtroProductos=${filtroProducto}`)
    }else{
      res = await fetchConToken(`ver-producto?limit=${limit}&skip=${skip}`)
    }
      const body = await res.json();
      console.log(body.totalPages.length)
      
      dispatch({
          type: MOSTRAR_PRODUCTOS,
          payload: body
      })
      
  } catch (err) { 
    /*   console.log(err) */
      dispatch({
          type: ERROR_PRODUCTO,
          payload: { 
              msg: err
          }
      })
  }
}


//GET Producto
export const mostrarProductoUnico = (id) => async dispatch => {

  
  const res = await fetchConToken(`ver-producto/${id}`);
  const body = await res.json();


 
  dispatch({
    type: MOSTRAR_PRODUCTO_UNICO,
    payload: body,
})
/*   console.log("hola");
  console.log(res); */
}

export const mostrarProductoEdit = data => async dispatch =>{
 
/*   console.log(data) */

  dispatch({type: LIMPIAR_PRODUCTOS})

  try {
      
      dispatch({
          type: MOSTRAR_PRODUCTO_UNICO,
          payload: data 
      })
      
  } catch (err) {
      /* console.log(err) */
      dispatch({
          type: ERROR_PRODUCTO,
          payload: { 
              msg: err
          }
      })
  }
}

//POST Productos

export const fetchRegistroProducto = (data) => async dispatch => {

  /* const resp = await fetchConToken(
    "guardar-producto",
    data,
    "POST"
  ); */
  const config = {headers : {"Content-type": "multipart/form-data"}}

  const resp = await axios.post('https://soberaniabackend.onrender.com/api/guardar-producto',data,config)
  try {
    
    
 
    dispatch({
      type: AGREGAR_PRODUCTO,
      payload:data
      
    });
  
  
    if (resp.status == 200) {
      Swal.fire({

        position: "center",
        title: "Producto enviado",
        imageUrl: imagenSucesss,
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false,
        timer: 3000,
       
    
      })
    }
  } catch (err) {
    if (err.response) {
      dispatch({
        type: ERROR_PRODUCTO,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};


//LIMPIAR Productos

export const limpiarProducto  = () => {
  dispatch({
      type: LIMPIAR_PRODUCTOS,
      payload: null
  })
}

//PUT Productos

export const updateProductos = (producto) => {
  return ({
    type: ACTUALIZAR_PRODUCTO,
    payload: producto
  })
}

export const startUpdate = (producto) => async (dispatch) => {
  const config = {headers : {"Content-type": "multipart/form-data"}}
 /*  console.log(producto) */
  //const resp = await fetchConToken(`actualizar-producto/${producto.id}`, producto.producto, 'PUT');
    const resp = await axios.put(`https://soberaniabackend.onrender.com/api/actualizar-producto/${producto.id}`,producto.producto,config)
  if (resp.status == 200) {
    dispatch(updateProductos(producto.producto));
    Swal.fire({
      position: "center",
      title: "Producto Actualizado",
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

  //console.log("holaUpdate");
  //console.log(resp);

};

//DELETE Productos

export const eliminarProducto = (id) => async dispatch => {  
 /*    console.log(id) */
        try {
    
            //await axios.delete(`http://localhost:5000/api/delete-producto/${id}`)
            await fetchConTokenSinFile(`delete-producto/${id}`, 'DELETE')
            dispatch({
                type: ELIMINAR_PRODUCTOS,
                payload: id
            })
    
            /* dispatch(setAlert('Post eliminado', 'success'))    */ 
            
            
        } catch (err) {
           /*  console.log(err) */
           dispatch({
            type: ERROR_PRODUCTO,
            payload: {
              msg: err
            },
          });
        } 
    }

export const cambiarEstadoProducto = (id, data) => async dispatch => {
  const config = {headers : {'Content-Type':'application/json'}}

 /*  console.log(id, data) */

  await axios.put(`https://soberaniabackend.onrender.com/api/estado-producto/${id}`, data, config)
}