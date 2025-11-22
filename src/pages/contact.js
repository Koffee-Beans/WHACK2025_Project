const Contact = `
  <header class="w-full py-6 bg-white shadow">
    <div class="max-w-6xl mx-auto flex justify-between items-center px-4">
      <h1 class="text-2xl font-bold">EduLearn</h1>
      <nav class="space-x-6 text-lg">
        <a href="index.html#features" class="hover:text-blue-600">Features</a>
        <a href="index.html#courses" class="hover:text-blue-600">Courses</a>
        <a href="#contact" class="hover:text-blue-600">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Contact Section -->
  <section id="contact" class="max-w-6xl mx-auto px-4 py-20">
    <h2 class="text-4xl font-bold mb-6 text-center">Get in Touch</h2>
    <p class="text-lg mb-12 text-gray-600 text-center">
      Have questions or suggestions? Fill out the form below and we'll get back to you!
    </p>

    <div class="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>
        <div>
          <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" placeholder="your@email.com" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
        </div>
        <div>
          <label for="message" class="block text-gray-700 font-medium mb-2">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="Write your message..." class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-6 text-center mt-10">
    <p>© 2025 EduLearn. All rights reserved.</p>
  </footer>
`;

export default Contact;
