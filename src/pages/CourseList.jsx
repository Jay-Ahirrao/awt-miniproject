import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courses } from '../utils/mockData';
import { enrollCourse, getUser, getProgress } from '../utils/storage';
import { Search, Loader } from 'lucide-react';

export default function CourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserProgress(getProgress());
    }
  }, [user]);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setLoading(courseId);
    setTimeout(() => {
      enrollCourse(courseId);
      setUserProgress(getProgress());
      setLoading(false);
      navigate(`/courses/${courseId}`);
    }, 600);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ marginBottom: 0 }}>Course <span className="text-gradient">Catalog</span></h1>
        
        <div style={{ position: 'relative', minWidth: '300px' }}>
          <Search size={20} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: '3rem', borderRadius: 'var(--radius-lg)' }} 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid-cols-3">
        {filteredCourses.map(course => {
          const isEnrolled = userProgress[course.id]?.enrolled;
          
          return (
            <div className="glass-card" key={course.id} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img src={course.image} alt={course.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{course.title}</h3>
                </div>
                
                <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                  {course.description}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span>{course.modules.length} Modules</span>
                  <span>Premium Quality</span>
                </div>

                {isEnrolled ? (
                  <Link to={`/courses/${course.id}`} className="btn btn-secondary btn-full">Continue Learning</Link>
                ) : (
                  <button 
                    className="btn btn-primary btn-full" 
                    onClick={() => handleEnroll(course.id)}
                    disabled={loading === course.id}
                  >
                    {loading === course.id ? <Loader className="animate-spin" size={20} /> : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center text-secondary" style={{ padding: '4rem' }}>
          <h3>No courses found matching your search.</h3>
        </div>
      )}
    </div>
  );
}
