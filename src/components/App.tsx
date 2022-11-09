import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import About from '../pages/About';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<Homepage />} />
    </Routes>
  );
};

export default App;
