
import { fetchConToken } from "../../Components/helpers/fetch";

import {  UPDATE_PRODUCTOS, SINGLE_PRODUCTOS } from "../Types/types";




export const VerProductoSingle = (producto) => {
  return {
    type: SINGLE_PRODUCTOS,
    payload: producto,
  };
};

export const updateProductos = (producto) => {
  return ({
    type: UPDATE_PRODUCTOS,
    payload: producto
  })
}


export const getsingleProductos = (id) => async (dispatch) => {

  const res = await fetchConToken(`ver-producto/${id}`);
  const body = await res.json();


  dispatch(VerProductoSingle(body));
/*   console.log("hola");
  console.log(res); */
};

export const startUpdate = (producto, id) => async (dispatch) => {
  const resp = await fetchConToken(`actualizar-producto/${id}`, producto, 'PUT');

  if (resp.ok) {
    dispatch(updateProductos(producto));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Se Actualizó Correctamente",
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

/*   console.log("holaUpdate");
  console.log(resp); */

};
