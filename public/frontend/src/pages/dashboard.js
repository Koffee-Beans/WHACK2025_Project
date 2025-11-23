import { navigate } from "../index.js";

const DashboardHTML = `
<div class="fixed inset-0 bg-blueblur bg-cover bg-center bg-fixed z-0">

  <div class="relative z-10 font-sans">

    <div class="flex h-screen">

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-auto">

        <header class="flex items-center justify-between bg-paleGray-50 p-4 shadow">
          <div class="text-white text-xl font-semibold">Dashboard</div>
          <div class="flex items-center space-x-4">
            <a href="/quiz" class="text-white bg-paleGray hover:bg-darkBlue px-3 py-2 border rounded-md">Take a Quiz</a>
            <a href="/login/logout" class="text-white bg-paleGray hover:bg-darkBlue px-3 py-2 border rounded-md">Sign Out</a>
          </div>
        </header>

        <!-- Greeting Header -->
        <div class="w-full flex flex-col items-center justify-center text-center mt-10">
          <h1 id="username" class="text-4xl font-bold text-white drop-shadow-md">
            Welcome back, <span id="greetingName"></span>!
          </h1>
          <p class="text-lg text-gray-200 mt-2 drop-shadow">
            Here's your latest stats
          </p>
        </div>

        <!-- Dashboard Content -->
        <main class="p-6 flex flex-col items-center space-y-6">

          <!-- Summary Cards -->
          <div class="flex justify-center items-center gap-4 w-full max-w-4xl">
            <div class="bg-lightBlue p-6 rounded-lg shadow flex flex-col items-center">
              <div class="text-sm">Lifetime questions correct</div>
              <div id="correctQ" class="text-2xl font-bold text-gray-800 mt-2">12,345</div>
            </div>
            <div class="bg-lightBlue p-6 rounded-lg shadow flex flex-col items-center">
              <div class="text-sm">Lifetime questions played</div>
              <div id="playedQ" class="text-2xl font-bold text-gray-800 mt-2">1,234</div>
            </div>
          </div>

          <!-- Table Section -->
          <div class="bg-lightBlue p-6 rounded-lg shadow w-full max-w-4xl overflow-x-auto">
            <div class="text-gray-700 font-semibold mb-4 text-center">Recent Activity</div>
            <table class="min-w-full text-center">
              <thead class="bg-paleGray-50">
                <tr>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Data</th>
                </tr>
              </thead>
              <tbody id="qTable" class="bg-lightBlue divide-y divide-paleGray-50">
              </tbody>
            </table>
          </div>

        </main>

        <!-- Chat Button -->
        <button id="chatButton" class="fixed bottom-6 right-6 bg-lightBlue p-4 rounded-full shadow-lg hover:text-white focus:outline-none z-50">
  Chat
</button>

        <!-- Draggable & Resizable Chat Overlay -->
<div id="chatOverlay" class="fixed transform translate-y-full opacity-0 transition-all duration-300 z-50 pointer-events-none flex flex-col w-[400px] h-[500px] max-w-full max-h-full rounded-lg shadow-lg" style="bottom: 20px; right: 20px;">
  <!-- Header (Draggable) -->
  <div id="chatHeader" class="flex justify-between items-center bg-darkBlue text-white p-4 shadow-md cursor-move">
    <div class="text-lg font-semibold">Chat</div>
    <button id="closeChat" class="text-white text-2xl font-bold">&times;</button>
  </div>

  <!-- Chat Content -->
  <div id="chatContent" class="flex-1 p-4 overflow-auto bg-white"></div>

  <!-- Input Area -->
  <div class="p-4 border-t flex bg-paleGray">
    <input id="chatInput" type="text" placeholder="Type a message..." class="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <button id="sendButton" class="bg-darkBlue text-paleGray px-4 py-2 rounded-r-md hover:text-white">Send</button>
  </div>

  <div id="resizeHandle" class="w-4 h-4 bg-blue-600 absolute bottom-0 right-0 cursor-nw-resize rounded-br-md"></div>
</div>



<div id="quizModalOverlay" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 opacity-0 pointer-events-none transition-opacity duration-300">
  <div id="quizModal" class="bg-white rounded-lg shadow-lg p-6 w-100 h-fit max-w-full relative text-center transform translate-y-12 opacity-0 transition-all duration-300 pointer-events-auto">
    <!-- Close Button -->
    <button id="closeQuizModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg">
      &times;
    </button>

    <!-- Header -->
    <h2 id="question" class="text-2xl font-medium text-center">Test</h2>
    <hr>
    <!-- Subtext -->
    <p id="questionAnswers" class="text-gray-600 mb-6">Test answer</p>
    
    <!-- Buttons -->
    <div class="flex justify-between">
      <button id="prevBtn" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
        Previous
      </button>
      <button id="nextBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Next
      </button>
    </div>
  </div>
</div>






      </div>

    </div>
  </div>
</div>
`;

async function Dashboard(container) {
  container.innerHTML = DashboardHTML;
  
  // --- USER DATA ---
  let userData = [];
  try {
    const response = await fetch('/api/current-user');
    if (!response.ok) throw new Error('Failed to fetch user');
    const discordObj = await response.json();
    const userFetch = await fetch(`/api/user/${discordObj.discordId}`);
    userData = await userFetch.json();
  } catch (error) {
    console.error('Error loading user:', error);
    return;
  }
  document.getElementById('username').textContent = "Welcome back " + userData.username + "!";
  document.getElementById('correctQ').textContent = userData.statistics.correct;
  document.getElementById('playedQ').textContent = userData.statistics.played;

  console.log(userData);

  const questionDatas = [];
  userData.statistics.quizHistory.forEach(q => {
    questionDatas.push(q);
  });
  console.log(questionDatas);
  //const questions = userData.statistics.problemHistory

  // --- CHAT ---
  const chatButton = document.getElementById('chatButton');
  const chatOverlay = document.getElementById('chatOverlay');
  const closeChat = document.getElementById('closeChat');
  const sendButton = document.getElementById('sendButton');
  const chatContent = document.getElementById('chatContent');
  const chatInput = document.getElementById('chatInput');

  const qTable = document.getElementById('qTable');
  const questionText = document.getElementById('question');

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  let qNumber = 0;
  /*
  class="px-6 py-4 whitespace-nowrap"
  */

  questionDatas.forEach(q => {
    const tempTr = document.createElement('tr');
    for(let i = 0; i < 3; i++){
      const tempTd = document.createElement('td');
      tempTd.classList = "px-6 py-4 whitespace-nowrap";
      if(i == 0){
        tempTd.innerText = q.score + "/30";
      }
      else if(i == 1){
        tempTd.innerText = q.date.substring(0, q.date.indexOf('T')) + " at " + q.date.substring(q.date.indexOf('T') + 1, q.date.indexOf('T') + 6);
      }
      else{
        tempTd.innerHTML = `<button id="viewQuiz${questionDatas.indexOf(q)}" class="viewQuizBtn px-6 bg-midBlue text-white rounded-full">View this quiz</button>`;
      }
      tempTr.appendChild(tempTd);
    }
    qTable.appendChild(tempTr);
  });

  let questionSet = [];

  const tempDiv = document.createElement('div');
  tempDiv.classList = "text-gray-700";
  tempDiv.textContent = "Welcome back " + userData.username + "! How may I assist you?";
  chatContent.appendChild(tempDiv);

chatButton.addEventListener('click', () => {
  chatButton.classList.add('hidden');
  chatOverlay.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
  chatOverlay.classList.add('pointer-events-auto'); // Enable interactions
});

closeChat.addEventListener('click', () => {
  chatButton.classList.remove('hidden');
  chatOverlay.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none'); // Disable interactions
  chatOverlay.classList.remove('pointer-events-auto');
});


  // --- DRAG & RESIZE CHAT ---
  const chatHeader = document.getElementById('chatHeader');
  const resizeHandle = document.getElementById('resizeHandle');

  let isDragging = false, dragStartX, dragStartY, overlayStartX, overlayStartY;
  chatHeader.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    const rect = chatOverlay.getBoundingClientRect();
    overlayStartX = rect.left;
    overlayStartY = rect.top;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'move';
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    chatOverlay.style.left = Math.max(0, Math.min(overlayStartX + dx, window.innerWidth - chatOverlay.offsetWidth)) + 'px';
    chatOverlay.style.top = Math.max(0, Math.min(overlayStartY + dy, window.innerHeight - chatOverlay.offsetHeight)) + 'px';
    chatOverlay.style.right = 'auto';
    chatOverlay.style.bottom = 'auto';
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  });

  let isResizing = false, startX, startY, startWidth, startHeight;
  resizeHandle.addEventListener('mousedown', e => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = chatOverlay.offsetWidth;
    startHeight = chatOverlay.offsetHeight;
    document.body.style.cursor = 'se-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!isResizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    chatOverlay.style.width = Math.max(300, Math.min(startWidth + dx, window.innerWidth)) + 'px';
    chatOverlay.style.height = Math.max(300, Math.min(startHeight + dy, window.innerHeight)) + 'px';
  });
  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });

  // --- CHAT MESSAGES ---
  let messages = [];
  function renderMessages() {
  chatContent.innerHTML = '';

  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = msg.id === 1 
      ? 'px-3 py-2 rounded bg-gray-100 self-start max-w-[80%] break-words ml-auto mb-2'
      : 'px-3 py-2 rounded bg-blue-500 text-white max-w-[80%] break-words mr-auto mb-2';
    
    let messageText = msg.message.text;
    
    messageText = messageText.replace(/\$(.*?)\$/g, (match, latex) => {
      const span = document.createElement('span');
      try {
        katex.render(latex, span, {
          throwOnError: false,
          displayMode: false,
        });
        return span.outerHTML;
      } catch (e) {
        return match;
      }
    });

    messageText = messageText.replace(/\$\$(.*?)\$\$/g, (match, latex) => {
      const div = document.createElement('div');
      try {
        katex.render(latex, div, {
          throwOnError: false,
          displayMode: true,
        });
        return div.outerHTML;
      } catch (e) {
        return match;
      }
    });

    div.innerHTML = messageText;
    chatContent.appendChild(div);
  });
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    messages.push({message: {text, timestamp: new Date().toISOString()}, id: 0});
    messages.push({message: {text: '...', timestamp: new Date().toISOString()}, id: 1});
    renderMessages();
    chatInput.disabled = true;
    chatInput.value = '';
    if(questionSet.length == 0){
        messages[messages.length-1] = {message: {text: await sendMessageToGemini(text), timestamp: new Date().toISOString()}, id: 1};
    }
    else{
      const solutions = questionSet.problems[qNumber].solutions.join('\n');
      const fullPrompt = `Respond to the following question using the problem and solutions given. The problem will be labeled 'this is the problem', the solutions will be labeled 'these are the solutions' and the question will be labeled 'this is the question': this is the problem:  ${questionSet.problems[qNumber].problem}, these are the solutions: ${solutions},  this is the question: ` + text + ', try to guide the asker of the question using one of the solutions as reference if they are on the right track.';
      messages[messages.length-1] = {message: {text: await sendMessageToGemini(fullPrompt), timestamp: new Date().toISOString()}, id: 1};
    }
    renderMessages();
    chatInput.disabled = false;
  }
  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
  async function sendMessageToGemini(query) {
    const urlResponse = await fetch('/api/gemini-url');
    if (!urlResponse.ok) {
      throw new Error('Failed to fetch Gemini URL');
    }
    const { geminiUrl } = await urlResponse.json();
    const res = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: query }),
    });
    const data = await res.json();
    return data.reply;
  }

  // --- QUIZ MODAL ---
  const quizButtons = container.querySelectorAll('.viewQuizBtn');
  const quizModalOverlay = document.getElementById('quizModalOverlay');
  const closeQuizModal = document.getElementById('closeQuizModal');
  const quizContent = document.getElementById('quizContent');
  const questionAnswers = document.getElementById('questionAnswers');

quizButtons.forEach(button => {
  button.addEventListener('click', () => {
    const index = parseInt(button.id.replace('viewQuiz', ''), 10);
    questionSet = questionDatas[index];
    qNumber = 0;
    renderQuizModalQ();

    quizModalOverlay.classList.remove('opacity-0', 'pointer-events-none');
    quizModal.classList.remove('translate-y-12', 'opacity-0');
    quizModal.classList.add('pointer-events-auto'); // enable modal interaction
  });
});

nextBtn.addEventListener('click', () =>{
  if(qNumber < 4){
    qNumber++;
    renderQuizModalQ();
  }
})
prevBtn.addEventListener('click', () =>{
  if(qNumber > 0){
    qNumber--;
    renderQuizModalQ();
  }
})

function closeQuizModalFunc() {
  quizModal.classList.add('translate-y-12', 'opacity-0');
  quizModal.classList.remove('pointer-events-auto');
  quizModal.classList.add('pointer-events-none');

  quizModalOverlay.classList.add('opacity-0', 'pointer-events-none');
  questionSet = [];
}



function renderQuizModalQ(){
  questionText.innerHTML=questionSet.problems[qNumber].problem;
  const answer = questionSet.problems[qNumber].answers[questionSet.problems[qNumber].correctAnswer.toLowerCase()];
  questionAnswers.innerHTML= "The correct answer is " + answer + " and you chose " + (answer == questionSet.choices[qNumber] ? "correctly!" : ("incorrectly with " + questionSet.choices[qNumber]));
  console.log(questionSet.problems[qNumber].correctAnswer.toLowerCase());
}

closeQuizModal.addEventListener('click', closeQuizModalFunc);
quizModalOverlay.addEventListener('click', e => {
  if (e.target === quizModalOverlay) closeQuizModalFunc();
});

}

export default Dashboard;