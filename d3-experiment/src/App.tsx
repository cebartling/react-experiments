import './App.css';
import { Route, Routes } from 'react-router';
import HomeRoute from '~/routes/HomeRoute.tsx';
import BarChartRoute from '~/routes/BarChartRoute.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/bar-chart" element={<BarChartRoute />} />
        </Routes>
    );
}

export default App;
