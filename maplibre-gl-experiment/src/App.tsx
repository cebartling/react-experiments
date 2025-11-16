import { Routes, Route, Link } from 'react-router-dom'
import Map from './components/Map'

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Home</h1>
      <p className="text-lg">Welcome to the MapLibre GL Experiment</p>
    </div>
  )
}

function About() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-lg">This is a React application for experimenting with MapLibre GL.</p>
    </div>
  )
}

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-16 items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Home
            </Link>
            <Link to="/map" className="text-blue-600 hover:text-blue-800 font-medium">
              Map
            </Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium">
              About
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<main className="max-w-7xl mx-auto flex-1 overflow-auto"><Home /></main>} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<main className="max-w-7xl mx-auto flex-1 overflow-auto"><About /></main>} />
      </Routes>
    </div>
  )
}

export default App
