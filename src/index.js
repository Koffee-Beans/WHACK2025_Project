import Home from './pages/home.js';
import About from './pages/contact.js';
import './style.css';

const app = document.getElementById('app');

function router() {
  const hash = window.location.hash.replace('#', '');
  switch (hash) {
    case 'about':
      app.innerHTML = About;
      break;
    case 'home':
    default:
      Home(app);
      break;
  }
}

router();

window.addEventListener('hashchange', router);
