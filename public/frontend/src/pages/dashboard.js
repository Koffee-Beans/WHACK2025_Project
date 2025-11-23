import { navigate } from "../index.js";

const DashboardHTML = `
<div class="bg-gray-100 font-sans">

  <div class="flex h-screen">

    <aside class="w-64 bg-white shadow-md flex flex-col">
      <div class="p-6 text-2xl font-bold text-blue-600">Analytics</div>
      <nav class="flex-1 px-4 space-y-2">
        <p class="block px-4 py-2 font-medium text-gray-700">Subjects</a>
        <hr>
        <a id="generalStats" class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700">General Stats</a>
        <a id="subjectA" class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700">Subject A</a>
        <a id="subjectB" class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700">Subject B</a>
        <a  id="subjectC" class="block px-4 py-2 rounded hover:bg-blue-50 font-medium text-gray-700">Subject C</a>
      </nav>
      <div class="p-6 border-t text-gray-500 text-sm">
        &copy; 2025 Analytics Inc.
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-auto">
      
      <header class="flex items-center justify-between bg-white p-4 shadow">
        <div class="text-xl font-semibold">Dashboard</div>
        <div class="flex items-center space-x-4">
          <input type="text" placeholder="Search..." class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div class="relative">
            <img src="https://i.pravatar.cc/32" alt="User Avatar" class="rounded-full">
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main id="dashboardContent" class="p-6 flex flex-col items-center space-y-6">
  <!-- Summary Cards -->
  <div id="summaryCards" class="flex justify-center items-center gap-4 w-full max-w-4xl">
    <div class="bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <div class="text-gray-500 text-sm">Lifetime questions correct</div>
      <div id="correctCount" class="text-2xl font-bold text-gray-800 mt-2">12,345</div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <div class="text-gray-500 text-sm">Lifetime questions incorrect</div>
      <div id="incorrectCount" class="text-2xl font-bold text-gray-800 mt-2">1,234</div>
    </div>
  </div>

  <!-- Charts Section -->
  <div class="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
    <div class="bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <div class="text-gray-700 font-semibold mb-2">User Growth</div>
      <div id="userGrowthChart" class="h-64 w-full bg-gray-100 rounded flex items-center justify-center text-gray-400">
        [Chart Placeholder]
      </div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <div class="text-gray-700 font-semibold mb-2">Revenue Trends</div>
      <div id="revenueChart" class="h-64 w-full bg-gray-100 rounded flex items-center justify-center text-gray-400">
        [Chart Placeholder]
      </div>
    </div>
  </div>

  <!-- Table Section -->
  <div class="bg-white p-6 rounded-lg shadow w-full max-w-4xl overflow-x-auto">
    <div class="text-gray-700 font-semibold mb-4 text-center">Recent Activity</div>
    <table id="activityTable" class="min-w-full divide-y divide-gray-200 text-center">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
          <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
          <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200" id="activityBody">
        <!-- Rows will be injected dynamically -->
      </tbody>
    </table>
  </div>
</main>


<!-- Chat Button -->
<button id="chatButton" class="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50">
  Chat
</button>

<!-- Draggable & Resizable Chat Overlay -->
<div id="chatOverlay" class="fixed bg-white transform translate-y-full opacity-0 transition-all duration-300 flex flex-col z-40 w-[400px] h-[500px] max-w-full max-h-full rounded-lg shadow-lg" style="bottom: 20px; right: 20px;">
  <!-- Header (Draggable) -->
  <div id="chatHeader" class="flex justify-between items-center bg-blue-600 text-white p-4 shadow-md cursor-move">
    <div class="text-lg font-semibold">Chat</div>
    <button id="closeChat" class="text-white text-2xl font-bold">&times;</button>
  </div>

  <!-- Chat Content -->
  <div id="chatContent" class="flex-1 p-4 overflow-auto">
    <p class="text-gray-700">Welcome! How can we help you today?</p>
  </div>

  <!-- Input Area -->
  <div class="p-4 border-t flex">
    <input id="chatInput" type="text" placeholder="Type a message..." class="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <button id="sendButton" class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Send</button>
  </div>

  <div id="resizeHandle" class="w-4 h-4 bg-blue-600 absolute bottom-0 right-0 cursor-nw-resize rounded-br-md"></div>
</div>


    </div>
  </div>

</div>
`

async function Dashboard(container) {
    container.innerHTML = DashboardHTML;

    const data = {
    'General Stats': {
      summary: { correct: '12,345', incorrect: '1,234' },
      charts: { userGrowth: '[General User Growth Chart]', revenue: '[General Revenue Chart]' },
      table: [
        { user: 'John Doe', activity: 'Logged In', date: 'Nov 22, 2025', status: 'Active', statusColor: 'green' },
        { user: 'Jane Smith', activity: 'Purchased Plan', date: 'Nov 21, 2025', status: 'Completed', statusColor: 'blue' },
        { user: 'Bob Johnson', activity: 'Logged Out', date: 'Nov 21, 2025', status: 'Inactive', statusColor: 'red' }
      ]
    },
    'Subject A': {
      summary: { correct: '1,000', incorrect: '200' },
      charts: { userGrowth: '[Subject A User Growth Chart]', revenue: '[Subject A Revenue Chart]' },
      table: [
        { user: 'Alice', activity: 'Completed Quiz', date: 'Nov 22, 2025', status: 'Active', statusColor: 'green' },
        { user: 'Tom', activity: 'Missed Assignment', date: 'Nov 21, 2025', status: 'Inactive', statusColor: 'red' }
      ]
    },
    'Subject B': {
      summary: { correct: '750', incorrect: '100' },
      charts: { userGrowth: '[Subject B User Growth Chart]', revenue: '[Subject B Revenue Chart]' },
      table: [
        { user: 'Mary', activity: 'Logged In', date: 'Nov 22, 2025', status: 'Active', statusColor: 'green' },
        { user: 'Steve', activity: 'Completed Quiz', date: 'Nov 21, 2025', status: 'Completed', statusColor: 'blue' }
      ]
    },
    'Subject C': {
      summary: { correct: '500', incorrect: '50' },
      charts: { userGrowth: '[Subject C User Growth Chart]', revenue: '[Subject C Revenue Chart]' },
      table: [
        { user: 'Liam', activity: 'Logged In', date: 'Nov 22, 2025', status: 'Active', statusColor: 'green' },
        { user: 'Emma', activity: 'Missed Quiz', date: 'Nov 21, 2025', status: 'Inactive', statusColor: 'red' }
      ]
    }
  };

  const generalLink = document.getElementById('generalStats');
  const subjectALink = document.getElementById('subjectA');
  const subjectBLink = document.getElementById('subjectB');
  const subjectCLink = document.getElementById('subjectC');

  const generalContent = document.getElementById('generalContent');
  const subjectContent = document.getElementById('subjectContent');

  const correctCount = document.getElementById('correctCount');
  const incorrectCount = document.getElementById('incorrectCount');
  const userGrowthChart = document.getElementById('userGrowthChart');
  const revenueChart = document.getElementById('revenueChart');
  const activityBody = document.getElementById('activityBody');

    const chatButton = document.getElementById('chatButton');
  const chatOverlay = document.getElementById('chatOverlay');
  const closeChat = document.getElementById('closeChat');
  const sendButton = document.getElementById('sendButton');
  const chatContent = document.getElementById('chatContent');

  chatButton.addEventListener('click', () => {
    chatButton.classList.add('hidden');
    chatOverlay.classList.remove('translate-y-full', 'opacity-0');
  });

  closeChat.addEventListener('click', () => {
    chatButton.classList.remove('hidden');
    chatOverlay.classList.add('translate-y-full', 'opacity-0');
  });

  let isDragging = false;
  let dragStartX, dragStartY, overlayStartX, overlayStartY;

  chatHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    const rect = chatOverlay.getBoundingClientRect();
    overlayStartX = rect.left;
    overlayStartY = rect.top;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'move';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    let newLeft = overlayStartX + dx;
    let newTop = overlayStartY + dy;

    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - chatOverlay.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - chatOverlay.offsetHeight));

    chatOverlay.style.left = newLeft + 'px';
    chatOverlay.style.top = newTop + 'px';
    chatOverlay.style.right = 'auto';
    chatOverlay.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  });

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = chatOverlay.offsetWidth;
    startHeight = chatOverlay.offsetHeight;
    document.body.style.cursor = 'se-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    let newWidth = startWidth + dx;
    let newHeight = startHeight + dy;

    newWidth = Math.max(300, Math.min(newWidth, window.innerWidth));
    newHeight = Math.max(300, Math.min(newHeight, window.innerHeight));

    chatOverlay.style.width = newWidth + 'px';
    chatOverlay.style.height = newHeight + 'px';
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });

    let messages = [];
  async function renderMessages() {
    chatContent.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      if(msg.id == 0){
        div.className = 'px-3 py-2 mb-2 mr-auto rounded bg-gray-100 self-start max-w-[80%] break-words';
      }
      else{
        div.className = 'px-3 py-2 mb-2 ml-auto rounded bg-blue-500 text-white max-w-[80%] break-words ml-auto';
      }
      div.textContent = msg.message.text;
      chatContent.appendChild(div);
    });
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    const msgObj = { text, timestamp: new Date().toISOString() };
    messages.push({message : msgObj, id: 0});
    messages.push({message : { text: '...', timestamp: new Date().toISOString() }, id: 1});
    renderMessages();
    chatInput.value = '';
    chatInput.disabled = true;
    const data = await sendMessageToGemini(text);
    messages[messages.length-1] = {message : { text: data, timestamp: new Date().toISOString() }, id: 1}
    renderMessages();
    chatInput.disabled = false;
  }

  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });


    async function sendMessageToGemini(query) {
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: query }),
  });
  const data = await res.json();
  return data.reply;
    }

  function updateDashboard(subject) {
    const d = data[subject];

    correctCount.textContent = d.summary.correct;
    incorrectCount.textContent = d.summary.incorrect;

    userGrowthChart.textContent = d.charts.userGrowth;
    revenueChart.textContent = d.charts.revenue;

    document.querySelectorAll('aside nav a').forEach(link => {
        if(link.textContent.trim() == subject){
            console.log("HIT!")
            link.classList.remove("font-medium");
            link.classList.add("font-bold");
        }
        else{
            link.classList.remove("font-bold");
            link.classList.add("font-medium");
        }
    });

    activityBody.innerHTML = '';
    d.table.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${row.user}</td>
        <td class="px-6 py-4 whitespace-nowrap">${row.activity}</td>
        <td class="px-6 py-4 whitespace-nowrap">${row.date}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${row.statusColor}-100 text-${row.statusColor}-800">${row.status}</span>
        </td>
      `;
      activityBody.appendChild(tr);
    });
  }

  document.querySelectorAll('aside nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const subject = link.textContent.trim();
      updateDashboard(subject);
    });
  });

  updateDashboard('General Stats');
}

export default Dashboard;