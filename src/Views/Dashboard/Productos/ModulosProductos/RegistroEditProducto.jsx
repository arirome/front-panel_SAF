import React, { useState, useEffect, useRef } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import { useForm } from "../../../../Components/Hooks/UseForm";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import imagenLogo from "../../../../Components/Assets/Images/editarproduc.png";
import { getDistribuidores } from "../../../../Redux/Actions/distribuidores.action";
import { mostrarPunto } from "../../../../Redux/Actions/puntos.action"
import { startUpdate } from "../../../../Redux/Actions/productos.action";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import MensajeErrorInput from "../../../../Components/Layouts/Alertas/MensajeErrorInput";
import { Redirect, useHistory, Link } from "react-router-dom";
import Spinner from "../../../../Components/Layouts/Spinners/Spinner";

const RegistroEditProducto = ({
  getDistribuidores,
  startUpdate,
  mostrarPunto,
  distribuidor: { distribuidores },
  productoData: { producto, loading },
  dataPuntos: { puntos }
}) => {
  const history = useHistory();

  useEffect(() => {
    if (!producto) {
      history.push("/productos");
    }
  }, []);
  
  useEffect(() => {
    getDistribuidores();
    mostrarPunto();
  }, []);

  //const [data, setData] = useState()
  
  const formikRef = useRef();
  const schemaFormProducto = yup.object().shape({
    nombre: yup.string().required("El nombre del producto es requerido"),
    precio: yup.number("Ingresar un numero valido").required("El precio del producto es requerido"),
    descripcion: yup.string().required("La descripcion del producto es requerida"),
    unidad: yup.string().required("Seleccionar el tipo de unidad"),
    distribuidor: yup.string().required("Seleccionar el distribuidor"),
    categoria:  yup.string().required("Seleccionar una categoria"),
    tituloTag:  yup.string("Ingrese un titulo correcto")
  });
  
  const [previewIMG, setPreviewIMG] = useState(producto?.img)
  const [tituloTag, setTituloTag] = useState(producto?.config?.tituloEtiqueta)
  const visualizarIMG = (e) =>{
    setPreviewIMG(URL.createObjectURL(e.target.files[0]))
  }
  let puntosMarcados = producto?.puntosDeVenta
  
/*   useEffect( ()=>{
      console.log(puntosMarcados)
  },[puntosMarcados]) */

  const PuntosArray = [
    {
      puntoNombre: "Barrio",
    },
    {
      puntoNombre: "Interior"
    }
  ]
  
  
  
  const guardarPuntosMarcados = async (e) =>{
    const { value, checked } = e.target
    /* console.log(checked) */
    if(checked == true){
      const data = {
        puntoNombre: value
      }
      //console.log(data)
      puntosMarcados.push(data)
    }else {
      //const filtro = puntosMarcados.filter((item) => item.puntoNombre === value);
      //console.log(filtro)
      const remove = await removeIndex(puntosMarcados, value)
      // console.log(remove)
      puntosMarcados.splice(remove,1)
    }

  }
  
  const removeIndex = (list, value) => {
    for (let i=0; i < list.length; i++){
     /*  console.log(list) */
      if (list[i].puntoNombre === value){return i}
    }
  }

/* useEffect(()=>{
  console.log(puntosMarcados)
},[puntosMarcados]) */

  const inputFileRef= useRef()
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAdd = async (values) => {
    setIsLoading(true)
    const configObj = {
      colorEtiqueta: tituloTag ,
      tituloEtiqueta: values?.tipotag
    }
    const imagen = inputFileRef.current.files[0]

    const formData = new FormData();
    formData.append('nombre', values?.nombre)
    formData.append('unidad', values?.unidad)
    formData.append('precio', values?.precio)
    formData.append('descripcion', values?.descripcion)
    formData.append('distribuidor', values?.distribuidor)
    formData.append('config', JSON.stringify(configObj))
    formData.append('puntosDeVenta', JSON.stringify(puntosMarcados))
    formData.append('categoria', values?.categoria)
    formData.append('image', imagen ? imagen : previewIMG)

/*     console.log(formData) */
    await startUpdate({
      producto: formData,
      id: producto?.uid,
    });
    setIsLoading(false)
  };
  //console.log(producto?.config?.colorEtiqueta)
  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className=" container-fluid  ">
            <div className="row justify-content-center ">
              <div>
                <div className="card shadow-lg ">
                  <div className="row  mx-auto justify-content-center text-center">
                    <div className="col-12 mt-3 ">
                      <h4 className="card-title">
                        <Link to="/productos">
                          <button
                            type="button"
                            class="btn btn-inverse-success btn-icon"
                          >
                            <i class="ti-arrow-left"></i>
                          </button>
                        </Link>{" "}
                        Volver
                      </h4>
                      <br />

                      <h2 className="card-title space">
                        <img
                          src={imagenLogo}
                          alt=""
                          className="itemImg"
                          style={{
                            width: "8vh",
                            position: "relative",
                            top: "-1vh",
                          }}
                        />
                        EDITAR PRODUCTO
                      </h2>

                      <hr />
                    </div>
                  </div>
                  <Formik
                    enableReinitialize={true}
                    innerRef={formikRef}
                    initialValues={{
                      nombre: producto?.nombre,
                      precio: producto?.precio,
                      descripcion: producto?.descripcion,
                      unidad: producto?.unidad,
                      distribuidor: producto?.distribuidor?._id,
                      categoria: producto?.categoria,
                      tipotag: producto?.colorEtiqueta
                    }}
                    onSubmit={handleAdd}
                    validationSchema={schemaFormProducto}
                  >
                    {({ isSubmitting, dirty }) => (
                       <Form id="formAuthentication" className="form-group">
                       <div className="row justify-content-around">

                       <div className="col-md-6">
                           <div className="card border-0">
                             <div className="card-header pb-0"></div>
                             <div className="card-body">
                               <div class="mb-3">
                                 <div align="center" className="contenedorIMGCustom">
                                 <img className="imgPreviewCustom" src={previewIMG}/>
                                 </div>
                                 <div align="center">
                                 <div class="upload-btn-wrapper">
                                   
                                   <button class="btn btn_botonIMG">Subir Foto</button>
                                   <input  ref={inputFileRef} type="file" name="myfile" onChange={(e)=>{visualizarIMG(e)}}/>
                                 </div>
                                 </div>
                                 <MensajeErrorInput
                                   name="nombre"
                                   className="alert alert-danger"
                                 />

                               
                                 
                               </div>
                             </div>
                           </div>
                         </div>

                         <div className="col-md-6">
                           <div className="card border-0">
                             <div className="card-header pb-0"></div>
                             <div className="card-body">
                               <div class="mb-3">
                                 <label className="form-label">Nombre</label>
                                 <div className="content-inputs">
                                 <Field
                                   type="text"
                                   class="form-control"
                                   name="nombre"
                                 />
                                 </div>
                                 <MensajeErrorInput
                                   name="nombre"
                                   className="alert alert-danger"
                                 />
                               </div>

                               <div class="mb-3">
                                 <label className="form-label">
                                   Precio
                                 </label>
                                 <div className="content-inputs">
                                 <Field
                                   type="number"
                                   class="form-control"
                                   name="precio"
                                 />
                                 </div>
                                 <MensajeErrorInput
                                   name="precio"
                                   className="alert alert-danger"
                                 />
                               </div>

                               
                             </div>
                           </div>
                         </div>

                         <div className="col-md-6">
                           <div className="card border-0 ">
                             <div className="card-header pb-0">
                               <div className="card-body">
                               <div class="mb-3">
                                 <label className="form-label">
                                   Seleccione un Distribuidor
                                 </label>
                                 <div className="content-select">
                                 <Field
                                   className="form-select"
                                   as="select"
                                   name="distribuidor"
                                 >
                                   <option disabled value="">
                                     Seleccionar Distribuidor
                                   </option>
                                   {distribuidores?.map((item) => {
                                     return (
                                       <option
                                         key={`producto-${item?.uid}`}
                                         value={item?.uid}
                                       >
                                         {item?.nombre}
                                       </option>
                                     );
                                   })}
                                 </Field>
                                 </div>
                                 <MensajeErrorInput
                                   name="distribuidor"
                                   className="alert alert-danger"
                                 />
                               </div>

                               <div class="mb-3">
                                 <label className="form-label">
                                   Seleccione una Unidad
                                 </label>
                                 <div className="content-select">
                                 <Field
                                   className="form-select"
                                   as="select"
                                   name="unidad"
                                 >
                                   <option disabled value="">
                                     Lista De Unidades
                                   </option>
                                   <option value="KG">KG</option>
                                   <option value="Litros">Litros</option>
                                   <option value="UN">UN</option>
                                   <option value="Docena">Docena</option>
                                 </Field>
                                 <MensajeErrorInput
                                   name="unidad"
                                   className="alert alert-danger"
                                 />
                                 </div>
                               </div>
                               </div>
                             </div>
                           </div>
                         </div>

                         <div className="col-md-6">
                           <div className="card border-0 ">
                             <div className="card-header pb-0">
                               <div className="card-body">
                               <div class="mb-3">
                                 <label className="form-label">Descripcion</label>
                                 <div className="content-inputs">
                                 <Field
                                   type="text"
                                   class="form-control"
                                   name="descripcion"
                                 />
                                 </div>
                                 <MensajeErrorInput
                                   name="descripcion"
                                   className="alert alert-danger"
                                 />
                               </div>

                               <div class="mb-3">
                                 <label className="form-label">
                                   Seleccione una Categoria
                                 </label>
                                 <div className="content-select">
                                 <Field
                                   className="form-select"
                                   as="select"
                                   name="categoria"
                                 >
                                   <option disabled value="">
                                     Lista De Categorias
                                   </option>
                                   <option value="Envasados">Envasados</option>
                                   <option value="ProductosCongelados">Productos Congelados</option>
                                   <option value="Pescados">Pescados</option>
                                   <option value="Carnes">Carnes</option>
                                   <option value="Otros">Otros</option>
                                 </Field>
                                 <MensajeErrorInput
                                   name="categoria"
                                   className="alert alert-danger"
                                 />
                                 </div>
                               </div>
                               </div>
                             </div>
                           </div>
                         </div>

                         <div className="col-md-6">
                           <div className="card border-0 ">
                             <div className="card-header pb-0">
                               <div className="card-body">
                               <div class="mb-3">
                                 <label className="form-label">
                                   Titulo Del Tag
                                 </label>
                                 <div className="content-inputs">
                                 <Field
                                   type="text"
                                   class="form-control"
                                   name="tituloTag"
                                   value={tituloTag}
                                   onChange={(e)=>{setTituloTag(e.target.value)}}
                                 />
                                 </div>
                                 <MensajeErrorInput
                                   name="tituloTag"
                                   className="alert alert-danger"
                                 />
                               </div>
                               
                               </div>
                             </div>
                           </div>
                         </div>

                         <div className="col-md-6">
                           <div className="card border-0 ">
                             <div className="card-header pb-0">
                               <div className="card-body">
                               <div class="mb-3">
                                 <label className="form-label">
                                   Seleccione un color de tag
                                 </label>
                                 <div className="content-select">
                                 <Field
                                   className="form-select"
                                   as="select"
                                   name="tipotag"
                                 >
                                   <option disabled value="" >Seleccionar el tag</option>
                                   <option value=".new" style={{backgroundColor: "#444444", color:"white"}}> ⬛ {tituloTag ? tituloTag : "Tag"} (Negro)</option>
                                   <option value=".newVerde" style={{backgroundColor: "#05d37d", color:"white"}}> 🟩 {tituloTag ? tituloTag : "Tag"} (Verde)</option>
                                   <option value=".newAmarillo" style={{backgroundColor: "#e5e909", color:"black"}}> 🟨 {tituloTag ? tituloTag : "Tag"} (Amarillo)</option>
                                   <option value=".newRojo" style={{backgroundColor: "#cc0505", color:"white"}}> 🟥 {tituloTag ? tituloTag : "Tag"} (Rojo)</option>
                                   <option value=".newCeleste" style={{backgroundColor: "#0593e6", color:"white"}}> 🟦 {tituloTag ? tituloTag : "Tag"} (Celeste)</option>
                                   <option value="" >Ninguno</option>
                                 </Field>
                                 </div>
                                 <MensajeErrorInput
                                   name="tipotag"
                                   className="alert alert-danger"
                                 />
                               </div>

                               
                               </div>
                             </div>
                           </div>
                         </div>

                                 {
                                   puntos?.length > 0 && puntos?.map((item)=>{
                                     var descrip = ""
                                     
                                     for (var i = 0; i < puntosMarcados?.length; i++) {
                                       //puntosMarcados[i].check = true
                                       if(puntosMarcados[i]?.puntoNombre == item?.nombre){
                                        descrip = puntosMarcados[i]?.puntoNombre
                                       }
                                      }
                                      //console.info(descrip)

                                     if(item?.tipo == "PuntoFijo" && item?.publicado == true){
                                        //console.log(puntosMarcados)
                                      return(
                                         <div data-toggle="buttons" class="btn-group">
                                           <label class="btn btn-default">
                                               <input 
                                               type="checkbox" 
                                               id="checkbox_custom" 
                                               name="checkbox" 
                                               value={item?.nombre} 
                                               onChange={(e)=>{guardarPuntosMarcados(e)}}
                                               checked={item?.nombre == descrip ? true : false}
                                               />
                                               <h5>{item?.nombre}</h5>
                                           </label>
                                         </div>
                                       )
                                     }
                                   })
                                 }
                                 {
                                   PuntosArray?.length > 0 && PuntosArray?.map((item)=>{

                                    var descrip = ""
                                     
                                     for (var i = 0; i < puntosMarcados?.length; i++) {
                                       
                                       if(puntosMarcados[i]?.puntoNombre == item?.puntoNombre){
                                        descrip = puntosMarcados[i]?.puntoNombre
                                       }
                                      }

                                     return(
                                       <div data-toggle="buttons" class="btn-group">
                                         <label class="btn btn-default">
                                             <input 
                                             type="checkbox" 
                                             id="checkbox_custom" 
                                             value={item?.puntoNombre} 
                                             onChange={(e)=>{guardarPuntosMarcados(e)}} 
                                             name="checkbox"
                                             checked={item?.puntoNombre == descrip ? true : false}
                                             />
                                             <h5>{item?.puntoNombre}</h5>
                                         </label>
                                       </div>
                                     )
                                   })
                                 }

                                
                       
                       </div>
                       {
                         isLoading ?
                         <div align="center">
                          <Spinner/>
                       </div>
                        
                         :

                         <div align="center">
                         <button type="submit" className="btn btn-warning">
                           Editar Producto
                         </button>
                       </div>
                       }
                       
                     </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
};

RegistroEditProducto.propTypes = {
  getDistribuidores: PropTypes.func.isRequired,
  producto: PropTypes.object.isRequired,
  startUpdate: PropTypes.func.isRequired,
  mostrarPunto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  distribuidor: state.distribuidoresReducer,
  productoData: state.productosReducer,
  dataPuntos: state.puntosReducer
});

export default connect(mapStateToProps, { getDistribuidores, mostrarPunto, startUpdate })(
  RegistroEditProducto
);
