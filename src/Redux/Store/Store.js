//crear la store de nuestro proyec 
import { createStore, applyMiddleware } from 'redux' 

import { composeWithDevTools } from 'redux-devtools-extension'

//middelewares 
import thunk from 'redux-thunk'


import Reducers from './../Reducers'

//estado inicial
const initialState = { }

const middleWare = [thunk]

//el primer parametro son los Reducers 
const store = createStore(
    Reducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store;