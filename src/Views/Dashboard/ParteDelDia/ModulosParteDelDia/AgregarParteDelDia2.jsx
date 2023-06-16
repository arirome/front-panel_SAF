import react, { useEffect, useState, useRef } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";
import "./StyleParte/Parte.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { crearParteDia } from "../../../../Redux/Actions/parteDelDia.action";
import { getDistribuidores } from "../../../../Redux/Actions/distribuidores.action";
import ConfirmarParte from "./ConfirmarParte";
import axios from "axios";
import imgCaja from "../../../../Components/Assets/Images/Icons/CajaVacia.png";
import imgDistribuidor from "../../../../Components/Assets/Images/Icons/distribuidores.png"
import { Link } from "react-router-dom";

import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput";
import { formatNumber } from "../../../../Components/Helpers/formatoNumero";


const AgregarParteDelDia = ({crearParteDia,getDistribuidores,distribuidor: { distribuidores, loading },match}) => {
    
    //Funcion Get Para Traer Todos los distribuidores de la DB.
    useEffect(() => {
      getDistribuidores();
    },[]);

    const [isLoaderProducto, setIsLoaderProducto] = useState(false)
    const [isLoaderData, setIsLoaderData] = useState(false)

    //Estados para manejar los datos de los productos recibidos en la funcion "consultarProductos".
    //Y otro estado para Manejar el nro del index de la peticion.
    const [dataProductos, setDataProductos] = useState();
    const [nroPeticion, setNroPeticion] = useState(0)

    //Funcion para mostrar los productos de un distribuidor en especifico.
    const consultarProductos = async (id) =>{
      setIsLoaderProducto(true)
        if(id){
          const res = await axios.get(`https://soberaniabackend.onrender.com/api/ver-producto-distribuidor/${id}/${nroPeticion}`)
           setDataProductos(res.data)
           setIsLoaderProducto(false)
        }
    }

    //Estados Para Guardar La ID Del distribuidor y la posicion del distribuidor
    const [nroLista, setNroLista] = useState(0)
    const [idDistribuidor, setIdDistribuidor] = useState()
    const [nroProductosPeticion, setNroProductosPeticion] = useState(0)

    //Funcion Para Mostrar los Productos
    const ejecutarConsultas = async (i, id) => {
      //console.log(i) console.log(id)
      setIsLoaderData(true)
      if(id){
        const res = await axios.get(`https://soberaniabackend.onrender.com/api/ver-producto-distribuidor/${id}`)
        setNroProductosPeticion(res.data)
        setIsLoaderData(false)
      }
      consultarProductos(id)
      setNroLista(i)
      setIdDistribuidor(id)
      setNroPeticion(0)

    /*   console.log(nroPeticion)
    console.log(nroProductosPeticion.cantidadProductos) */
    }

  
   
    //Estado para guardar todos los productos
    const [productosList, setProductosList] = useState([])

    //Estados para guardar La Nota y Nro De Familia
    const [nroFamiliaProducto, setNroFamiliaProducto] = useState()
    const [notaProducto, setNotaProducto] = useState()

    //Estado para ir guardando el total Recaudado Cuando se registre un nuevo producto er el parte
    const [totalRecaudadoFinal,setTotalRecaudadoFinal] = useState(0)

    //Funcion Para Obtener Todos los Valores de Formik
    const handleAdd =  (values) => {
      
      setNroPeticion(nroPeticion + 1)
      const {
        nota,
        nroFamilias,
        stockInicial,
        stockFinal
      } = values;

      setNotaProducto(nota)
      setNroFamiliaProducto(nroFamilias)

      const precioProducto = parseInt(dataProductos?.precio)
      const stockTotal = stockInicial - stockFinal
      const recaudado =  precioProducto * stockTotal
      //console.log(precioProducto * stockTotal)
      /* console.log(totalRecaudadoFinal)
      console.log(recaudado) */
      setTotalRecaudadoFinal(parseInt(totalRecaudadoFinal + recaudado) )
      setProductosList([
        ...productosList,
        {
          producto: dataProductos?.uid,
          productoNombre: dataProductos?.nombre,
          stockInicial: stockInicial, 
          stockFinal: stockFinal, 
          totalvendido: stockTotal,
          totalRecaudado: recaudado
        }
      ])
      
      /* console.log(values) */
      
    }



    //Funcion Para Guardar Todos los productos en el distribuidor Correspondiente
    const [listDistribuidores, setListDistribuidores] = useState([])
   
    const guardarDistribuidor = () =>{

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })

      setNroLista(nroLista + 1)
      var productoMasVendido = -1;
      var nombreProducto = "";
      
      for (var i = 0; i < productosList.length; i++) {
          //console.log("nro: ", i)
        if( productosList[i].totalvendido > productoMasVendido){
            productoMasVendido = productosList[i].totalvendido
            nombreProducto = productosList[i].producto
        }
      }

      //console.log(nombreProducto)

      setListDistribuidores([
        ...listDistribuidores,
        {
          nombre:idDistribuidor,
          nota: notaProducto,
          familiasParticipantes: nroFamiliaProducto,
          stock: productosList,
          prodmasvendido: nombreProducto
      },
      ]);
      setProductosList([])
      setNotaProducto("")
      setNroFamiliaProducto("")
    }


    //Funcion para guardar Todo los distribuidores dentro de otro array
    const [stockList, setStockList] = useState()
    const fechaActual = new Date()
    
    const almacenarParte = () =>{
      setStockList(
        {
          fecha: fechaActual.toLocaleDateString("es-ES"),
          distribuidor: listDistribuidores,
          recaudacionTotal: totalRecaudadoFinal,
          ubicacion: match.params.idPunto
        }
      )
    }

    //UseEffect Para Cambiar al siguiente producto cuando detecte un cambio en el estado "nroPeticion"
   useEffect(()=>{
    consultarProductos(idDistribuidor)
   },[nroPeticion])

   
/*    useEffect(()=>{
    console.log(totalRecaudadoFinal)
  },[totalRecaudadoFinal]) */

    //Validaciones Del Formulario
    const formikRef = useRef();
    const schemaFormParte = yup.object().shape({
      nota: yup
        .string()
        .required("La nota del distribuidor es necesario"),
        nroFamilias: yup
        .number("Ingresar un numero valido")
        .required("El nro de familias es necesario"),
        stockInicial: yup
        .number("Ingresar un numero valido")
        .required("El Stock Inicial es necesario"),
        stockFinal: yup
        .number("Ingresar un numero valido")
        .required("El Stock Final es necesario"),
    });

    //Funcion Para Pasar al siguiente distribuidor si no tiene productos
    const siguienteDistribuidor = () =>{
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })

      setNroLista(nroLista + 1)
    }
  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">

          {/* Nombre Del Punto */}
          <div align="center">
            <h3>{ match.params.nombrePunto}</h3>
            <hr />
          </div>


          <div className="container d-lg-flex">

            {/* Lista De Distribuidores */}
            <div className="box-1 bg-light user">
              <div className="box-inner-1 pb-3 mb-3 ">
                <div className="d-flex justify-content-between mb-3 userdetails">
                  <p className="fw-bold">
                    <Link to="/seleccionar-punto">
                      <button
                        type="button"
                        className="btn btn-inverse-success btn-icon"
                      >
                        <i className="ti-arrow-left"></i>
                      </button>
                    </Link>{" "}
                    Distribuidores
                  </p>
                  <p className="fw-lighter">
                    <span className="fas fa-dollar-sign"></span>{nroLista}/{distribuidores?.length}
                  </p>
                </div>
                <hr />
                <p className="dis info my-3">
                  Si un distribuidor no fue agregado comunicarse con el
                  administrador...
                </p>
                {
                    loading ? <Spinner/> : null
                }

                {
                    distribuidores ? 
                    <react.Fragment key={1}>
                        {
                            distribuidores?.map((distribuidor, i)=>{
                                return(
                                    <div className="radiobtn" hidden={nroLista >= i ? false : true} onClick={() =>
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      })
                                    }>
                                        <div className="frb frb-success ">
                                            <input
                                                type="radio"
                                                id={`radio-button-${distribuidor?.uid}`}
                                                name="radio-button"
                                                value={distribuidor?.uid}
                                                onChange={()=>{ejecutarConsultas(i, distribuidor?.uid)}}
                                                disabled={nroLista == i ? false : true}
                                                
                                            />
                                            <label htmlFor={`radio-button-${distribuidor?.uid}`}>
                                            <span className="frb-title">{distribuidor?.nombre}</span>
                                            <br />
                                            {
                                              nroLista == i ?
                                              <span className="frb-description">
                                                Formulario <strong style={{color:'green'}}>Desbloqueado</strong>
                                              </span>
                                              :
                                              <span className="frb-description">
                                                Formulario <strong style={{color:'red'}}>Finalizado</strong>
                                            </span> 
                                            }
                                            
                                            </label>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </react.Fragment>
                    :
                    <>
                    
                    </>
                }
              </div>
            </div>

            {/* Formulario De Productos */}
            {
              nroLista >= distribuidores?.length ?
              <>
              <div className="box-2">
                <div className="box-inner-2">
                  <div align="center">
                      <img src={imgDistribuidor} alt="IMAGEN" width="100px"/>
                      <strong>NO HAY MAS DISTRIBUIDORES</strong>  
                      <hr/>
                      <button className="btn btn-warning" onClick={()=>{almacenarParte()}}>Ver Resumen</button>
                  </div>
                </div>
              </div>
              </>
              :
              <>
               <div className="box-2">
              <div className="box-inner-2">
                <div>
                  <p className="fw-bold">
                    Productos{" "}
                    <button className="btn btn" onClick={()=>{consultarProductos(idDistribuidor)}}>
                      <span className="ti-loop"></span>
                    </button>
                  </p>
                  <p className="dis mb-3">
                    Complete todos los datos antes de pasar al siguiente...
                  </p>
                </div>
                <hr />
                {
                   nroProductosPeticion.cantidadProductos == 0 ?
                   <>
                   <div align="center">
                             <img src={imgCaja} alt="IMAGEN" width="100px"/>
                             <p>El Distribuidor No tiene Productos</p>  
                             <hr/>
                             <button className="btn btn-success" onClick={()=>{siguienteDistribuidor()}}>Siguiente Distribuidor</button>
                           </div>
                   </>
                  
                  :
                  <>
                  {
                 nroProductosPeticion.cantidadProductos !== nroPeticion ?
                 <Formik
                           
                           innerRef={formikRef}
                           initialValues={{
                             nota: " ",
                             nroFamilias: 0,
                             stockInicial: 0,
                             stockFinal: 0
                           }}
                           enableReinitialize={true}
                           onSubmit={handleAdd}
                           validationSchema={schemaFormParte}
                         >

                         {({ isSubmitting, dirty }) => (
                             <Form
                               id="formAuthentication"
                               className="form-group"
                             >
                               <div className="form-row">
                           <div className="col">
                             <p className="dis fw-bold mb-2">Nota</p>
                             <Field 
                             type="text" 
                             name="nota" 
                             className="form-control"
                             />
                             <MensajeErrorInput
                                   name="nota"
                                   className="alert alert-danger"
                                 />
                           </div>
                           <div className="col">
                             <p className="dis fw-bold mb-2">Nro Familias</p>
                             <Field
                               name="nroFamilias"
                               type="number"
                               className="form-control"
                               
                             />
                             <MensajeErrorInput
                                   name="nroFamilias"
                                   className="alert alert-danger"
                                 />
                           </div>
                         </div>
                         <hr />
                            {
                             dataProductos ? 
                             <>
                             <div className="mb-3">
                                 <p className="dis fw-bold mb-2">
                                   <strong style={{ color: "green" }}>
                                     <span className="ti-package"></span> {dataProductos?.nombre}
                                   </strong>
                                 </p>
                               </div>
                               <div className="form-row">
                                 <div className="col">
                                   <p className="dis fw-bold mb-2">Stock Inicial</p>
                                   <Field
                                     type="number"
                                     name="stockInicial"
                                     className="form-control"
                                     
                                   />
                                   <MensajeErrorInput
                                         name="stockInicial"
                                         className="alert alert-danger"
                                       />
                                 </div>
                                 <div className="col">
                                   <p className="dis fw-bold mb-2">Stock Final</p>
                                   <Field
                                     name="stockFinal"
                                     type="number"
                                     className="form-control"
                                     
                                   />
                                   <MensajeErrorInput
                                         name="stockFinal"
                                         className="alert alert-danger"
                                       />
                                 </div>
                               </div>
                                           </>
                                           :
                                           <div align="center">
                                            {
                                              isLoaderData ?
                                              <Spinner/>
                                              :
                                              <p>Seleccionar Un Distribuidor</p>
                                            }
                                            </div>
                            }

                          
                                       <hr />
                                       <div align="center">
                                         {
                                           dataProductos ? 
                                           <>
                                           {
                                            isLoaderProducto ?
                                            <Spinner/>
                                            :
                                            <button type="submit" disabled={!dirty} className="btn btn-success mx-1">
                                             <i className="ti-angle-double-right menu-icon"></i> Siguiente Producto
                                           </button>
                                           }
                                           </>
                                           :
                                           null  
                                         }
                                       </div>
                                       <hr />
                                       <div className="d-flex flex-column dis">
                                         <div className="d-flex align-items-center justify-content-between mb-2">
                                           <p>
                                             <strong>Precio del producto: </strong>
                                           </p>
                                           <p style={{ color: "green" }}>
                                             <strong>
                                               <span>$ {formatNumber(dataProductos?.precio)}</span>
                                             </strong>
                                           </p>
                                         </div>
                                       </div>
                                       <hr />

                         
                             </Form>
                           )}
                         </Formik>
                         :
                         <>
                         <div align="center">
                           <img src={imgCaja} alt="IMAGEN" width="100px"/>
                           <p>No hay Más Productos Cargados Con Este Distribuidor</p>  
                           <hr/>
                         </div>
                         
                         <div>
                           <div className="address">
                             <div className="d-flex flex-column dis">
                             <button className="btn btn-info mt-2" type="button" onClick={()=>{guardarDistribuidor()}}>
                                 <span className="ti-angle-double-right"></span>{" "}
                                 Guardar
                               </button>
                               
                             </div>
                           </div>
                         </div>
                         </>
               }
                 </>
                }
              </div>
            </div>
              </>
            }
           
           <ConfirmarParte
            item={stockList}
            />
          </div>

        </div>
        <Footer />
      </div>
    </Container>
  );
};

AgregarParteDelDia.propTypes = {
  crearParteDia: PropTypes.func.isRequired,
  getDistribuidores: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  distribuidor: state.distribuidoresReducer,
});

export default connect(mapStateToProps, { crearParteDia, getDistribuidores })(
  AgregarParteDelDia
);
