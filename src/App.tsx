import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navbar } from './components/Navbar';
import { Loading } from './components/Loading';

// Lazy loading das páginas
const PetsListPage = lazy(() => import('./pages/PetsListPage').then(m => ({ default: m.PetsListPage })));
const PetDetailPage = lazy(() => import('./pages/PetDetailPage').then(m => ({ default: m.PetDetailPage })));
const PetFormPage = lazy(() => import('./pages/PetFormPage').then(m => ({ default: m.PetFormPage })));
const TutoresListPage = lazy(() => import('./pages/TutoresListPage').then(m => ({ default: m.TutoresListPage })));
const TutorDetailPage = lazy(() => import('./pages/TutorDetailPage').then(m => ({ default: m.TutorDetailPage })));
const TutorFormPage = lazy(() => import('./pages/TutorFormPage').then(m => ({ default: m.TutorFormPage })));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<PetsListPage />} />
              <Route path="/pets/novo" element={<PetFormPage />} />
              <Route path="/pets/:id" element={<PetDetailPage />} />
              <Route path="/pets/:id/editar" element={<PetFormPage />} />
              <Route path="/tutores" element={<TutoresListPage />} />
              <Route path="/tutores/novo" element={<TutorFormPage />} />
              <Route path="/tutores/:id" element={<TutorDetailPage />} />
              <Route path="/tutores/:id/editar" element={<TutorFormPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

