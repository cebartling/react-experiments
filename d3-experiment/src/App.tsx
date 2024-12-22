import './App.css';
import BarChart from './components/charts/BarChart';
import Figure from './components/foundational/Figure';
import Heading1 from './components/foundational/Heading1';
import Section from './components/foundational/Section';

function App() {
    return (
        <>
            <Section>
                <Heading1>Example Bar Chart</Heading1>
                <Figure caption="Example bar chart">
                    <BarChart />
                </Figure>
            </Section>
        </>
    );
}

export default App;
