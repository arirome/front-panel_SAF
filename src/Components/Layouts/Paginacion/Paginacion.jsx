import React, { useEffect, useState } from "react";

const Paginacion = ({nroPagina, cambiarPagina, totalPaginas}) => {

    const [pagesTotal, setPagesTotal] = useState()
    //const [estado, setEstado] = useState(false)
    const tamanoPage = totalPaginas?.length
    const pages = [...Array(tamanoPage).keys()].map(page => page + 1);
   
/*     console.log(totalPaginas?.length) */

    useEffect(()=>{
      setPagesTotal(pages)
    },[])

    useEffect(()=>{
      if(totalPaginas){
        setPagesTotal(pages)
      }
    },[totalPaginas])
/* 
    console.log(pages) */

  return (
    <>
      {pagesTotal?.map((page) => (
        <li
          key={page}
          className={page === nroPagina ? "page-item active" : "page-item"}
        >
          <a
            className="page-link"
            onClick={(e) => {
              cambiarPagina(e, page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
    </>
  );
};

export default Paginacion;
