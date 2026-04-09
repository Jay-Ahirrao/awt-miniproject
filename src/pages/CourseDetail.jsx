import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courses } from '../utils/mockData';
import { getUser, getProgress, completeModule } from '../utils/storage';
import { PlayCircle, CheckCircle, ArrowLeft, Check, Trophy } from 'lucide-react';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const [progress, setProgress] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      navigate('/auth');
      return;
    }
    const userProgress = getProgress();
    if (!userProgress[id]?.enrolled) {
      navigate('/courses');
      return;
    }
    setProgress(userProgress[id]);
    setActiveModule(course.modules[0]);
  }, [id, navigate, course]);

  if (!course || !progress || !activeModule) return null;

  const handleComplete = () => {
    completeModule(id, activeModule.id);
    setProgress(getProgress()[id]);
    
    // Auto advance to next modulo if not completed
    const currentIndex = course.modules.findIndex(m => m.id === activeModule.id);
    if (currentIndex < course.modules.length - 1) {
      setActiveModule(course.modules[currentIndex + 1]);
    }
  };

  const isCompleted = progress.completedModules.includes(activeModule.id);
  const percent = Math.round((progress.completedModules.length / course.modules.length) * 100);

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '1rem' }}>
      <Link to="/dashboard" className="btn" style={{ background: 'transparent', padding: 0, marginBottom: '2rem', display: 'inline-flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Main Content Area */}
        <div>
          <div style={{ width: '100%', height: '400px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <img src={course.image} alt={course.title} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            <PlayCircle size={64} style={{ color: 'white', zIndex: 1, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{activeModule.title}</h1>
              <p className="text-secondary">Duration: {activeModule.duration}</p>
            </div>
            
            <button 
              className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`} 
              onClick={handleComplete}
              disabled={isCompleted}
            >
              {isCompleted ? <><Check size={20} /> Completed</> : 'Mark as Complete'}
            </button>
          </div>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Module Description</h3>
            <p className="text-secondary" style={{ lineHeight: 1.8 }}>
              This is a placeholder for the actual learning content of "{activeModule.title}". 
              In a real application, this space would contain videos, rich text articles, interactive code snippets, or other educational tools. For now, you can mark this as reading so you can see the progress bar increase on the right pane!
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Course Progress</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="text-secondary">Completed</span>
              <span className="text-gradient font-bold">{percent}%</span>
            </div>
            <div className="progress-container mb-4">
              <div className="progress-fill" style={{ width: `${percent}%` }}></div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Syllabus</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {course.modules.map((mod, index) => {
                const modCompleted = progress.completedModules.includes(mod.id);
                const isActive = activeModule.id === mod.id;
                
                return (
                  <button 
                    key={mod.id} 
                    onClick={() => setActiveModule(mod)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1rem', 
                      background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                      border: isActive ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                      borderRadius: 'var(--radius-sm)',
                      color: isActive ? 'var(--brand-primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    {modCompleted ? (
                      <CheckCircle size={20} className="text-gradient" />
                    ) : (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
                        {index + 1}
                      </div>
                    )}
                    <div style={{ flex: 1, fontWeight: isActive ? 600 : 400 }}>{mod.title}</div>
                  </button>
                );
              })}
            </div>

            {percent === 100 && progress.score === null && (
              <div style={{ marginTop: '2rem' }}>
                <Link to={`/assessment/${id}`} className="btn btn-primary btn-full animate-fade-in text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Trophy size={18} /> Take Final Assessment
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
