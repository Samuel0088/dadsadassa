import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import LinhaSou from './pages/LinhaSou';
import LinhaEMTU from './pages/LinhaEMTU';
import Bilheteria from './pages/Bilheteria';
import Status from './pages/Status';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route 
            path="/Home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
          {/* Proteger todas as rotas que exigem autenticação */}
          <Route 
            path="/linhasou" 
            element={
              <ProtectedRoute>
                <LinhaSou />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/linhaemtu" 
            element={
              <ProtectedRoute>
                <LinhaEMTU />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bilheteria" 
            element={
              <ProtectedRoute>
                <Bilheteria />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/status" 
            element={
              <ProtectedRoute>
                <Status />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;