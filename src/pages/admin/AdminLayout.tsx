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
    <div className="min-h-screen bg-brutal-bg">
      {/* Admin Header */}
      <header className="bg-brutal-white border-b border-brutal-black">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-brutal-black bg-brutal-black flex items-center justify-center">
                <span className="text-brutal-white font-display leading-none pt-1">M</span>
              </div>
              <div>
                <h1 className="text-lg font-display text-brutal-black uppercase tracking-tighter">Admin Panel</h1>
                <p className="text-[10px] uppercase tracking-widest text-brutal-black font-bold">Content Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 h-10 border border-brutal-black text-brutal-black font-bold text-[10px] tracking-widest uppercase hover:bg-brutal-black hover:text-brutal-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Website
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 h-10 border border-brutal-black text-brutal-black font-bold text-[10px] tracking-widest uppercase hover:bg-red-600 hover:text-brutal-white hover:border-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-64 flex-shrink-0">
            <div className="flex flex-col border-t border-l border-r border-brutal-black bg-brutal-white">
              {adminNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-4 border-b border-brutal-black transition-colors ${
                    isActive(item.href)
                      ? 'bg-brutal-black text-brutal-white'
                      : 'text-brutal-black hover:bg-brutal-bg'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-[12px] font-bold tracking-widest uppercase">{item.name}</span>
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
