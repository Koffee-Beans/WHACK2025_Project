import { navigate } from "../index.js";

const HomeHTML = `
<div>
<header class="w-full py-6 bg-paleGray-50 shadow fixed top-0 left-0 z-40">
  <div class="max-w-6xl mx-auto flex justify-between items-center px-4">
    <h1 class="text-2xl font-bold text-white">EduLearn</h1>
    <nav class="space-x-6 text-lg">
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

<div id="mainContent"
     class="relative z-30 mt-[75vh] opacity-0 translate-y-20 transition-all duration-500">

  <!-- FIRST SECTION (animated) -->
  <section id="features"
           class="relative w-full mx-auto px-4 py-64 grid md:grid-cols-3 gap-10 bg-paleGray">

    <!-- Overlay Image bounded to the section -->
    <div class="absolute top-0 right-0 w-3/4 h-full z-0 overflow-hidden rounded-xl">
      <img 
        src="frontend/images/MathCover.png" 
        alt="Overlay Image"
        class="w-full h-full object-cover"
      >
    </div>

    <!-- Feature Cards -->
    <div class="p-6 bg-white shadow rounded-xl relative z-10">
      <h3 class="text-xl font-semibold mb-2">
        What if there was a faster way to improve in mathematics?
      </h3>
      <p class="text-gray-600">
        Your time is precious, so treat it as such. Instead of organizing thousands of practice problems 
        and keeping track of your progress, let us do the hard work for you
      </p>
    </div>
  </section>

  <!-- SECOND SECTION (no animations) -->
  <section id="moreContent"
           class="w-full px-4 py-40 bg-white text-center">
    <h2 class="text-4xl font-bold mb-6 text-gray-800">
      Don't just solve problems
    </h2>
    <div class="p-6 bg-white grid md:grid-cols-3 gap-10 shadow rounded-xl relative z-10">
      <h3 class="text-xl font-semibold mb-2">
        Access detailed step breakdowns of problems
      </h3>
      <h3 class="text-xl font-semibold mb-2">
      Track your progress overtime to see improvement
      </h3>
      <h3 class="text-xl font-semibold mb-2">
      Scan your work to understand exactly where 
      you went wrong and how you can improve in the future
      </h3>
    </div>
  </section>

  <section id="moreMoreContent"
  class="w-full px-4 py-40 bg-white text-center">

  <h2 class="text-4xl font-bold mb-6 text-gray-800">
    What are you waiting for?
  </h2>

  <a href="login/discord"
    class="px-10 py-4 text-2xl font-semibold bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">
    Start Improving Today
  </a>

</section>


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
  const mainContent = document.getElementById('mainContent');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // HERO FADE + SLIDE
    hero.style.transform = `translateY(-${scrollY * 0.5}px)`;
    hero.style.opacity = Math.max(1 - scrollY / 400, 0);

    const triggerPoint = 100;
    if (scrollY > triggerPoint) {
      const progress = Math.min((scrollY - triggerPoint) / 300, 1);
      mainContent.style.opacity = progress;
      mainContent.style.transform = `translateY(${20 - progress * 20}px)`;
    } else {
      mainContent.style.opacity = 0;
      mainContent.style.transform = "translateY(20px)";
    }
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