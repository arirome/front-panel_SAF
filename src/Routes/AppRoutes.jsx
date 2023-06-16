import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from '../Views/Login/Login';
import Panel from '../Views/Dashboard/Panel/Panel';
import store from '../Redux/Store/Store'
import { loadUser, noExisteUsuario } from "../Redux/Actions/login.action";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Inventario from '../Views/Dashboard/Inventario/Inventario';
import AgregarInventario from "../Views/Dashboard/Inventario/Modulos Inventario/AgregarInventario";
import ParteDelDia from "../Views/Dashboard/ParteDelDia/ParteDelDia";
import Productos from "../Views/Dashboard/Productos/Productos";
import Puntos from "../Views/Dashboard/Puntos/Puntos";
import RegistroEditPunto from "../Views/Dashboard/Puntos/ModulosPuntos/RegistroEditPunto";
import TablaUsuarios from "../Views/Dashboard/TablaUsuarios/TablaUsuarios";

import RegistroDePuntos from "../Views/Dashboard/Puntos/ModulosPuntos/RegistroDePuntos";
/* import AgregarParteDelDia from "../Views/Dashboard/ParteDelDia/ModulosParteDelDia/AgregarParteDelDia"; */
import SeleccionarPunto from "../Views/Dashboard/ParteDelDia/ModulosParteDelDia/SeleccionarPunto";
import EditarInventario from "../Views/Dashboard/Inventario/Modulos Inventario/EditarInventario";
import VerDetallesParte from "../Views/Dashboard/ParteDelDia/ModulosParteDelDia/VerDetallesParte";
import setAuthToken from "../Components/Helpers/setAuthToken";
/* import AgregarParteDelDia2 from "../Views/Dashboard/ParteDelDia/ModulosParteDelDia/AgregarParteDelDia2"; */
import ProgramaVivo from "../Views/Dashboard/Publicaciones/ProgramaVivo/ProgramaVivo";
import RegistroProductos from "../Views/Dashboard/Productos/ModulosProductos/RegistroProductos";
import RegistroEditProducto from "../Views/Dashboard/Productos/ModulosProductos/RegistroEditProducto";
import Noticias from "../Views/Dashboard/Publicaciones/Noticias/Noticias";
import Cargando from "../Components/Layouts/PaginaDeCarga/Cargando.jsx";
import AgregarNoticias from "../Views/Dashboard/Publicaciones/Noticias/ModulosNoticias/AgregarNoticias"; 
import AgregarInventarioV2 from "../Views/Dashboard/Inventario/Modulos Inventario/AgregarInventarioV2";
import { SeleccionarTemaSiderBar, SeleccionarTemaNavbar } from "../Components/Layouts/Container/Themes/SeleccionarTema.js"
import Cronograma from "../Views/Dashboard/Publicaciones/Cronograma/Cronograma";
import AgregarParteDelDia3 from "../Views/Dashboard/ParteDelDia/ModulosParteDelDia/AgregarParteDelDia3";
import AgregarCronograma from "../Views/Dashboard/Publicaciones/Cronograma/ModulosCronograma/AgregarCronograma";
import Convocados from "../Views/Dashboard/Asistencias/Convocados";
import Asistencias from "../Views/Dashboard/Asistencias/Asistencias";
import AgregarConvocados from "../Views/Dashboard/Asistencias/ModulosAsistencias/AgregarConvocados";
import NutriNoticias from "../Views/Dashboard/Publicaciones/NutriNoticias/NutriNoticias";
import AgregarNutriNoticias from "../Views/Dashboard/Publicaciones/NutriNoticias/ModulosNutriNoticias/AgregarNutriNoticias";



const AppRoutes = ({ auth: { isAuthenticated,user, loading } }) => {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
    /* console.log(user?.configuraciones?.colorSiderBar) */
    SeleccionarTemaSiderBar(user?.configuraciones?.colorSiderBar)
    SeleccionarTemaNavbar(user?.configuraciones?.colorNavbar)
  }

  useEffect(() => {
    if(localStorage.token){
      store.dispatch(loadUser())
    }else{
      store.dispatch(noExisteUsuario())
    }
  }, [])

/*   useEffect(()=>{
    console.log(isAuthenticated)
  },[isAuthenticated]) */

  if (isAuthenticated == true) {

    /* Rutas Privadas */
    /* console.log(user?.rol?.rol) */

    if(!user){
      return (
        <Router>
        <Switch>
          <Route exact path={"/*"} component={Cargando} />
        </Switch>
      </Router>
  
      )
    }

    if(user?.rol?.rol == "Administrador"){
      return (
        <Router>
          <Switch>
            <Route exact path={"/panel"} component={Panel} />
            <Route exact path={"/inventario"} component={Inventario}/>
            <Route exact path={"/agregar-inventario"} component={AgregarInventario}/> 
            <Route exact path={"/parte-del-dia"} component={ParteDelDia}/> 
            <Route exact path={"/productos"} component={Productos}/> 
            <Route exact path={"/puntos"} component={Puntos}/> 
            <Route exact path={"/agregar-producto"} component={RegistroProductos}/> 
            <Route exact path={"/editarProducto"} component={RegistroEditProducto}/> 
            <Route exact path={"/usuarios"} component={TablaUsuarios}/> 
            <Route exact path={"/agregar-punto"} component={RegistroDePuntos}/>
            <Route exact path={"/editarPunto"} component={RegistroEditPunto}/> 
            <Route exact path={"/seleccionar-punto"} component={SeleccionarPunto} />
            <Route exact path={"/editar-Inventario/:idInventario"} component={EditarInventario} />
            <Route exact path={"/detalles-partes-dias/:idParte"} component={VerDetallesParte} />
            {/* <Route exact path={"/testParte"} component={AgregarParteDelDia2} /> */}
            {/* <Route exact path={"/test/:idPunto"} component={AgregarParteDelDia} /> */}
            <Route exact path={"/programas"} component={ProgramaVivo} />
            <Route exact path={"/noticias"} component={Noticias} />
            <Route exact path={"/agregar-noticia"} component={AgregarNoticias} />

            <Route exact path={"/nutriNoticias"} component={NutriNoticias} />
            <Route exact path={"/agregar-nutriNoticia"} component={AgregarNutriNoticias} />

            <Route exact path={"/AgregarInventarioV2"} component={AgregarInventarioV2} />
            <Route exact path={"/cronograma"} component={Cronograma} />
            <Route exact path={"/carga"} component={Cargando} />
            <Route exact path={"/agregar-parte/:idPunto/:nombrePunto"} component={AgregarParteDelDia3} />
            <Route exact path={"/agregar-cronograma"} component={AgregarCronograma} />
            <Route exact path={"/convocados"} component={Convocados}/>
            <Route exact path={"/agregar-convocados"} component={AgregarConvocados}/>
            <Route exact path={"/asistencias"} component={Asistencias}/>
            <Route exact path={"/*"} component={Panel} />
          </Switch>
        </Router>
  
      )
    }

    if(user?.rol?.rol == "encargados"){
      return (
        <Router>
          <Switch>
            <Route exact path={"/panel"} component={Panel} />
            <Route exact path={"/inventario"} component={Inventario}/>
            <Route exact path={"/agregar-inventario"} component={AgregarInventario}/> 
            <Route exact path={"/parte-del-dia"} component={ParteDelDia}/> 
            <Route exact path={"/productos"} component={Productos}/> 
            <Route exact path={"/agregar-producto"} component={RegistroProductos}/> 
            <Route exact path={"/editarProducto"} component={RegistroEditProducto}/> 
            <Route exact path={"/seleccionar-punto"} component={SeleccionarPunto} />
            <Route exact path={"/editar-Inventario/:idInventario"} component={EditarInventario} />
            <Route exact path={"/detalles-partes-dias/:idParte"} component={VerDetallesParte} />
            <Route exact path={"/AgregarInventarioV2"} component={AgregarInventarioV2} />
            <Route exact path={"/agregar-parte/:idPunto/:nombrePunto"} component={AgregarParteDelDia3} />
            <Route exact path={"/asistencias"} component={Asistencias}/>
            <Route exact path={"/*"} component={Panel} />
          </Switch>
        </Router>
  
      )
    }

    if(user?.rol?.rol == "usuario"){
      return (
        <Router>
          <Switch>
            <Route exact path={"/panel"} component={Panel} />
            
            <Route exact path={"/*"} component={Panel} />
          </Switch>
        </Router>
  
      )
    }
    
  } else if (isAuthenticated == false){
    /* Rutas Publicas */
    return (
      <Router>
        <Switch>
          <Route exact path={"/*"} component={Login} />
          <Route exact path={"/login"} component={Login} />
          
        </Switch>
      </Router>
    )
  } else  {
    return(
      <Router>
        <Switch>
          <Route exact path={"/*"} component={Cargando} />
        </Switch>
      </Router>
    )
  }


}

AppRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AppRoutes)