import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the MapLibre GL Experiment</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a React application for experimenting with MapLibre GL.</p>
    </div>
  )
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
