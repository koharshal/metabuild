import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import Login from './pages/admin/Login';
import PdfViewer from './pages/admin/PdfViewer';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brutal-bg flex items-center justify-center p-4">
        <div className="bg-brutal-white border border-brutal-black p-12 text-center min-w-[300px]">
          <div className="animate-spin h-12 w-12 border-4 border-brutal-black border-t-brutal-white mx-auto mb-6"></div>
          <p className="font-display text-xl text-brutal-black uppercase tracking-tighter">Authenticating</p>
          <p className="text-[10px] tracking-widest uppercase font-bold text-brutal-black/50 mt-2">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Public Layout with Header/Footer
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* PDF Brochure Route - Must be before admin routes */}
      <Route path="/brochure/:slug" element={<PdfViewer />} />

      {/* Admin Routes - Protected */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/projects" element={
        <ProtectedRoute>
          <AdminProjects />
        </ProtectedRoute>
      } />

      {/* Public Routes */}
      <Route path="/" element={
        <PublicLayout>
          <Home />
        </PublicLayout>
      } />
      <Route path="/projects" element={
        <PublicLayout>
          <Projects />
        </PublicLayout>
      } />
      <Route path="/projects/:id" element={
        <PublicLayout>
          <ProjectDetail />
        </PublicLayout>
      } />
      <Route path="/about" element={
        <PublicLayout>
          <About />
        </PublicLayout>
      } />
      <Route path="/contact" element={
        <PublicLayout>
          <Contact />
        </PublicLayout>
      } />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
