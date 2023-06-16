import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Panel from './Views/Dashboard/Panel/Panel'
import './index.css'
import Login from './Views/Login/Login'
import { Provider } from 'react-redux'
import store from './Redux/Store/Store'
import AppRoutes from './Routes/AppRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <AppRoutes/>
    </Provider>
  </React.StrictMode>,
)
