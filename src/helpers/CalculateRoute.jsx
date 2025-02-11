import { useState } from "react";
import { DirectionsService, Polyline } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const CalculateRoutes = ({ userLocation }) => {
  const [routeSegments, setRouteSegments] = useState([]);

  // Función para asignar color según la distancia
  const getColorByDistance = (distance) => {
    if (distance > 50000) return "#FF0000"; // Rojo para > 50 km
    if (distance > 20000) return "#FFA500"; // Naranja entre 20 y 50 km
    return "#0000FF"; // Azul para < 20 km
  };

  const calculateRouteWithWaypoints = async () => {
    if (!userLocation || !userLocation.lat || !userLocation.lng) {
      console.error("Ubicación del usuario no válida");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: 18.5371, lng: -69.8619 }, // Casa de Angel
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: [
          { location: { lat: 18.4674, lng: -69.9249 }, stopover: true }, // Bravo de la 27
          { location: { lat: 18.9864, lng: -71.6272 }, stopover: true }, // Casa de Omar
        ],
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Dividir la ruta en segmentos y asignar colores
          const segments = result.routes[0].legs.map((leg) => {
            const path = leg.steps.flatMap((step) => step.path); // Obtener el camino del segmento
            return {
              path,
              color: getColorByDistance(leg.distance.value), // Asignar color según distancia
            };
          });

          setRouteSegments(segments); // Guardar los segmentos con colores
        } else {
          console.error("Error al calcular la ruta con paradas:", status);
        }
      }
    );
  };

  return (
    <>
      <div
        className="dropdown"
        style={{ position: "absolute", top: "70px", left: "20px", zIndex: 1000 }}
      >
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          style={{ width: "200px", height: "70px" }}
        >
          Dropdown Example
        </button>
        <ul
          className="dropdown-menu"
          style={{ width: "200px", height: "100px", fontSize: "15px" }}
        >
          <li>
            <a
              className="dropdown-item"
              onClick={() => calculateRouteWithWaypoints()}
            >
              Todas
            </a>
          </li>
        </ul>
      </div>

      {/* Renderizar cada segmento de la ruta con Polyline */}
      {routeSegments.map((segment, index) => (
        <Polyline
          key={index}
          path={segment.path}
          options={{
            strokeColor: segment.color,
            strokeOpacity: 0.8,
            strokeWeight: 6,
          }}
        />
      ))}
    </>
  );
};

export default CalculateRoutes;