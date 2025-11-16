import { Routes, Route, Link } from 'react-router-dom'

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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-16 items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium">
              About
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
