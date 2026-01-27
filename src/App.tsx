import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { Loading } from './components/Loading';

// Lazy loading das páginas
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
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
              <Route path="/login" element={<LoginPage />} />
              
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <PetsListPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/pets/novo"
                element={
                  <PrivateRoute>
                    <PetFormPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/pets/:id"
                element={
                  <PrivateRoute>
                    <PetDetailPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/pets/:id/editar"
                element={
                  <PrivateRoute>
                    <PetFormPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/tutores"
                element={
                  <PrivateRoute>
                    <TutoresListPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/tutores/novo"
                element={
                  <PrivateRoute>
                    <TutorFormPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/tutores/:id"
                element={
                  <PrivateRoute>
                    <TutorDetailPage />
                  </PrivateRoute>
                }
              />
              
              <Route
                path="/tutores/:id/editar"
                element={
                  <PrivateRoute>
                    <TutorFormPage />
                  </PrivateRoute>
                }
              />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

