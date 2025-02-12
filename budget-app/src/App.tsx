import { DashboardPage } from '@/components/pages/DashboardPage';
import * as data from '@/mocks/transactions.json';

function App() {
  return (
    <main className="w-screen h-screen p-4">
      <DashboardPage data={data} />
    </main>
  );
}

export default App;
