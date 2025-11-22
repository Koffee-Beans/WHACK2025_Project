const Login = `
<div class="bg-gray-100 flex items-center justify-center min-h-screen">

  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
    
    <form action="#" method="POST" class="space-y-5">
      <div>
        <label for="username" class="block text-gray-700 mb-2">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" 
               class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
      </div>

      <div>
        <label for="password" class="block text-gray-700 mb-2">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" 
               class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
      </div>

      <button type="submit" 
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">Login</button>

      <div class="text-right">
        <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
      </div>
    </form>
  </div>

</div>
`

export default Login;