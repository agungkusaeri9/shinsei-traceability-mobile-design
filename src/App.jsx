import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MobileContainer from './components/MobileContainer';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import AcceptanceInspectionPage from './pages/AcceptanceInspectionPage';
import AcceptanceDetailPage from './pages/AcceptanceDetailPage';
import MaterialFeedingPage from './pages/MaterialFeedingPage';
import MaterialFeedingDetailPage from './pages/MaterialFeedingDetailPage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MobileContainer>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <MenuPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/acceptance-inspection"
              element={
                <ProtectedRoute>
                  <AcceptanceInspectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/acceptance-inspection/detail/:id"
              element={
                <ProtectedRoute>
                  <AcceptanceDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/material-feeding"
              element={
                <ProtectedRoute>
                  <MaterialFeedingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/material-feeding/detail/:id"
              element={
                <ProtectedRoute>
                  <MaterialFeedingDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MobileContainer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
