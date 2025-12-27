import { BrowserRouter, Routes, Route, Link } from 'react-router';
import { DirtyStateDemo } from './components/DirtyStateDemo';
import { ParentContainer } from './components/ParentContainer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="mb-4 flex gap-4 p-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Demo Mode
          </Link>
          <Link to="/multi-form" className="text-blue-600 hover:underline">
            Multi-Form Editor
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Multi-Form Save Experiment</h1>
                <DirtyStateDemo />
              </>
            }
          />
          <Route path="/multi-form" element={<ParentContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
