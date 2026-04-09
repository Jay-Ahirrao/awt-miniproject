export const courses = [
  {
    id: 'c1',
    title: 'Advanced Web Development',
    description: 'Master modern web technologies including React, Node.js, and advanced UI design principles.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
    modules: [
      { id: 'm1', title: 'Introduction to React & Vite', duration: '45 min' },
      { id: 'm2', title: 'State Management Context', duration: '60 min' },
      { id: 'm3', title: 'Building the UI Design System', duration: '90 min' },
      { id: 'm4', title: 'Modern Routing', duration: '30 min' }
    ]
  },
  {
    id: 'c2',
    title: 'UX/UI Design Fundamentals',
    description: 'Learn how to create stunning, accessible, and responsive user interfaces that wow the user.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    modules: [
      { id: 'm1', title: 'Color Theory & Typography', duration: '40 min' },
      { id: 'm2', title: 'Wireframing in Figma', duration: '55 min' },
      { id: 'm3', title: 'Creating High-Fidelity Prototypes', duration: '120 min' }
    ]
  },
  {
    id: 'c3',
    title: 'Python for Data Science',
    description: 'A comprehensive guide to analyzing data, creating visualizations, and building machine learning models.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=600',
    modules: [
      { id: 'm1', title: 'Python Basics & NumPy', duration: '60 min' },
      { id: 'm2', title: 'Pandas for Data Cleaning', duration: '80 min' },
      { id: 'm3', title: 'Data Visualization with Matplotlib', duration: '75 min' }
    ]
  }
];

export const mockQuestions = [
  {
    id: 'q1',
    question: 'Which of the following is used for routing in React?',
    options: ['React Router', 'Redux', 'Axios', 'Vite'],
    correctAnswer: 0
  },
  {
    id: 'q2',
    question: 'In CSS, what property is used to create a glassmorphism effect?',
    options: ['opacity', 'backdrop-filter', 'box-shadow', 'filter'],
    correctAnswer: 1
  },
  {
    id: 'q3',
    question: 'Which built-in React Hook is used to manage local component state?',
    options: ['useContext', 'useEffect', 'useState', 'useRef'],
    correctAnswer: 2
  }
];
