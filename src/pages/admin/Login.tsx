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
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 border-2 border-luxury-gold/30 flex items-center justify-center">
              <span className="text-luxury-gold font-display text-3xl">M</span>
            </div>
          </div>
          <h1 className="font-display text-2xl text-luxury-white tracking-widest">METABUILD</h1>
          <p className="text-luxury-muted text-sm mt-1">Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-luxury-charcoal border border-luxury-gray p-8">
          <h2 className="text-xl font-display text-luxury-white mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">
                Admin Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-muted" />
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                  placeholder="metabuild"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest text-luxury-muted uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-luxury-black border border-luxury-gray text-luxury-white focus:border-luxury-gold focus:outline-none"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-muted hover:text-luxury-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-luxury-gold text-luxury-black font-medium hover:bg-luxury-gold-light transition-colors"
            >
              {submitting ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center text-luxury-muted text-xs mt-6">
          Authorized access only
        </p>
      </div>
    </div>
  );
};

export default Login;
