
import axios from "axios";
import { fetchConToken } from "../../Components/helpers/fetch";

import { VER_DISTRIBUIDORES_SUCCESS, VER_PRODUCTOS_POR_DISTRIBUIDORES, ERROR_PRODUCTOS_POR_DISTRIBUIDORES } from "../Types/types";



export const VerDistribuidoresSuccess = (res) => {
  return {
    type: VER_DISTRIBUIDORES_SUCCESS,
    payload: res,
  };
};

//get all distribuidores
export const getDistribuidores = () => async (dispatch) => {
    const res = await fetchConToken(`ver-distribuidor`);
    const body = await res.json();
    
      dispatch(VerDistribuidoresSuccess(body));
      //console.log("holaDistribuidor");
     // console.log(body);
};


export const getProductosDistribuidores = (id) => async (dispatch) => {

/*   console.log("S") */
  /* const config = {headers : {"Content-type": "application/json"}} */
  
  try {
    const res = await axios.get(`https://soberaniabackend.onrender.com/api/ver-producto-distribuidor-todos/${id}`)
   /*  console.log(res.data) */

    dispatch({
    type: VER_PRODUCTOS_POR_DISTRIBUIDORES,
    payload: res.data
})

} catch (error) {
 /*  console.log(error) */
  dispatch({
    type: ERROR_PRODUCTOS_POR_DISTRIBUIDORES,
    payload: { 
        msg: error
    }
})
}
}
