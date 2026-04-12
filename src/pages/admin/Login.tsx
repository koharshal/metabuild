import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setSubmitting(true);
    const success = await login(identifier, password);
    setSubmitting(false);

    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-brutal-bg flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-brutal-white border border-brutal-black p-8 sm:p-12">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="font-display text-4xl text-brutal-black uppercase tracking-tighter mb-2">METABUILD</h1>
          <p className="text-[10px] font-bold tracking-widest text-brutal-black/50 uppercase">Admin Panel</p>
        </div>

        {/* Login Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {error && (
              <div className="p-4 bg-brutal-black text-brutal-white font-bold text-[10px] tracking-widest uppercase text-center border border-brutal-black">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">Admin Email</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-12 px-4 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors placeholder:text-brutal-black/30 font-bold"
                  placeholder="admin@yourcompany.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest text-brutal-black uppercase mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-4 pr-12 bg-brutal-bg border border-brutal-black text-brutal-black focus:border-admin-blue focus:border-2 focus:bg-brutal-white outline-none transition-colors placeholder:text-brutal-black/30 font-bold"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center border-l justify-self-end border-brutal-black text-brutal-black hover:bg-admin-blue hover:text-brutal-white hover:border-admin-blue transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 bg-brutal-black text-brutal-white font-bold text-[10px] tracking-widest uppercase hover:bg-admin-blue transition-colors border border-brutal-black"
            >
              {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="mt-12 pt-8 border-t border-brutal-black flex justify-between items-center text-[10px] font-bold tracking-widest text-brutal-black/50 uppercase">
          <span>Authorized Access Only</span>
          <Lock className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
