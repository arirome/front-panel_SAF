import React, { useEffect, useState, useRef } from "react";
import {
  Marker,
  MapContainer,
  TileLayer,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

const MapView = ({
  descripcionPunto,
  imgPunto,
  tipoPunto,
  ubiAnterior,
  guardarUbi,
}) => {
  const center = [-26.18064675300086, -58.188628961794805];

  L.icon({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  });

  
  const [marker, setMarker] = useState([]);
  const [markerVisible, setMarkerVisible] = useState(false);
  
  
  const mapRef = useRef();

  const _onCreate = async (e) => {
    const { layerType, layer } = e;
    if (layerType === "marker") {
      /* console.log(layerType) */
      const { _leaflet_id, _latlng } = layer;
      /*  console.log(_latlng) */
      setMarker([...marker, _latlng]);
      setMarkerVisible(true);

      mapRef.current.removeLayer(e.layer);
    }
  };

  const _onEdited = (e) => {
    const {
      layers: { _layers },
    } = e;

    const ubi = Object.values(_layers)[0]._latlng;
    setMarker(ubi);
    setMarkerVisible(true);
  };

  /*  const _onDeleted = (e) => {
        //console.log(e)
        setMarker({})
        setMarkerVisible(true)
      };
 */
      const [logoPunto, setLogoPunto] = useState("https://res.cloudinary.com/dabtnpikz/image/upload/v1684090876/puntoFijo_vp0nxi.png")
      useEffect(()=>{
        if(tipoPunto == "PuntoFijo"){
            setLogoPunto("https://res.cloudinary.com/dabtnpikz/image/upload/v1684089821/ubi3_a9iutd.webp")
        }else if(tipoPunto == "PuntoVisitado"){
            setLogoPunto("https://res.cloudinary.com/dabtnpikz/image/upload/v1684089784/PuntoVisitado_b4e3rg.webp")
        }else if(tipoPunto == "PuntoBarrio"){
            setLogoPunto("https://res.cloudinary.com/dabtnpikz/image/upload/v1684089821/ubiBarrio_jhdqgp.webp")
        }else if(tipoPunto == "PuntoInterior"){
            setLogoPunto("https://res.cloudinary.com/dabtnpikz/image/upload/v1684089821/ubiInterior_ajtzs8.webp")
        }
      },[tipoPunto])

      const iconoVisitado = L.icon({
        iconUrl: logoPunto,
        iconSize: [52, 52], // tamaño del icono
        iconAnchor: [16, 16], // posición del ancla del icono
      });

useEffect(()=>{
    //console.log(marker)
   /*  console.log(descripcionPunto)
    console.log(tipoPunto)
    console.log(markerVisible) */
    guardarUbi(marker[0])
},[marker])

/* console.log( ubiAnterior) */
  return (
    <MapContainer ref={mapRef} center={center} zoom={12}>
      <FeatureGroup>
        <EditControl
          position="topleft"
          onCreated={_onCreate}
          onEdited={_onEdited}
          /*  onDeleted={_onDeleted} */

          draw={{
            rectangle: false,
            polyline: false,
            polygon: false,
            circle: false,
            circlemarker: false,
            marker: true,
          }}
        />

        {
            marker?.length > 0 && marker?.map((item)=>{
                //console.log(item.lng)
                return(
                    <Marker  
            icon={iconoVisitado}
            position={{
              lat: item?.lat,
              lng: item?.lng,
            }} color="#1f6764" interactive={true} weight={"1"}>
            <Popup>
            <div align="center">
                <h2 style={{ textAlign: "center" }}>{tipoPunto}</h2>
                <p style={{ textAlign: "center" }}>
                    {descripcionPunto}
                </p>

                <img
                    src={imgPunto}
                    alt="Imagen del lugar"
                    style={{ maxWidth: "200px" }}
                />
                </div>
            </Popup>
            </Marker>
                )
            })
        }
        {
            marker?.length > 0 ?
            <>
            {
              marker?.map((item)=>{
                        return(
                          <Marker  
                  icon={iconoVisitado}
                  position={{
                    lat: item?.lat,
                    lng: item?.lng,
                  }} color="#1f6764" interactive={true} weight={"1"}>
                  <Popup>
                  <div align="center">
                      <h2 style={{ textAlign: "center" }}>{tipoPunto}</h2>
                      <p style={{ textAlign: "center" }}>
                          {descripcionPunto}
                      </p>

                      <img
                          src={imgPunto}
                          alt="Imagen del lugar"
                          style={{ maxWidth: "200px" }}
                      />
                      </div>
                  </Popup>
                  </Marker>
                      )
                
            })
            }
            </>
            :
            <>
            {
                ubiAnterior ?
                <>
                 <Marker  
          icon={iconoVisitado}
          position={{
            lat: ubiAnterior?.lat,
            lng: ubiAnterior?.lon,
          }} color="#1f6764" interactive={true} weight={"1"}>
          <Popup>
          <div align="center">
              <h2 style={{ textAlign: "center" }}>{tipoPunto}</h2>
              <p style={{ textAlign: "center" }}>
                  {descripcionPunto}
              </p>

              <img
                  src={imgPunto}
                  alt="Imagen del lugar"
                  style={{ maxWidth: "200px" }}
              />
              </div>
          </Popup>
          </Marker>
                </>
                :
                null
            }
            </>
        }


{/* 

 

*/}

{/* 
return(
                    <Marker  
            icon={iconoVisitado}
            position={{
              lat: ubiAnterior?.lat,
              lng: ubiAnterior?.long,
            }} color="#1f6764" interactive={true} weight={"1"}>
            <Popup>
            <div align="center">
                <h2 style={{ textAlign: "center" }}>{tipoPunto}</h2>
                <p style={{ textAlign: "center" }}>
                    {descripcionPunto}
                </p>

                <img
                    src={imgPunto}
                    alt="Imagen del lugar"
                    style={{ maxWidth: "200px" }}
                />
                </div>
            </Popup>
            </Marker>
                )


*/}
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapView;
