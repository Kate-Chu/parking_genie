import { Routes, Route } from 'react-router-dom';
import { MapContainer } from 'react-leaflet';
import Homepage from './pages/Homepage';
import About from './pages/About';
import 'react-toastify/dist/ReactToastify.css';
import { TAIPEI_TRANE_STATION } from './data/data';

const App = () => {
  return (
    <MapContainer
      center={TAIPEI_TRANE_STATION}
      zoom={16}
      scrollWheelZoom
      doubleClickZoom={false}
    >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </MapContainer>
  );
};

export default App;
