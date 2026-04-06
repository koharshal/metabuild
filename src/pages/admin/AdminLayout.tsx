import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, Building2, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const adminNav = [
    { name: 'Site Settings', href: '/admin', icon: Settings },
    { name: 'Projects', href: '/admin/projects', icon: Building2 },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Admin Header */}
      <header className="bg-luxury-charcoal border-b border-luxury-gray">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center">
                <span className="text-luxury-gold font-display">M</span>
              </div>
              <div>
                <h1 className="text-lg font-display text-luxury-white">Admin Panel</h1>
                <p className="text-xs text-luxury-muted">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 border border-luxury-gray text-luxury-muted hover:border-luxury-gold hover:text-luxury-gold transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Website
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-luxury-gray text-luxury-muted hover:border-red-500 hover:text-red-500 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-64 flex-shrink-0">
            <div className="space-y-2">
              {adminNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-luxury-gold text-luxury-black'
                      : 'text-luxury-muted hover:bg-luxury-gray hover:text-luxury-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
