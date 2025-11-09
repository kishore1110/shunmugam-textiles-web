import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Supervisors from './pages/admin/Supervisors';
import Weavers from './pages/admin/Weavers';
import AdminProducts from './pages/admin/Products';
import Reports from './pages/admin/Reports';
import SupervisorDashboard from './pages/supervisor/Dashboard';
import SupervisorReports from './pages/supervisor/Reports';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requireRole="admin">
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/supervisors" element={
          <ProtectedRoute requireRole="admin">
            <Supervisors />
          </ProtectedRoute>
        } />
        <Route path="/admin/weavers" element={
          <ProtectedRoute requireRole="admin">
            <Weavers />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute requireRole="admin">
            <AdminProducts />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute requireRole="admin">
            <Reports />
          </ProtectedRoute>
        } />

        {/* Supervisor Routes - Protected */}
        <Route path="/supervisor/dashboard" element={
          <ProtectedRoute requireRole="supervisor">
            <SupervisorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/supervisor/reports" element={
          <ProtectedRoute requireRole="supervisor">
            <SupervisorReports />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
