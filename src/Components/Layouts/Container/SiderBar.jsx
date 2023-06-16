import React from 'react'

import 'animate.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SiderBarAdmin from './RolesSiderBar/SiderBarAdmin';
import SiderBarEncargados from './RolesSiderBar/SiderBarEncargados';
import SiderBarUsuarios from './RolesSiderBar/SiderBarUsuarios';

const SiderBar = ({ auth: { user, loading } }) => {
  /* console.log(user) */
  return (
    <nav className="sidebar sidebar-offcanvas " id="sidebar">
      {
        user?.rol?.rol == "Administrador" ?
        <SiderBarAdmin/>
        :
        user?.rol?.rol == "encargados" ?
        <SiderBarEncargados/>
        :
        <SiderBarUsuarios/>
      }
    </nav>
  )
}

SiderBar.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(SiderBar)
