import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MapComponent from './components/MapComponent';

function App() {
  return (
    <>
      <h1>React Leaflet experiment</h1>
      <div className="card">
        <MapComponent />
      </div>
    </>
  );
}

export default App;
