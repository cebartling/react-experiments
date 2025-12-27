import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import { DirtyStateDemo } from './components/DirtyStateDemo';
import { ParentContainer } from './components/ParentContainer';
import './App.css';

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        rounded-lg px-4 py-2 text-sm font-semibold tracking-tight
        transition-all duration-200
        ${
          isActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
        }
      `}
    >
      {children}
    </Link>
  );
}

function Navigation() {
  return (
    <nav className="sticky top-0 z-40 border-b border-surface-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/">Demo Mode</NavLink>
        <NavLink to="/multi-form">Multi-Form Editor</NavLink>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app bg-surface-50">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                  <h1 className="mb-8 text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl">
                    Multi-Form Save Experiment
                  </h1>
                  <DirtyStateDemo />
                </div>
              }
            />
            <Route path="/multi-form" element={<ParentContainer />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
