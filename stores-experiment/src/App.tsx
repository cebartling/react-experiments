import './App.css';
import { BarEditor } from '~components/BarEditor';
import { FooEditor } from '~components/FooEditor';
import { StateViewer } from '~components/StateViewer';

function App() {
    return (
        <>
            <BarEditor />
            <FooEditor />
            <StateViewer />
        </>
    );
}

export default App;
