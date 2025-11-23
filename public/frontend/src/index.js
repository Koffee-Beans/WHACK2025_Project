import Home from './pages/home.js';
import Contact from './pages/contact.js';
import Login from './pages/login.js';
import Quiz from './pages/quiz.js';
import Dashboard from './pages/dashboard.js';

const app = document.getElementById('app');

function getPath() {
  let path = window.location.pathname;

  const valid = ['/contact', '/login', '/quiz', '/dashboard', '/'];
  if (!valid.includes(path)) {
    window.history.replaceState({}, '/', '/');
    path = '/';
  }

  return path;
}

function router() {
  const path = getPath();

  switch (path) {
    case '/contact':
      console.log("run");
      app.innerHTML = Contact;
      break;
    case '/login/discord':
      console.log("idk");
      app.innerHTML = Login;
      break;
    case '/quiz':
      Quiz(app);
      break;
    case '/dashboard':
      Dashboard(app);
      break;
    default:
      Home(app);
      break;
  }
}

export function navigate(path) {
  window.history.pushState({}, path, path);
  router();
}

window.addEventListener('popstate', router);

router();
