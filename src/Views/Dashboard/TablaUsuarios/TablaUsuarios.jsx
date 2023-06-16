import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../Components/Layouts/Container/Container";
import Footer from "../../../Components/Layouts/Footers/Footer";
import { DataGrid, esES } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { mostrarProductos } from "../../../Redux/Actions/productos.action";
import Spinner from "../../../Components/Layouts/Spinners/Spinner";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import './Tabla.css'
const TablaUsuarios = ({
  mostrarProductos,
  producto: { productos, loading, totalProductos, totalPaginas },
}) => {
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    mostrarProductos(limit, skip);
  }, []);



  const columns = [
    { field: "uid", hide: true, headerName: "ID", width: 90, headerClassName: "super-app-theme--header", },
    {
      field: "img",
      headerName: "#",
      width: 60,
      headerAlign: 'center',
      headerClassName: "super-app-theme--header",
      cellClassName: 'MuiDataGrid-cell--textCenter',
      renderCell: (params) => 
      <div align="center"><img style={{width:"100%", height:"100%"}} src="src\Components\Assets\Images\orden.png" /></div>
    },
    {
      field: "nombre",
      headerName: "Nombre Del Producto",
      width: 180,
      headerAlign: 'center',
      headerClassName: "super-app-theme--header",
      cellClassName: 'MuiDataGrid-cell--textCenter',
    },
    {
      field: "unidad",
      headerName: "Unidad",
      width: 150,
      cellClassName: 'MuiDataGrid-cell--textCenter',
      headerAlign: 'center',
      headerClassName: "super-app-theme--header",
    },
    {
      field: "productos",
      headerName: "Distribuidor",
      width: 180,
      cellClassName: 'MuiDataGrid-cell--textCenter',
      headerAlign: 'center',
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return params.getValue(params.id, "distribuidor").nombre;
      },
    },
  ];

  const rows = productos;

  const actionColumn = [
    {
      align: "center",
      headerAlign: "center",
      field: "action",
      headerName: "Acciones",
      headerClassName: "super-app-theme--header",
      flex: 1,
      cellClassName: 'MuiDataGrid-cell--textCenter',
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button type="button" class="btn btn-inverse-success btn-icon mx-2">
              <i class="ti-eye"></i>
            </button>
            <button type="button" class="btn btn-inverse-warning btn-icon mx-2">
              <i class="ti-pencil"></i>
            </button>
            <button class="btn btn-inverse-danger btn-icon mx-2">
              <i class="ti-trash"></i>
            </button>
          </div>
        );
      },
    },
  ];

 

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          {loading ? (
            <Spinner />
          ) : (
            <div
              class="col-lg-12 grid-margin stretch-card"
              style={{ height: "95%" }}
            >
              <div class="card shadow">
                <div class="card-body">
                  <div>
                    <div className="float-right">
                      <Link to="/agregar-producto">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <AddBoxIcon>
                            <AddCircleIcon style={{ color: "#78ae62" }} />
                          </AddBoxIcon>
                        </Tooltip>
                      </Link>
                    </div>
                    <h4 class="card-title">Productos</h4>
                  </div>

                  <div class="table-responsive" style={{ height: "88%" }}>
                    <Box
                      sx={{
                        height: "90%",
                        width: "100%"
                      }}
                      
                    >
                      <DataGrid
                        localeText={
                          esES.components.MuiDataGrid.defaultProps.localeText
                        }
                        
                        rows={rows}
                        columns={columns.concat(actionColumn)}
                        pageSize={4}
                    
                        /* checkboxSelection */
                        disableRowSelectionOnClick
                        getRowId={(row) => row.uid}
                        
                        loading={rows.length === 0}
                        getRowClassName="super-app-theme--xd"
                        sx={{
                          
                          '.MuiDataGrid-columnSeparator': {
                            display: 'none',
                          },
                          
                        }}
                      />
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </Container>
  );
};

TablaUsuarios.propTypes = {
  mostrarProductos: PropTypes.func.isRequired,
  productos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  producto: state.productosReducer,
});

export default connect(mapStateToProps, { mostrarProductos })(TablaUsuarios);
