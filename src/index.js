import Home from './pages/home.js';
import Contact from './pages/contact.js';
import Login from './pages/login.js';
import Quiz from './pages/quiz.js';
import './style.css';

const app = document.getElementById('app');

function router() {
  const hash = window.location.hash.replace('#', '');
  switch (hash) {
    case 'contact':
      app.innerHTML = Contact;
      break;
    case 'login':
        app.innerHTML = Login;
        break;
    case 'quiz':
        Quiz(app);
        break;
    default:
      Home(app);
      break;
  }
}

router();

window.addEventListener('hashchange', router);
