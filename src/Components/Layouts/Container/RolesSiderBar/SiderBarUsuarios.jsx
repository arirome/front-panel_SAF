import React from 'react'
import { Link } from 'react-router-dom'
const SiderBarUsuarios = () => {
  return (
    <ul className="nav">
           <li className="nav-item">
             <Link className="nav-link" to="/panel">
               <i className="icon-grid menu-icon"></i>
               <span className="menu-title">Panel</span>
             </Link>
           </li>
         </ul>
  )
}

export default SiderBarUsuarios