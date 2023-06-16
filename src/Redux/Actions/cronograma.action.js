
/* import axios from "axios"; */
import { fetchConToken } from "../../Components/helpers/fetch";

import { 
    VER_CRONOGRAMA,
    VER_CRONOGRAMA_UNICO,
    ERROR_CRONOGRAMA,
    LIMPIAR_CRONOGRAMA,
    ACTUALIZAR_CRONOGRAMA
} from "../Types/types";



export const getCronograma = () => async (dispatch) => {

/*   console.log("S") */
  /* const config = {headers : {"Content-type": "application/json"}} */
  
  try {
    const res = await fetchConToken(`ver-cronograma`)
    const body = await res.json()
  /*   console.log(res.body) */

    dispatch({
    type: VER_CRONOGRAMA,
    payload: body
})

} catch (error) {
 /*  console.log(error) */
  dispatch({
    type: ERROR_CRONOGRAMA,
    payload: { 
        msg: error
    }
})
}
}
