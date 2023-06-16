import React, { useState } from 'react'

import logo from '../../Components/Assets/Images/logo-mini.png'
import { connect } from "react-redux";
import { loginUser } from "../../Redux/Actions/login.action";
import PropTypes from 'prop-types'
import { Redirect} from "react-router-dom"
import { useForm } from "../../Components/Hooks/UseForm";
import Spinner from '../../Components/Layouts/Spinners/Spinner';

const Login = ({ loginUser,isAuthenticated }) => {

  /* CARGAR DATOS */

  const [formLoginValues, handleLoginInputChange] = useForm({
    correo: "",
    password: "",
  });

  //const navigate = useNavigate();

  const { correo, password } = formLoginValues;

  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    await loginUser(correo, password);
    setIsLoading(false)
   
  };


  if (isAuthenticated)  return <Redirect to='/panel' />

  
  return (
        <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo" align="center">
                <img src={logo} alt="logo"/>
              </div>
              <h4>¡Hola! empecemos</h4>
              <h6 className="font-weight-light">Inicia sesión para continuar.</h6>
              <form className="pt-3" onSubmit={handleLogin}>
                <div className="form-group">
                  <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  id="login"
                  name="correo"
                  value={correo}
                  onChange={handleLoginInputChange}
                  placeholder="Correo Electronico"/>
                </div>
                <div className="form-group">
                  <input 
                  type="password" 
                  className="form-control form-control-lg" 
                  id="password"
                  name="password"
                  placeholder="Contraseñá"
                  value={password}
                  onChange={handleLoginInputChange}
                  />
                </div>
               
                {
                  isLoading ?
                  
                  <div className="mt-3" align="center">
                  <Spinner/>
                </div>
                  :
                  <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit" >Iniciar</button>
                </div>
                }
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      Mantenerme registrado
                    </label>
                  </div>
                  <a href="#" className="auth-link text-black">Recuperar Contraseña?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

//SACAR DEL ESTADO
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

//{login} LO PASAMOS ARRIBA
//connect ES EL QUE SE ENCARGA DE CONECTAR LAS ACCIONES CON EL COMPONENTE
export default connect(mapStateToProps, { loginUser })(Login);
