import React, { useEffect, useState } from 'react'
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Query from "@arcgis/core/rest/support/Query.js";
import * as query from "@arcgis/core/rest/query.js";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters.js";
import * as identify from "@arcgis/core/rest/identify.js";

let params;
const QuerySigeia = ({view, map}) => {

  useEffect(() => {
    // Código dentro de useEffect
    // Esto se ejecutará cuando el componente se monte o cuando cambien las dependencias
    console.log(view);
    console.log(map);

  }, []);

 
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [identifiedPolygon, setIdentifiedPolygon] = useState(null);


  // Función para manejar el cambio en el input
  const handleInputChange = (event) => {
      setInputValue(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
      setSubmittedValue(inputValue);
      performIdentify(inputValue); // Realizar la identificación cuando se hace clic en "Enviar"
  };

  async function performIdentify(inputValue) {
      const queryParameters = new Query({
          returnGeometry: true,
          outFields: ["*"]
      });

      queryParameters.where = `PROY = '${inputValue}' `;

      try {
          const response = await query.executeQueryJSON("https://geomatica.semarnat.gob.mx/arcgis/rest/services/SIGEIA/SIGEIA_T/MapServer/23", queryParameters);
          if (response.features.length > 0) {
              const geometry = response.features[0].geometry;
             
             setIdentifiedPolygon(geometry); // Set the identified polygon
         
              await identifyLocation(geometry);
          } else {
              console.log("No se encontraron resultados para la consulta.");
          }
      } catch (error) {
          console.error("Error en la consulta:", error);
      }
  }

  useEffect(() => {
    // Create a GraphicsLayer for displaying the identified polygon
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Create a Graphic for the identified polygon
    if (identifiedPolygon) {
        const graphic = new Graphic({
            geometry: identifiedPolygon,
            symbol: {
                type: "simple-fill",
                color: [255, 0, 0, 0.5], // Red with 50% transparency
                outline: {
                    color: [0, 0, 0, 1], // Black
                    width: 1
                }
            }
        });

        // Add the graphic to the GraphicsLayer
        graphicsLayer.add(graphic);
        let opts = {
            duration: 3000  // Duration of animation will be 5 seconds
          };
        

        view.goTo({
            target: graphic,
            padding: 50, // Opcional: agrega un margen de 50 píxeles alrededor de la extensión
          }, opts);
    }

    return () => {
        // Clean up the GraphicsLayer when the component unmounts
        map.remove(graphicsLayer);
    };
}, [identifiedPolygon]);


  async function identifyLocation(geometry) {
      params = new IdentifyParameters();
      params.tolerance = 0;
      params.spatialReference = geometry.spatialReference;
      params.spatialRelationship = "contains";
      params.layerOption = "all";
      params.width = view.width;
      params.height = view.height;
      params.mapExtent = view.extent;
      params.geometry = geometry;
      params.returnGeometry = true;

      try {
          const response = await identify.identify("https://geomaticasig.semarnat.gob.mx/arcgis/rest/services/siore/ORD_UGA_2022_10/MapServer/", params);
          console.log(response.results);
      } catch (error) {
          console.error("Error en la tarea de identificación:", error);
      }
  }

  return (
      <div className='bg-white text-gray-900 dark:bg-gray-900 dark:!text-white  w-80 rounded  m-2 absolute  h-20  transition-all bottom-4 left-1'>
        <h4 className='text-center border rounded bg-blue-200 dark:bg-gray-900 p-1'>SIGEIA</h4>
          <input
          className='border h-6  rounded ml-2 mt-3 text-gray-900 text-center'
          placeholder='Bitácora'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
          />
          <button onClick={handleSubmit} className='bg-blue-700 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 ml-5  rounded' >Consultar</button>
      </div>
  );
}

export default QuerySigeia