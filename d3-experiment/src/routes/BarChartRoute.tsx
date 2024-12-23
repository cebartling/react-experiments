import Section from '~/components/foundational/Section';
import Heading1 from '~/components/foundational/Heading1';
import Figure from '~/components/foundational/Figure';
import BarChart from '~/components/charts/BarChart';

export default function BarChartRoute() {
    return (
        <Section>
            <Heading1>Example Bar Chart</Heading1>
            <Figure caption="Example bar chart">
                <BarChart />
            </Figure>
        </Section>
    );
}
