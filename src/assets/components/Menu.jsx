import React, { useState } from "react";
import PropTypes from "prop-types";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";
import { mapaEx, viewEx } from "./Mapa";
import Extent from "@arcgis/core/geometry/Extent.js";

const Submenu = ({ items, handleCheckboxChange }) => {
  let itemToUpdate;
  const handleCheckboxChangeLocal = (event, layerIden) => {
    let verificaCkb = event.target.checked;
    if (verificaCkb) {
      itemToUpdate = items.find((item) => {
        return item.layerIden === layerIden;
      });
    } else {
      itemToUpdate = items.find((item) => {
        if (item.layerIden === layerIden) {
          let introCapasL = mapaEx.layers.items;
          for (const strLs in introCapasL) {
            let resStrCapasL = introCapasL[strLs];
            if (resStrCapasL.title == item.title) {
              console.log(strLs);
              mapaEx.remove(mapaEx.layers.items[parseInt(strLs)]);
            }
          }
        }
      });

      return;
    }
    if (itemToUpdate) {
      //CARGA CAPA PARA CADA ENTRADA
      const layer = new MapImageLayer({
        title: itemToUpdate.title,
        url: itemToUpdate.url,
        sublayers: [
          {
            id: [itemToUpdate.layerIden],
            title: itemToUpdate.idOE,
            opacity: 1,
            visible: true,
          },
        ],
      });
      mapaEx.add(layer);

      layer.when(() => {
        const layerUrl = layer.url + "/" + itemToUpdate.layerIden;

        // Parámetros de la consulta (en este ejemplo, consulta todas las entidades)
        const queryParams = {
          f: "json",
          where: "1=1", // Consulta todas las entidades
          returnExtentOnly: true,
          outSR: 102100, // Devolver solo la extensión
          // Formato de respuesta JSON
        };

        const queryUrl = `${layerUrl}/query?${new URLSearchParams(
          queryParams
        )}`;

        fetch(queryUrl)
          .then((response) => response.json())
          .then((data) => {
            // La respuesta contiene la extensión de las entidades consultadas
            const extents = data.extent;
            // Obtén la extensión que deseas mostrar en la vista

            const extent = new Extent({
              xmin: extents.xmin,
              ymin: extents.ymin,
              xmax: extents.xmax,
              ymax: extents.ymax,
              spatialReference: viewEx.spatialReference,
            });

            let opts = {
              duration: 3000  // Duration of animation will be 5 seconds
            };

            viewEx.goTo({
              target: extent,
              padding: 50, // Opcional: agrega un margen de 50 píxeles alrededor de la extensión
            }, opts);
           // console.log(extent);
            // Establece la extensión de la vista
            //viewEx.extent = extent;
          })
          .catch((error) => {
            console.error("Error al realizar la consulta:", error);
          });
      });
    }

    if (handleCheckboxChange) {
      handleCheckboxChange(event, layerIden);
    }
  };

  return (
    <ul className="space-y-2 rounded-lg transition ease-in-out">
      {items.map((item, index) => (
        <li key={item.layerIden}>
          <label className="text-gray-800 dark:text-white">
            <input
              type="checkbox"
              name="ckb"
              id={index + 1}
              checked={item.checked}
              onChange={(event) =>
                handleCheckboxChangeLocal(event, item.layerIden)
              }
            />
            {item.title}
          </label>
          {item.submenu && (
            <Submenu
              items={item.submenu}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

Submenu.propTypes = {
  items: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func,
};

export const Menu = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ul className="bg-white text-gray-900 dark:bg-gray-900 dark:!text-white  w-80  p-5 absolute scroll-m-0 h-screentransition-all  pl-9 right-0">
      {items.map((item, index) => (
        <li className="text-gray-800 dark:!text-white" key={item.id}>
          <button
            onClick={() => toggleAccordion(index)}
            className={`w-full px-4 py-2 border-2 text-left text-gray-800 dark:text-white transition duration-150 ease-in-out ${
              activeIndex === index ? "border-2 bg-blue-900 text-white " : ""
            }`}
          >
            {item.title}
          </button>
          <div
            className={`w-full px-4 py-2 text-left text-gray-800 dark:text-white transition duration-150 ease-in-out ${
              activeIndex === index ? "block" : "hidden"
            }`}
          >
            {item.submenu && (
              <Submenu items={item.submenu} handleCheckboxChange={() => {}} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};
