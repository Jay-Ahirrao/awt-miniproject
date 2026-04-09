const USER_KEY = 'elearning_user';
const PROGRESS_KEY = 'elearning_progress';

// Auth State
export const loginUser = (name, email) => {
  const user = { name, email, loggedInAt: new Date().toISOString() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUser = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

// Progress State
export const getProgress = () => {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
};

// e.g., progress = { 'c1': { enrolled: true, completedModules: ['m1', 'm2'], score: 85 } }
export const enrollCourse = (courseId) => {
  const progress = getProgress();
  if (!progress[courseId]) {
    progress[courseId] = { enrolled: true, completedModules: [], score: null };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
};

export const completeModule = (courseId, moduleId) => {
  const progress = getProgress();
  if (progress[courseId] && !progress[courseId].completedModules.includes(moduleId)) {
    progress[courseId].completedModules.push(moduleId);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
};

export const saveAssessmentScore = (courseId, score) => {
  const progress = getProgress();
  if (progress[courseId]) {
    progress[courseId].score = score;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
};
