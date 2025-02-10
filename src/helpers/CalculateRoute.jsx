import { useState } from "react";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const CalculateRoutes = ({ userLocation }) => {
  const [directions, setDirections] = useState(null);

  const calculateRoute = async () => {
    if (!userLocation || !userLocation.lat || !userLocation.lng) {
      console.error("Ubicación del usuario no válida");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation, 
        destination: { lat: 18.53698676723117, lng: -69.86194430254609}, // Destino fijo (Nueva York) 18.53698676723117, -69.86194430254609
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error al calcular la ruta:", status);
        }
      }
    );
  };

  return (
    <>
    <button 
    onClick={calculateRoute} 
    style={{
      padding: "15px",
      fontSize: "16px",
      backgroundColor: "red",
      color: "white",
      position: "absolute",
      top: "10px",
      left: "10px",
      zIndex: 1000 // Asegura que esté por encima del mapa
    }}
>
      Generar ruta
    </button>
    {directions && <DirectionsRenderer directions={directions} />}
    </>
  );
};

export default CalculateRoutes;