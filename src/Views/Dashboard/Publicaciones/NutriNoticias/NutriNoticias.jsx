import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from '../../../../Components/Layouts/Container/Container'
import Footer from '../../../../Components/Layouts/Footers/Footer'
import './StyleNoticias/Noticias.css'
import imgTest from '../../../../Components/Assets/Images/Test2.jpg'
import { Link } from 'react-router-dom'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import ModalAgregarNutriNoticia from './ModulosNutriNoticias/ModalAgregarNutriNoticia'
import { mostrarNutriNoticias } from "../../../../Redux/Actions/nutriNoticia.action";
import parse from 'html-react-parser';
import VerDetallesModal from "./ModulosNutriNoticias/VerDetallesModal";
import Paginacion from "../../../../Components/Layouts/Paginacion/Paginacion";
import  imgAgregarNoticia from '../../../../Components/Assets/Images/Icons/agregar.png'
import  imgNutriNoticia from '../../../../Components/Assets/Images/Icons/nutricionista.png'
import  imgNutriNoticiaPasada from '../../../../Components/Assets/Images/Icons/nutriNoticiasPasadas.png'


const NutriNoticias = ({mostrarNutriNoticias, nutriNoticia:{nutriNoticias, loading}}) => {


    const [optSmModalDetalles, setOptSmModalDetalles] = useState(false);
    const [noticiaItem, setNoticiaItem] = useState()
    const toggleShowDetalles = (item) => {
      setOptSmModalDetalles(!optSmModalDetalles);
      setNoticiaItem(item)
    };

    const [optSmModalNuevaNoticia, setoptSmModalNuevaNoticia] = useState(false);
    const toggleShowNuevaNoticia = () => {
      setoptSmModalNuevaNoticia(!optSmModalNuevaNoticia);
    };

    const [limit, setLimit] = useState(4)
    const [skip, setSkip] = useState(0)
    const [nroPagina, setNroPagina] = useState(1)

    useEffect(()=>{
      mostrarNutriNoticias(limit,skip)
    },[])

    //console.log(noticias)

    useEffect(()=>{
      //console.log(skip)
      //console.log(totalProductos)
      if(nutriNoticias?.totalNoticiasNutricion){
        if(skip >= nutriNoticias?.totalNoticiasNutricion){
          setSkip(skip-limit)
          setNroPagina(nroPagina - 1)
        }else{
          mostrarNutriNoticias(limit,skip)
        }
      }
    },[skip])

    
  const cambiarPagina = (e,page)=>{
    
    setNroPagina(page)
    setSkip(nutriNoticias?.totalPages[page-1])
  }

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
              <div className="card">
                <div className="card-body">
                  <div>
                  <div className="float-right">
                      <Link to="/agregar-nutriNoticia">
                        <Tooltip title="Agregar Nueva Noticia..." className="">
                        <img
                          src= { imgAgregarNoticia }
                          alt="image"
                          style={{
                            width: "5vh",
                            position: "relative",
                            top: "-1vh",
                          }}
                        />
                        </Tooltip>
                      </Link>
                    </div>
                  
                  </div>
                    <div className='container'>
                    <h3 class="my-4">
                      
                      Todas las Nutri-Noticias
                      <img
                          src= { imgNutriNoticia }
                          alt="image"
                          style={{
                            width: "9vh",
                            position: "relative",
                            top: "-2vh",
                          }}
                        />
                    
                    </h3>

                    <div class="row">
                
                    {
                      nutriNoticias?.primeraNoticiaNutricion ?
                      <>
                      <div class="col-md-8">
                        {/* 750x500 */}
                        {/* 750x450 */}
                        <img style={{width:"750px", height:"450px"}}  class="img-fluid" src={nutriNoticias?.primeraNoticiaNutricion?.img} alt=""/>
                    </div>

                    <div class=" col-md-4">
                        <h3 class="my-3">{ nutriNoticias?.primeraNoticiaNutricion?.titulo} </h3>
                        <p>
                        {parse(nutriNoticias?.primeraNoticiaNutricion?.descripcion.substring(0,700)) }
                        </p>

                        <div class="float-right">
                          {
                            nutriNoticias?.primeraNoticiaNutricion?.publicado  == true ?
                            <label class="badge badge-success mx-2">Publicado</label>
                            :
                            <label class="badge badge-danger mx-2">Sin Publicar</label>
                          }

                        <button type="button" class="btn btn-inverse-info btn-icon" onClick={()=>{toggleShowDetalles(nutriNoticias?.primeraNoticiaNutricion)}}>
                          <i class="ti-eye" ></i>
                        </button> 
                        </div>

                       

                    </div>
                      </>
                      : null
                    }
                
                    
                    
                
                    </div>

                    <h3 class="my-4">Nutri-Noticias Pasadas
                    <img
                          src= { imgNutriNoticiaPasada }
                          alt="image"
                          style={{
                            width: "9vh",
                            position: "relative",
                            top: "-2vh",
                          }}
                        />
                    </h3>
                
                    <div class="row">
                    {/* 500x300 */}
                    {
                      nutriNoticias?.otrasNoticiasNutricion?.length > 0 ?
                      <>
                      {
                        nutriNoticias?.otrasNoticiasNutricion?.map((item)=>{
                          return(
                            <div class="fondo col-md-3 col-sm-6 mb-4">
                                  <div class="img-container">
                                  
                                  <img class="img-fluid img-noticia-fluid"  src={item?.img} alt=""/>
                                      <div class="texto-encima">
                                        {
                                          item?.publicado == true ?
                                          <label class="badge badge-success">Publicado</label>
                                          :
                                          <label class="badge badge-danger">Sin Publicar</label>
                                        }
                                      </div>
                                      <div class="centrado">
                                      <button type="button" class="btn btn-inverse-info btn-icon" onClick={()=>{toggleShowDetalles(item)}}>
                                      <i class="ti-eye" ></i>
                                  </button>
                                      </div>
                               </div>
                              </div>
                          )
                        })
                      }
                      </>
                    : 
                    <h3>No hay Nutri-Noticias Cargadas...</h3>
                    }
                    </div>
                        </div>
                  </div>
                  <div align="center">
                           <div className="wrapper" >
                            <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                <li className="page-item"><button className="page-link" onClick={()=>{setSkip(skip - limit), setNroPagina( parseInt(nroPagina - 1))}} type="button" disabled={skip == 0 ? true : false}>Anterior</button></li>
                                {/* <li className="page-item"><button type="button" className="page-link">{nroPagina}</button></li> */}
                                <Paginacion nroPagina={nroPagina} cambiarPagina={cambiarPagina} totalPaginas={nutriNoticias?.totalPages}/>
                                <li className="page-item"><button type="button" className="page-link" onClick={()=>{setSkip(skip + limit), setNroPagina( parseInt(nroPagina + 1))}} disabled={skip >= nutriNoticias?.totalNoticiasNutricion ? true : false}>Siguiente</button></li>
                              </ul>
                            </nav>
                    </div>
                           </div>
                  </div>
                  <VerDetallesModal
                  optSmModalDetalles={optSmModalDetalles}
                  setOptSmModalDetalles={setOptSmModalDetalles}
                  toggleShowDetalles={toggleShowDetalles}
                  item={noticiaItem}
                  />
                  <ModalAgregarNutriNoticia
                    optSmModalNuevaNoticia={optSmModalNuevaNoticia}
                    setoptSmModalNuevaNoticia={setoptSmModalNuevaNoticia}
                    toggleShowNuevaNoticia={toggleShowNuevaNoticia}
                    />
        </div>
        <Footer />
        </div>
        
</Container>
  )
}


NutriNoticias.propTypes = {
  mostrarNutriNoticias: PropTypes.func.isRequired,
  nutriNoticias: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  nutriNoticia: state.nutriNoticiaReducer,
});

export default connect(mapStateToProps, { mostrarNutriNoticias })(
  NutriNoticias
);
