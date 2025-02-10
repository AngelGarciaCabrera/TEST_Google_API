import { useEffect, useState } from "react"
const  getlocation =()=>{
    const [location, setlocation] = useState(null);
    useEffect(()=>{
        if(navigator.geolocation){
            const watchID = navigator.geolocation.watchPosition( //Macheo la posisiona actual del usuario en watchID
                (position)=>{
                    const  {latitude ,longitude } = position.coords; //importante que se llamen asi ya que asi la api la devuelve
                    setlocation({lat: latitude, lng: longitude }); // aqui ya optenida la guardo en location
                },(error)=>{
                    console.error('error al optener la ubicacion', error)
                }
                
            );
            return ()=> navigator.geolocation.clearWatch(watchID); //reasigno la position
        }else{
            console.error('Geolocalizacion no soportada por el navegador')
        }
    },[])
 return location;
} 

export default  getlocation;