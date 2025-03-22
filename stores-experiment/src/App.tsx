import './App.css';
import { BarEditor } from '~components/BarEditor';
import { FooEditor } from '~components/FooEditor';
import { BarView } from '~components/BarView';
import { FooView } from '~components/FooView';

function App() {
    return (
        <>
            <div className="flex w-full flex-row justify-center gap-4 p-2">
                <div className="flex flex-col items-center gap-4 rounded border border-gray-200 p-4 pr-4">
                    <BarEditor />
                    <BarView />
                </div>
                <div className="flex flex-col items-center gap-4 rounded border border-gray-200 p-4 pr-4">
                    <FooEditor />
                    <FooView />
                </div>
            </div>
        </>
    );
}

export default App;
