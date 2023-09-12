import React, { useEffect, useState } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters.js";
import * as identify from "@arcgis/core/rest/identify.js";
import "./css/App.css";
import QuerySigeia from "./QuerySigeia";
import { WidgetMenu } from "./WidgetMenu";


export let mapaEx="";
export let viewEx="";

const Mapa = () => {
  // Declara el estado para el objeto view
  const [view, setView] = useState(null);

  const [map, setMap] = useState(null);
  let params;
  let identifyURL =
    "https://geomaticasig.semarnat.gob.mx/arcgis/rest/services/siore/ORD_UGA_2022_10/MapServer/";

  // Carga capa municipios
  const layer = new MapImageLayer({
    title: "Municipios",
    url: "https://geomaticasig.semarnat.gob.mx/arcgis/rest/services/aps/Generalidades/MapServer/",
    sublayers: [
      {
        id: [2],
        title: "Municipios",
        opacity: 1,
        visible: true,
      },
    ],
  });

  useEffect(() => {
    const newMap = new Map({
      basemap: "topo",
      layers: [layer],
    });

    const mapView = new MapView({
      map: newMap,
      container: "MapApp",
      zoom: 5,
      center: [-102, 23],
    });

      mapaEx=newMap;
      viewEx=mapView;

    // Asigna el objeto view al estado
    setView(mapView);
    setMap(newMap)
 


    //mapView.ui.add(<Menu items={menuData} />, "bottom-left")
    //array ordenamientos
    var arrCamposidOE = [];
    var arrCamposCveUGA = [];

    arrCamposCveUGA[1] = "UAB CLAVE";
    arrCamposidOE[1] = "GFOET001";

    arrCamposCveUGA[0] = "UAB CLAVE";
    arrCamposidOE[0] = "GFOET001";

    //Comienza Marinos

    arrCamposCveUGA[7] = "CLAVE UGA";
    arrCamposidOE[7] = "MFGOC001";

    arrCamposCveUGA[47] = "CLAVE UGA";
    arrCamposidOE[47] = "MFGOM002";

    arrCamposCveUGA[109] = "CLAVE UGA";
    arrCamposidOE[109] = "MFPAN103";

    //Aguascalientes
    arrCamposCveUGA[107] = "CLAVE UGA";
    arrCamposidOE[107] = "LMAGS101";
    arrCamposCveUGA[145] = "CLAVE UGA";
    arrCamposidOE[145] = "REAGS136";

    //Baja California
    arrCamposCveUGA[1] = "CLAVE UGA";
    arrCamposidOE[1] = "REBAC003";

    //Campeche
    arrCamposCveUGA[74] = "CLAVE UGA";
    arrCamposidOE[74] = "LMCAM069";

    arrCamposCveUGA[76] = "CLAVE UGA";
    arrCamposidOE[76] = "LMCHA071";

    arrCamposCveUGA[96] = "CLAVE UGA";
    arrCamposidOE[96] = "LMESC090";

    arrCamposCveUGA[95] = "CLAVE UGA";
    arrCamposidOE[95] = "LMHEC089";

    //Ciudad de méxico
    arrCamposCveUGA[21] = "";
    arrCamposidOE[21] = "REDFR010";

    //Chiapas
    arrCamposCveUGA[51] = "CLAVE UGA";
    arrCamposidOE[51] = "RESAB041";

    //alert(arrCamposCveUGA[51]);
    //alert(arrCamposidOE[51]);

    arrCamposCveUGA[73] = "CLAVE UGA";
    arrCamposidOE[73] = "RECHI008";
    arrCamposCveUGA[98] = "CLAVE UGA";
    arrCamposidOE[98] = "LMRCO092";
    arrCamposCveUGA[134] = "CLAVE UGA";
    arrCamposidOE[134] = "LMSCC125";
    arrCamposCveUGA[147] = "CLAVE UGA";
    arrCamposidOE[147] = "RELMO138";

    //Chihuahua
    arrCamposCveUGA[130] = "CLAVE UGA";
    arrCamposidOE[130] = "LMJUA121";
    arrCamposCveUGA[141] = "CLAVE UGA";
    arrCamposidOE[141] = "LMCHI132";

    //Colima
    arrCamposCveUGA[41] = "CLAVE UGA";
    arrCamposidOE[41] = "RECOL005";
    arrCamposCveUGA[33] = "CLAVE UGA";
    arrCamposidOE[33] = "RECUY006";
    arrCamposCveUGA[135] = "CLAVE UGA";
    arrCamposidOE[135] = "LMMZO126";

    //Durango
    arrCamposCveUGA[3] = "CLAVE UGA";
    arrCamposidOE[3] = "REDGO011";
    arrCamposCveUGA[57] = "CLAVE UGA";
    arrCamposidOE[57] = "LMLER002";
    arrCamposCveUGA[87] = "CLAVE UGA";
    arrCamposidOE[87] = "LMDGO083";
    arrCamposCveUGA[90] = "CLAVE UGA";
    arrCamposidOE[90] = "LMSPA084";
    arrCamposCveUGA[121] = "CLAVE UGA";
    arrCamposidOE[121] = "LMGPA112";
    arrCamposCveUGA[132] = "CLAVE UGA";
    arrCamposidOE[132] = "LMMAP123";
    arrCamposCveUGA[133] = "CLAVE UGA";
    arrCamposidOE[133] = "LMPNV124";
    arrCamposCveUGA[137] = "CLAVE UGA";
    arrCamposidOE[137] = "RESAN128";

    // Estado de Mexico
    arrCamposCveUGA[42] = "CLAVE UGA";
    arrCamposidOE[42] = "REVAL020";
    arrCamposCveUGA[5] = "CLAVE UGA";
    arrCamposidOE[5] = "REMEX019";
    arrCamposCveUGA[58] = "CLAVE UGA";
    arrCamposidOE[58] = "LMTLA052";
    arrCamposCveUGA[60] = "CLAVE UGA";
    arrCamposidOE[60] = "REVTOL037";
    arrCamposCveUGA[59] = "CLAVE UGA";
    arrCamposidOE[59] = "RENES038";
    arrCamposCveUGA[61] = "CLAVE UGA";
    arrCamposidOE[61] = "LMATL002";
    arrCamposCveUGA[63] = "CLAVE UGA";
    arrCamposidOE[63] = "LMTEM001";
    arrCamposCveUGA[64] = "CLAVE UGA";
    arrCamposidOE[64] = "LMHUE001";
    arrCamposCveUGA[65] = "CLAVE UGA";
    arrCamposidOE[65] = "LMIXT046";
    arrCamposCveUGA[66] = "CLAVE UGA";
    arrCamposidOE[66] = "LMJIL047";
    arrCamposCveUGA[67] = "CLAVE UGA";
    arrCamposidOE[67] = "LMNIC048";
    arrCamposCveUGA[68] = "CLAVE UGA";
    arrCamposidOE[68] = "LMRIN049";
    arrCamposCveUGA[69] = "CLAVE UGA";
    arrCamposidOE[69] = "LMITH050";
    arrCamposCveUGA[70] = "CLAVE UGA";
    arrCamposidOE[70] = "LMZUM051";
    arrCamposCveUGA[71] = "CLAVE UGA";
    arrCamposidOE[71] = "RFVPE004";
    arrCamposCveUGA[94] = "CLAVE UGA";
    arrCamposidOE[94] = "LMALJ088";
    arrCamposCveUGA[99] = "CLAVE UGA";
    arrCamposidOE[99] = "LMALR093";
    arrCamposCveUGA[100] = "CLAVE UGA";
    arrCamposidOE[100] = "LMATI094";
    arrCamposCveUGA[101] = "CLAVE UGA";
    arrCamposidOE[101] = "LMJOQ095";
    arrCamposCveUGA[102] = "CLAVE UGA";
    arrCamposidOE[102] = "LMSAI096";
    arrCamposCveUGA[103] = "CLAVE UGA";
    arrCamposidOE[103] = "LMTEX097";
    arrCamposCveUGA[104] = "CLAVE UGA";
    arrCamposidOE[104] = "LMTIA098";
    arrCamposCveUGA[114] = "CLAVE UGA";
    arrCamposidOE[114] = "LMECA108";
    arrCamposCveUGA[125] = "CLAVE_UGA";
    arrCamposidOE[125] = "LMVAL116";

    //Guanajuato

    arrCamposCveUGA[4] = "CLAVE UGA";
    arrCamposidOE[4] = "REGTO079";
    arrCamposCveUGA[44] = "CLAVE UGA";
    arrCamposidOE[44] = "LMSAL152";
    arrCamposCveUGA[45] = "CLAVE UGA";
    arrCamposidOE[45] = "LMSMI151";
    arrCamposCveUGA[46] = "CLAVE UGA";
    arrCamposidOE[46] = "REBAJ100";

    //Hidalgo
    arrCamposCveUGA[80] = "CLAVE UGA";
    arrCamposidOE[80] = "LMTEP075";

    //Jalisco

    arrCamposCveUGA[23] = "CLAVE UGA";
    arrCamposidOE[23] = "REJAL018";
    arrCamposCveUGA[53] = "CLAVE UGA";
    arrCamposidOE[53] = "LMTOM017";
    arrCamposCveUGA[78] = "CLAVE UGA";
    arrCamposidOE[78] = "LMCCO073";
    arrCamposCveUGA[79] = "CLAVE UGA";
    arrCamposidOE[79] = "LMCIH074";
    arrCamposCveUGA[118] = "CLAVE UGA";
    arrCamposidOE[118] = "LMTLA110";
    arrCamposCveUGA[122] = "CLAVE UGA";
    arrCamposidOE[122] = "LMGFA113";
    arrCamposCveUGA[123] = "CLAVE UGA";
    arrCamposidOE[123] = "LMIXT114";
    arrCamposCveUGA[124] = "CLAVE UGA";
    arrCamposidOE[124] = "LMJOC115";
    arrCamposCveUGA[97] = "CLAVE UGA";
    arrCamposidOE[97] = "LMZEG091";
    arrCamposCveUGA[146] = "CLAVE UGA";
    arrCamposidOE[146] = "REALN137";

    //Michoacán
    arrCamposCveUGA[6] = "CLAVE UGA";
    arrCamposidOE[6] = "REMIC022";
    arrCamposCveUGA[52] = "CLAVE UGA";
    arrCamposidOE[52] = "RECUI023";
    arrCamposCveUGA[54] = "CLAVE UGA";
    arrCamposidOE[54] = "RECOM055";
    arrCamposCveUGA[75] = "CLAVE UGA";
    arrCamposidOE[75] = "REINF070";
    arrCamposCveUGA[91] = "CLAVE UGA";
    arrCamposidOE[91] = "LMZIR085";
    arrCamposCveUGA[108] = "CLAVE UGA";
    arrCamposidOE[108] = "LMLCA102";
    arrCamposCveUGA[110] = "CLAVE UGA";
    arrCamposidOE[110] = "LMSES104";
    arrCamposCveUGA[111] = "CLAVE UGA";
    arrCamposidOE[111] = "LMCOT105";
    arrCamposCveUGA[120] = "CLAVE UGA";
    arrCamposidOE[120] = "RETCA111";
    arrCamposCveUGA[142] = "CLAVE UGA";
    arrCamposidOE[142] = "LMURU133";
    arrCamposCveUGA[143] = "CLAVE UGA";
    arrCamposidOE[143] = "LMMOR134";

    //morelos
    arrCamposCveUGA[29] = "CLAVE UGA";
    arrCamposidOE[29] = "LMCUE039";
    arrCamposCveUGA[30] = "CLAVE UGA";
    arrCamposidOE[30] = "LMHUI041";
    arrCamposCveUGA[31] = "CLAVE UGA";
    arrCamposidOE[31] = "LMTEP040";
    arrCamposCveUGA[48] = "CLAVE UGA";
    arrCamposidOE[48] = "LMJON043";
    arrCamposCveUGA[49] = "CLAVE UGA";
    arrCamposidOE[49] = "LMJIU044";
    arrCamposCveUGA[50] = "CLAVE UGA";
    arrCamposidOE[50] = "LMAXO045";
    arrCamposCveUGA[72] = "CLAVE UGA";
    arrCamposidOE[72] = "REMOR001";
    arrCamposCveUGA[131] = "CLAVE UGA";
    arrCamposidOE[131] = "LMAYA122";

    //Nuevo León

    arrCamposCveUGA[8] = "CLAVE UGA";
    arrCamposidOE[8] = "RFCBT001";

    //Oaxaca

    arrCamposCveUGA[83] = "CLAVE UGA";
    arrCamposidOE[83] = "REOAX078";

    arrCamposCveUGA[82] = "CLAVE UGA";
    arrCamposidOE[82] = "LMTON077";

    arrCamposCveUGA[81] = "CLAVE UGA";
    arrCamposidOE[81] = "LMVTU076";

    //Puebla

    arrCamposCveUGA[24] = "CLAVE UGA";
    arrCamposidOE[24] = "RFVPP004";
    arrCamposCveUGA[144] = "CLAVE UGA";
    arrCamposidOE[144] = "LMCUE135";

    //Queretaro

    arrCamposCveUGA[10] = "CLAVE UGA";
    arrCamposidOE[10] = "REQUE039";
    arrCamposCveUGA[77] = "CLAVE UGA";
    arrCamposidOE[77] = "LMQRO072";
    arrCamposCveUGA[85] = "CLAVE UGA";
    arrCamposidOE[85] = "LMHMP081";
    arrCamposCveUGA[86] = "CLAVE UGA";
    arrCamposidOE[86] = "LMTEQ082";
    arrCamposCveUGA[106] = "CLAVE UGA";
    arrCamposidOE[106] = "LMPES100";
    arrCamposCveUGA[112] = "CLAVE UGA";
    arrCamposidOE[112] = "LMCAD106";
    arrCamposCveUGA[115] = "CLAVE UGA";
    arrCamposidOE[115] = "LMMAR109";
    arrCamposCveUGA[126] = "CLAVE UGA";
    arrCamposidOE[126] = "LMSJO117";
    arrCamposCveUGA[127] = "CLAVE UGA";
    arrCamposidOE[127] = "LMTOL118";
    arrCamposCveUGA[136] = "CLAVE UGA";
    arrCamposidOE[136] = "LMCOR127";
    arrCamposCveUGA[139] = "CLAVE UGA";
    arrCamposidOE[139] = "LMEZM130";

    //QUINTANAROO

    arrCamposCveUGA[12] = "CLAVE UGA";
    arrCamposidOE[12] = "LMSOL034";
    arrCamposCveUGA[13] = "CLAVE UGA";
    arrCamposidOE[13] = "RESKN026";
    arrCamposCveUGA[14] = "CLAVE UGA";
    arrCamposidOE[14] = "LMIMU030";
    arrCamposCveUGA[15] = "CLAVE UGA"; //Se mueve el 2021.10.27
    arrCamposidOE[15] = "LMICO029";
    arrCamposCveUGA[16] = "CLAVE UGA";
    arrCamposidOE[16] = "LMCMA028";
    arrCamposCveUGA[17] = "CLAVE UGA";
    arrCamposidOE[17] = "LMBJU032";
    arrCamposCveUGA[18] = "CLAVE UGA";
    arrCamposidOE[18] = "LMLBA031";
    arrCamposCveUGA[92] = "CLAVE UGA";
    arrCamposidOE[92] = "RCCUN086";
    arrCamposCveUGA[93] = "CLAVE UGA";
    arrCamposidOE[93] = "LMOPB087";

    //SINALOA
    arrCamposCveUGA[55] = "CLAVE UGA";
    arrCamposidOE[55] = "LMROS035";

    //SONORA
    arrCamposCveUGA[56] = "CLAVE UGA";
    arrCamposidOE[56] = "RECSO028";

    //tabasco
    arrCamposCveUGA[19] = "CLAVE UGA";
    arrCamposidOE[19] = "RETAB029";

    //tamaulipas
    arrCamposCveUGA[22] = "CLAVE UGA";
    arrCamposidOE[22] = "RFCBT001";

    //tlaxcala
    arrCamposCveUGA[20] = "CLAVE UGA";
    arrCamposidOE[20] = "RETLX031";

    //veracruz
    arrCamposCveUGA[35] = "CLAVE UGA";
    arrCamposidOE[35] = "REBOB033";
    arrCamposCveUGA[36] = "CLAVE UGA";
    arrCamposidOE[36] = "RECCO032";
    arrCamposCveUGA[37] = "CLAVE UGA";
    arrCamposidOE[37] = "RFTUX005";

    //Yucatan

    arrCamposCveUGA[26] = "CLAVE UGA";
    arrCamposidOE[26] = "REYUC036";
    arrCamposCveUGA[27] = "CLAVE UGA";
    arrCamposidOE[27] = "RECYU035";

    //Menu
    mapView.on("click", (event) => {
      //console.log(event);
      params = new IdentifyParameters();
      params.tolerance = 0;
      params.layerOption = "all";
      params.width = mapView.width;
      params.height = mapView.height;
      params.geometry = event.mapPoint;
      params.mapExtent = mapView.extent;
      console.log(event);

      identify
        .identify(identifyURL, params)
        .then(function (response) {
          const results = response.results;

          return results.map(function (result) {
            console.log(result);
            let feature = result.feature;
            let layerName = result.layerName;
            let layerId = result.layerId;
            console.log(layerName);
            console.log(arrCamposidOE[layerId]);
            feature.popupTemplate = {
              // autocasts as new PopupTemplate()
              title: layerName,
              content: `<p>Clave de Ordenamiento:{CLAVE_UGA}<br>
                    Ordenamientos:${arrCamposidOE[layerId]}<br>
                    Política:{POLITICA}<br>
                    Criterio:<a href="https://ideinfoteca.semarnat.gob.mx/utls/qOU/qVGtCrit.asp?CLAVES=${arrCamposidOE[layerId]}^{CLAVE_UGA}">Ver más</a></p>
                    `,
            };
            return feature;
          });
        })
        .then(showPopup);

      function showPopup(response) {
          if (response.length > 0) {
        mapView.openPopup({
          features: response,
          location: event.mapPoint,
        });
        }else{
            console.log("No hay datos");
        }
      }
    });
  }, []);

  return (
    <>
     
      <div id="MapApp"></div>
      {/* Verifica si view está disponible antes de pasar al componente QuerySigeia */}
      {view && <QuerySigeia view={view} map={map} />}
      <WidgetMenu />
    </>
  );
};
export default Mapa;
