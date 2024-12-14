import './App.css';
import WithoutSuspensePage from './pages/WithoutSuspensePage.tsx';
import { Route, Routes } from 'react-router';
import WithSuspensePage from './pages/WithSuspensePage.tsx';
import HomePage from './pages/HomePage.tsx';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="withoutSuspense" element={<WithoutSuspensePage />} />
      <Route path="withSuspense" element={<WithSuspensePage />} />
    </Routes>
  );
}

export default App;
