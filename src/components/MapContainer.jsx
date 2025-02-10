import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"; // importo la api
import getlocation from "../helpers/GetLocation";
import CalculateRoutes from "../helpers/CalculateRoute";


const MapComponent = () => {
    const userLocation = getlocation(); //hook personalizado para optener localizacion

    const mapContainerStyle = {  //defino el tamano
        width: "100%",
        height: "100%",
    };
    
    const center = userLocation || { lat: 0, lng: 0 }; // Centrar el mapa en la ubicación del usuario
    console.log('Ubicacion del usuario',userLocation)
    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_CLAVE_API, //ASI REACT OPTIENE LOS ENV,
    });

    if (loadError) return <div>Error al cargar el mapa</div>;
    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center}>
        {userLocation && <Marker position={userLocation} />}
        {userLocation && <CalculateRoutes userLocation={userLocation} />}
      </GoogleMap>
      
    );
};
export default MapComponent;