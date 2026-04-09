import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/storage';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { getRandomPlaceholder, getRandomUserName } from '../utils/randomNames';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const placeholders = useMemo(() => ({
    name: getRandomPlaceholder('name'),
    email: getRandomPlaceholder('email')
  }), [isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = isLogin ? getRandomUserName() : (formData.name || 'Anonymous User');
    loginUser(displayName, formData.email || placeholders.email);
    window.dispatchEvent(new Event('userStateChanged'));
    navigate('/dashboard');
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '480px', padding: '6rem 0' }}>
      <div className="glass-card" style={{ padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)' }}>
            {isLogin ? <LogIn color="white" size={32} /> : <UserPlus color="white" size={32} />}
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-secondary">
            {isLogin ? 'Enter your credentials to access your dashboard' : 'Start your professional journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ paddingLeft: '3rem' }}
                  required 
                  placeholder={placeholders.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="email" 
                className="form-input" 
                style={{ paddingLeft: '3rem' }}
                required 
                placeholder={placeholders.email}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                className="form-input" 
                style={{ paddingLeft: '3rem' }}
                required 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '2rem', padding: '1.2rem', fontSize: '1.1rem' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--glass-border)', zIndex: 0 }}></div>
          <span style={{ position: 'relative', background: 'var(--bg-secondary)', padding: '0 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', zIndex: 1 }}>OR</span>
        </div>

        <button 
          className="btn btn-secondary btn-full" 
          style={{ marginTop: '1.5rem' }} 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Join the community (Sign Up)" : "Back to login"}
        </button>
      </div>
    </div>
  );
}

