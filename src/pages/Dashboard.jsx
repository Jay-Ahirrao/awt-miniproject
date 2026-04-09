import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, getProgress } from '../utils/storage';
import { courses } from '../utils/mockData';
import { BookOpen, Trophy, Clock, CheckCircle, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    setUser(currentUser);

    const progress = getProgress();
    const enrolled = courses.filter(course => progress[course.id]?.enrolled).map(course => {
      const courseProgress = progress[course.id];
      const percent = Math.round((courseProgress.completedModules.length / course.modules.length) * 100);
      return { ...course, progressInfo: courseProgress, percent };
    });
    setEnrolledCourses(enrolled);
  }, [navigate]);

  if (!user) return null;

  const totalCompleted = enrolledCourses.reduce((acc, c) => acc + (c.percent === 100 ? 1 : 0), 0);

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      {/* Profile Header */}
      <div className="glass-card" style={{ padding: '3rem', marginBottom: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '32px', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 800, color: 'white', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ marginBottom: '0.5rem', fontSize: '3rem' }}>{user.name}</h1>
            <p className="text-secondary" style={{ fontSize: '1.1rem' }}>{user.email}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div className="stat-card" style={{ textAlign: 'center', minWidth: '120px' }}>
            <div style={{ color: 'var(--brand-primary)', fontWeight: 800, fontSize: '1.5rem' }}>{enrolledCourses.length}</div>
            <div className="text-secondary" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Enrolled</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center', minWidth: '120px' }}>
            <div style={{ color: 'var(--brand-accent)', fontWeight: 800, fontSize: '1.5rem' }}>{totalCompleted}</div>
            <div className="text-secondary" style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Completed</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h2>My <span className="text-gradient">Learning Library</span></h2>
        {enrolledCourses.length > 0 && (
          <Link to="/courses" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Explore More</Link>
        )}
      </div>
      
      {enrolledCourses.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '6rem 2rem' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: 'var(--text-secondary)' }}>
            <BookOpen size={40} />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Your library is empty</h3>
          <p className="text-secondary" style={{ marginBottom: '3rem', maxWidth: '400px', margin: '0 auto 3rem auto' }}>Start your journey by enrolling in one of our professional grade courses.</p>
          <Link to="/courses" className="btn btn-primary" style={{ padding: '1rem 2,5rem' }}>Browse Curriculum</Link>
        </div>
      ) : (
        <div className="grid-cols-2">
          {enrolledCourses.map(course => (
            <div className="glass-card" key={course.id} style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                <img src={course.image} alt={course.title} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--glass-border)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {course.percent === 100 ? <CheckCircle size={16} color="var(--brand-accent)" /> : <Clock size={16} color="var(--brand-secondary)" />}
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: course.percent === 100 ? 'var(--brand-accent)' : 'var(--brand-secondary)', textTransform: 'uppercase' }}>
                      {course.percent === 100 ? 'Course Completed' : 'In Progress'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{course.title}</h3>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    {course.progressInfo.completedModules.length} of {course.modules.length} modules finished
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 600 }}>
                  <span className="text-secondary">Overall Completion</span>
                  <span className="text-gradient">{course.percent}%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-fill" style={{ width: `${course.percent}%` }}></div>
                </div>
              </div>

              {course.percent === 100 && course.progressInfo.score !== null ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--brand-accent)', fontWeight: 600 }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                      <Trophy size={20} />
                    </div>
                    Assessment Score
                  </div>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--brand-accent)' }}>{course.progressInfo.score}%</strong>
                </div>
              ) : null}

              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                <Link to={`/courses/${course.id}`} className="btn btn-primary" style={{ flex: 2 }}>
                  {course.percent === 100 ? 'Review curriculum' : (course.percent > 0 ? 'Resume Lesson' : 'Begin Journey')}
                </Link>
                {course.percent === 100 && course.progressInfo.score === null && (
                  <Link to={`/assessment/${course.id}`} className="btn btn-secondary" style={{ flex: 1, padding: '0.8rem' }}>
                    Take Quiz
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

