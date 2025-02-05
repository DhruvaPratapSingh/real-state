import { MapContainer, TileLayer } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

function Map({items}){
  const DEFAULT_CENTER = [28.6139, 77.2090]; // Default to New Delhi (or any fallback location)
const center = items?.lat && items?.lng ? [items.lat, items.lng] : DEFAULT_CENTER;
  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item=>(
      <Pin item={item} key={item.id}/>
    ))}
  </MapContainer>
  )
}

export default Map