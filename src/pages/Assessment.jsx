import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockQuestions, courses } from '../utils/mockData';
import { getUser, getProgress, saveAssessmentScore } from '../utils/storage';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';

export default function Assessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      navigate('/auth');
      return;
    }
    const userProgress = getProgress();
    if (!userProgress[id]?.enrolled || userProgress[id]?.completedModules.length !== course?.modules.length) {
      // Must be enrolled and completed all modules
      navigate(`/courses/${id}`);
    } else if (userProgress[id]?.score !== null) {
      // Already taken the assessment
      setScore(userProgress[id].score);
      setShowResults(true);
    }
  }, [id, navigate, course]);

  if (!course) return null;

  const handleSelect = (optionIndex) => {
    if (showResults) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct += 1;
      }
    });
    const finalScore = Math.round((correct / mockQuestions.length) * 100);
    setScore(finalScore);
    saveAssessmentScore(id, finalScore);
    setShowResults(true);
  };

  if (showResults) {
    const passed = score >= 50;
    
    return (
      <div className="container animate-fade-in" style={{ paddingTop: '4rem', maxWidth: '800px' }}>
        <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
          <div style={{ 
            width: '100px', height: '100px', 
            background: passed ? 'rgba(20, 184, 166, 0.1)' : 'rgba(236, 72, 153, 0.1)', 
            borderRadius: '50%', margin: '0 auto 2rem auto', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: passed ? 'var(--brand-accent)' : 'var(--brand-secondary)'
          }}>
            <Award size={50} />
          </div>
          
          <h1 style={{ marginBottom: '1rem' }}>{passed ? 'Congratulations!' : 'Keep Learning!'}</h1>
          <p className="text-secondary" style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            You have completed the assessment for <br/><strong style={{ color: 'white' }}>{course.title}</strong>
          </p>
          
          <div style={{ fontSize: '4rem', fontWeight: 800, color: passed ? 'var(--brand-accent)' : 'var(--brand-secondary)', marginBottom: '3rem' }}>
            {score}%
          </div>
          
          <Link to="/dashboard" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];
  const hasAnsweredCurrent = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem', maxWidth: '800px' }}>
      <Link to={`/courses/${id}`} className="btn" style={{ background: 'transparent', padding: 0, marginBottom: '2rem', display: 'inline-flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Course
      </Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: 600, color: 'var(--brand-primary)' }}>
        <span>Assessment: {course.title}</span>
        <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
      </div>
      
      <div className="progress-container mb-4" style={{ marginBottom: '3rem' }}>
        <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}></div>
      </div>

      <div className="glass-card" style={{ padding: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>{question.question}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index;
            
            return (
              <button 
                key={index} 
                onClick={() => handleSelect(index)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  fontSize: '1.1rem',
                  color: isSelected ? 'var(--brand-primary)' : 'white',
                  background: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                  border: isSelected ? '1px solid var(--brand-primary)' : '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span>{option}</span>
                {isSelected && <CheckCircle size={24} className="text-gradient" />}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            style={{ padding: '0.75rem 2.5rem' }}
          >
            {currentQuestion < mockQuestions.length - 1 ? 'Next Question' : 'Submit Assessment'}
          </button>
        </div>
      </div>
    </div>
  );
}
