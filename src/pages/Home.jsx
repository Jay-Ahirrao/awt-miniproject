import { Link } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Trophy, Zap, Shield, Globe } from 'lucide-react';
import { courses } from '../utils/mockData';

export default function Home({ platformName }) {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container" style={{ padding: '8rem 0 6rem 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: -1 }}></div>
        
        <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-float" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '100px', color: 'var(--brand-secondary)', fontWeight: 600, marginBottom: '2rem', fontSize: '0.9rem' }}>
            <Zap size={18} fill="currentColor" /> Next Gen Learning Experience
          </div>
          
          <h1 style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '2rem' }}>
            Master the Future with <span className="text-gradient">{platformName}</span>
          </h1>
          
          <p className="text-secondary" style={{ fontSize: '1.4rem', maxWidth: '700px', margin: '0 auto 3.5rem auto', lineHeight: 1.5 }}>
            Advanced interactive curriculum designed by industry experts. Track your journey, validate your skills, and join the elite.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <Link to="/courses" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Curriculum <ArrowRight size={22} />
            </Link>
            <Link to="/auth" className="btn btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <div className="grid-cols-3">
          {[
            { icon: <Globe size={32} />, title: "Expert Content", desc: "Curated by top-tier engineers and designers worldwide.", color: "var(--brand-primary)" },
            { icon: <Shield size={32} />, title: "Skill Validation", desc: "Comprehensive assessments to certify your expertise.", color: "var(--brand-secondary)" },
            { icon: <Zap size={32} />, title: "Rapid Growth", desc: "Accelerated learning paths to get you job-ready faster.", color: "var(--brand-accent)" }
          ].map((feature, i) => (
            <div key={i} className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ width: '70px', height: '70px', background: `rgba(255, 255, 255, 0.03)`, border: `1px solid rgba(255, 255, 255, 0.1)`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: feature.color }}>
                {feature.icon}
              </div>
              <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
              <p className="text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container" style={{ marginBottom: '8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>Premium <span className="text-gradient">Curriculum</span></h2>
            <p className="text-secondary">Selected courses to kickstart your career.</p>
          </div>
          <Link to="/courses" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            View all courses <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid-cols-3">
          {featuredCourses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} style={{ color: 'inherit' }}>
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative' }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', height: '240px', objectFit: 'cover', borderBottom: '1px solid var(--glass-border)' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)' }}>
                    {course.modules.length} Lessons
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{course.title}</h3>
                  <p className="text-secondary" style={{ marginBottom: '2rem', height: '3rem', overflow: 'hidden' }}>{course.description}</p>
                  <div className="btn btn-secondary btn-full">Learn More</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

