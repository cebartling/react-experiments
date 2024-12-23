import './App.css';
import { Route, Routes } from 'react-router';
import HomeRoute from '~/routes/HomeRoute';
import BarChartRoute from '~/routes/BarChartRoute';
import RadialAreaChartRoute from '~/routes/RadialAreaChartRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/bar-chart" element={<BarChartRoute />} />
            <Route
                path="/radial-area-chart"
                element={<RadialAreaChartRoute />}
            />
        </Routes>
    );
}

export default App;
