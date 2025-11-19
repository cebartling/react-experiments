// import { BoxScene } from '@/components/BoxScene';

import { Route, Routes } from 'react-router';
import { BoxScene } from '@/components/BoxScene';
import BouncingBallScene from '@/components/BouncingBallScene';

function App() {
    return (
        <div className="w-full h-screen bg-green-300">
            <Routes>
                <Route index path="/" element={<BoxScene />} />
                <Route path="/box" element={<BoxScene />} />
                <Route path="/bouncingBall" element={<BouncingBallScene />} />
            </Routes>
        </div>
    );
}

export default App;
