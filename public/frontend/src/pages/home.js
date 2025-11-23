import { navigate } from "../index.js";

const HomeHTML = `
<div>
<header class="w-full py-6 bg-paleGray-50 shadow fixed top-0 left-0 z-40">
  <div class="max-w-6xl mx-auto flex justify-between items-center px-4">
    <h1 class="text-2xl font-bold text-white">EduLearn</h1>
    <nav class="space-x-6 text-lg">
      <a href="home" class="text-white hover:text-blue-600">Home</a>
      <a href="contact" class="text-white hover:text-blue-600">Contact</a>
      <a href="login/discord" class="text-white hover:text-blue-600">Login</a>
    </nav>
  </div>
</header>

<!-- HERO background -->
<div class="fixed inset-0 bg-blueblur
            bg-cover bg-center bg-fixed z-0 overflow-y-scroll"></div>

<!-- HERO text -->
<section id="heroText"
         class="fixed inset-0 flex flex-col justify-center items-center text-center px-4 z-20">
  <h2 class="text-8xl font-bold mb-6 text-white drop-shadow transform transition-transform duration-300">
    Solve math smarter, not harder
  </h2>
  <p class="text-lg mb-8 text-gray-200 drop-shadow transform transition-transform duration-300">
    Learn how to solve math problems fast, find areas of improvement, and build solving skills for the long term
  </p>
  <a href="login/discord" id="discordLogin"
          class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
    Sign up with Discord
  </a>
</section>

<!-- MAIN CONTENT -->
<div class="relative z-30 mt-[75vh]">
  <section id="features"
           class="w-screen mx-auto px-4 py-32 grid md:grid-cols-3 gap-10 bg-white">
    <div class="p-6 bg-white shadow rounded-xl">
      <h3 class="text-xl font-semibold mb-2">Expert Instructors</h3>
      <p class="text-gray-600">Learn from industry professionals with years of experience.</p>
    </div>
    <div class="p-6 bg-white shadow rounded-xl">
      <h3 class="text-xl font-semibold mb-2">Curated Courses</h3>
      <p class="text-gray-600">Access structured and comprehensive educational resources.</p>
    </div>
    <div class="p-6 bg-white shadow rounded-xl">
      <h3 class="text-xl font-semibold mb-2">Flexible Learning</h3>
      <p class="text-gray-600">Study at your own pace with our flexible learning options.</p>
    </div>
  </section>

  <footer class="bg-gray-900 text-white py-6 text-center mt-10">
    <p>© 2025 EduLearn. All rights reserved.</p>
  </footer>
</div>
</div>
`;

// Function to render Home and attach listeners
function Home(container) {
  container.innerHTML = HomeHTML;
  const contactLink = container.querySelector('a[href="contact"]');
  const discordLogin = document.getElementById('discordLogin');
  //const loginLink = container.querySelector('button[href="login/discord"]');
  const hero = document.getElementById('heroText');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(-${scrollY * 0.5}px)`;
    console.log(scrollY);
    hero.style.opacity = Math.max(1 - scrollY / 400, 0);
  });
  if (contactLink) {
    contactLink.addEventListener('click', async (e) => {
      e.preventDefault();
      navigate('/contact');
    });
  }
  /*
  if(discordLogin){
    discordLogin.addEventListener('click', async (e) => {
      e.preventDefault();
      navigate('/login/discord');
      /*
      window.location.hash = 'login';
     const formData = new FormData(e.target);
     */
    /*
    await fetch('/login', {
      method: 'POST',
      body: formData
    });
    })
  }*/
}

export default Home;