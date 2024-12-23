import Section from '~/components/foundational/Section';
import Heading1 from '~/components/foundational/Heading1';
import Figure from '~/components/foundational/Figure';
import RadialAreaChart from '~/components/charts/RadialAreaChart';

export default function RadialAreaChartRoute() {
    return (
        <Section>
            <Heading1>Example Radial Area Chart</Heading1>
            <Figure caption="Example radial area chart">
                <RadialAreaChart />
            </Figure>
        </Section>
    );
}
