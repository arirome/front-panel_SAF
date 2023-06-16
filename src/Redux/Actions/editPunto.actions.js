import {  UPDATE_PUNTOS, SINGLE_PUNTOS } from "../Types/types";

import { fetchConToken } from "../../Components/helpers/fetch";

export const VerPuntosSingle = (punto) => {
    return {
      type: SINGLE_PUNTOS,
      payload: punto,
    };
  };


  export const updatePuntos = (punto) => {
    return ({
      type: UPDATE_PUNTOS,
      payload: punto
    })
  }

  
  export const singlePuntos = (id) => async (dispatch) => {

    const res = await fetchConToken(`ver-punto/${id}`);
    const body = await res.json();
    // const res = await axios.get(
    //   `https://localhost:5000/api/v1/puntos/${id}`
    // );
  
    dispatch(VerPuntosSingle(body));
 /*    console.log("hola");
    console.log(res); */
  };

  export const startUpdate = (punto, id) => async (dispatch) => {
    const resp = await fetchConToken(`actualizar-punto/${id}`, punto, 'PUT');
  
    if (resp.ok) {
      dispatch(updatePuntos(punto));
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
  
 /*    console.log("holaUpdate");
    console.log(resp); */
  
  };