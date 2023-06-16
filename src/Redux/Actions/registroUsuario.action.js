import { FETCH_REGISTRO_SUCCESS, FETCH_REGISTRO_ERROR } from "../Types/types";

import { fetchSinToken } from "../../Components/helpers/fetch";

export const fetchRegistroSuccess = (Usuario) => {
  return {
    type: FETCH_REGISTRO_SUCCESS,
    payload: Usuario,
  };
};

export const fetchRegistroError = (error) => {
  return {
    type: FETCH_REGISTRO_ERROR,
    payload: error,
  };
};

export const fetchRegistroUsuario = (usuario, nombre, apellido, correo, password, rol, description) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "api/v1/auth/registro",
      { usuario, nombre, apellido, correo, password, rol, description },
      "POST"
    );
    const body = await resp.json();
  /*   console.log("body=>", body); */

    if (resp.ok) {

      dispatch(fetchRegistroSuccess({
        uid: body.uid,
        correo: body.correo,
      }));

      return Swal.fire({
        position: "center",
        icon: "success",
        title: "Datos enviados",
        showConfirmButton: false,
        timer: 3000,
      });

    } else {

      return Swal.fire({
        position: "center",
        icon: "error",
        title: `${body.errors[0].msg}`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
};

