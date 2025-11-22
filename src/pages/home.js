const HomeHTML = `
  <header class="w-full py-6 bg-white shadow">
    <div class="max-w-6xl mx-auto flex justify-between items-center px-4">
      <h1 class="text-2xl font-bold">EduLearn</h1>
      <nav class="space-x-6 text-lg">
        <a href="#home" class="hover:text-blue-600">Home</a>
        <a href="#about" class="hover:text-blue-600">About</a>
        <a href="#features" class="hover:text-blue-600">Features</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h2 class="text-4xl font-bold mb-6">Empower Your Learning Journey</h2>
    <p class="text-lg mb-8 text-gray-600">
      Access high-quality courses and learning materials to achieve your goals.
    </p>
    <button id="getStartedBtn" class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
      Get Started
    </button>
  </section>

  <!-- Features Section -->
  <section id="features" class="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-10">
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

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-6 text-center mt-10">
    <p>© 2025 EduLearn. All rights reserved.</p>
  </footer>
`;

// Function to render Home and attach listeners
function Home(container) {
  container.innerHTML = HomeHTML;

  // Add button listener to route to About page
  const getStartedBtn = document.getElementById('getStartedBtn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      window.location.hash = 'about';
    });
  }

  // Optional: Attach About link listener
  const aboutLink = container.querySelector('a[href="#about"]');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = 'about';
    });
  }
}

export default Home;
