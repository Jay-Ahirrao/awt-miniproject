import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { BookOpen, LogOut, Code, Sparkles } from 'lucide-react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Assessment from './pages/Assessment';
import { getUser, logoutUser } from './utils/storage';
import { getRandomPlatformName } from './utils/randomNames';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const platformName = useMemo(() => getRandomPlatformName(), []);

  useEffect(() => {
    setUser(getUser());
    
    const handleUserChange = () => {
      setUser(getUser());
    };
    window.addEventListener('userStateChanged', handleUserChange);
    return () => window.removeEventListener('userStateChanged', handleUserChange);
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event('userStateChanged'));
    navigate('/');
  };

  return (
    <nav style={{ 
      padding: '1.25rem 0', 
      background: 'rgba(2, 6, 23, 0.8)', 
      backdropFilter: 'blur(16px)', 
      borderBottom: '1px solid var(--glass-border)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000 
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', padding: '0.4rem', borderRadius: '12px', display: 'flex' }}>
            <Sparkles size={24} color="white" />
          </div>
          <span>{platformName}</span>
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/courses" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'var(--transition-fast)' }} className="nav-link">Courses</Link>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: 'var(--text-secondary)', fontWeight: 500 }} className="nav-link">Dashboard</Link>
              <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Get Started</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  const platformName = useMemo(() => getRandomPlatformName(), []);

  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1, padding: '1rem 0' }}>
        <Routes>
          <Route path="/" element={<Home platformName={platformName} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/assessment/:id" element={<Assessment />} />
        </Routes>
      </main>
      <footer style={{ background: 'transparent', padding: '4rem 0', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} {platformName} Learning Platform. Built for the future.
          </p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;

