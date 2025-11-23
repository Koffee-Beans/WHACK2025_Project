const QuizHTML = `
<div class="w-screen h-screen bg-gray-100 flex flex-col">

  <!-- Header -->
  <header class="flex justify-between items-center bg-white shadow-md p-6">
    <h1 class="text-3xl font-bold">Quiz Time!</h1>
    <div class="text-xl font-semibold">
      Time: <span id="timer">60</span>s
    </div>
  </header>

  <!-- Quiz content -->
  <main class="flex-1 flex flex-col justify-center items-center p-6">
    <div id="quiz-container" class="w-full max-w-4xl flex flex-col gap-6">

      <!-- Question progress indicators -->
      <div id="question-progress" class="flex justify-center gap-2 mb-4">
        <!-- Boxes will be generated dynamically via JS -->
      </div>

      <!-- Question -->
      <div id="question" class="text-2xl font-medium text-center"></div>

      <!-- Answer buttons -->
      <div id="answers" class="grid gap-4 md:grid-cols-2">
        <!-- Answer buttons generated here -->
      </div>

      <!-- Next/Submit button -->
      <div class="mt-4 flex flex-col md:flex-row justify-center items-center gap-4">
        <button id="previous-btn" class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Previous Question
        </button>
        <button id="submit-btn" class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Submit
        </button>
        <button id="next-btn" class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Next Question
        </button>
      </div>

      <!-- Result -->
      <div id="result" class="mt-6 text-center text-2xl font-bold hidden"></div>

    </div>
  </main>
</div>

`;

async function Quiz(container) {
  container.innerHTML = QuizHTML;

  let quizData = [];

  try {
    const response = await fetch('/api/problems/random?count=5');
    if (!response.ok) throw new Error('Failed to fetch problems');
    quizData = await response.json();
    
  } catch (error) {
    console.error('Error loading quiz:', error);
    return;
  }

  const selectedButton = new Map();
  const selectedAnswer = new Map();

  let currentQuestion = 0;
  let score = 0;
  let timer = 180 * quizData.length;
  let timerInterval;

  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('next-btn');
  const previousBtn = document.getElementById('previous-btn');
  const submitBtn = document.getElementById('submit-btn');
  const resultEl = document.getElementById('result');
  const timerEl = document.getElementById('timer');

    const progressContainer = document.getElementById("question-progress");

    for (let i = 0; i < quizData.length; i++) {
    const box = document.createElement("button");
    box.classList.add("w-6", "h-6", "rounded-full", "bg-gray-300");
    box.id = `progress-${i}`;
    progressContainer.appendChild(box);
    }

    function updateProgress(currentIndex, updateType) {
    for (let i = 0; i < quizData.length; i++) {
        const box = document.getElementById(`progress-${i}`);
        if (i === currentIndex) {
            if(updateType == 0){
                box.classList.replace("bg-gray-300", "bg-gray-500");
            }
            else if(updateType == 1){
                box.classList.replace("bg-gray-500", "bg-blue-500");
            }
            else if(box.classList.contains('bg-blue-300')){
                box.classList.replace("bg-blue-300", "bg-blue-500");
            }
        }
        else if(!box.classList.contains('bg-blue-500')){
            box.classList.replace("bg-gray-500", "bg-gray-300");
        }
        else if(box.classList.contains('bg-blue-500')){
            box.classList.replace("bg-blue-500", "bg-blue-300");
        }
    }
    }

  function startTimer() {
    timerInterval = setInterval(() => {
      timer--;
      timerEl.textContent = timer;
      if (timer <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }

  function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.innerHTML = `<p>${current.question}</p>`;
    answersEl.innerHTML = '';
    current.answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.innerHTML = answer;
      if(answer == selectedAnswer.get(currentQuestion)){
        btn.className = 'bg-gray-400 text-white hover:bg-gray-300 py-2 px-4 rounded w-full text-left';
      }
      else{
        btn.className = 'bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded w-full text-left';
      }
      btn.addEventListener('click', () => selectAnswer(answer, btn));
      answersEl.appendChild(btn);
      if(!selectedAnswer.has(currentQuestion)){
        updateProgress(currentQuestion, 0);
      }
      else{
        updateProgress(currentQuestion, 2);
      }
    });
    // Change button text if last question
    //nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Submit" : "Next Question";
  }

  function selectAnswer(answer, btn) {
    const correctAnswer = quizData[currentQuestion].correct;
    if(selectedButton.has(currentQuestion)){
        selectedButton.get(currentQuestion).classList.remove('bg-gray-400', 'text-white');
        selectedButton.get(currentQuestion).disabled = false;
    }
    else{
        updateProgress(currentQuestion, 1);
    }
    selectedButton.set(currentQuestion, btn);
    selectedAnswer.set(currentQuestion, answer);
    btn.classList.add('bg-gray-400', 'text-white');
    btn.disabled = true;
    nextBtn.disabled = false;
  }

  nextBtn.addEventListener('click', () => {
    if(currentQuestion < quizData.length - 1){
        if(currentQuestion == 0){
            previousBtn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
        }
        currentQuestion++;
        previousBtn.enabled = true;
        loadQuestion();
    }
    if(currentQuestion >= quizData.length - 1){
        nextBtn.classList.add('bg-gray-200', 'hover:bg-gray-300');
        nextBtn.enabled = false;
    }
  });
  previousBtn.addEventListener('click', () =>{
    if(currentQuestion > 0){
        if(currentQuestion == quizData.length - 1){
            nextBtn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
        }
        currentQuestion--;
        nextBtn.enabled = true;
        loadQuestion();
    }
    if(currentQuestion <= 0){
        previousBtn.classList.add('bg-gray-200', 'hover:bg-gray-300');
        previousBtn.enabled = false;
    }
  })
  submitBtn.addEventListener('click', () =>{
    submitQuiz();
  })
  for(let i = 0; i < quizData.length; i++){
    const box = document.getElementById(`progress-${i}`);
    box.addEventListener('click', () =>{
        currentQuestion = i;
        if(currentQuestion <= 0){
            previousBtn.classList.add('bg-gray-200', 'hover:bg-gray-300');
            previousBtn.enabled = false;
        }
        if(currentQuestion >= quizData.length - 1){
            nextBtn.classList.add('bg-gray-200', 'hover:bg-gray-300');
            nextBtn.enabled = false;
        }
        loadQuestion();
    })
  }

  async function submitQuiz() {
    clearInterval(timerInterval); // Stop the timer
    questionEl.classList.add('hidden');
    answersEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    previousBtn.classList.add('hidden');
    submitBtn.classList.add('hidden');

    let finalScore = 0;
    let problemHistoryUpdates = [];  // Ensure this is initialized here
    const userChoices = [];

    // Hide progress boxes
    for (let i = 0; i < quizData.length; i++) {
        const box = document.getElementById(`progress-${i}`);
        box.classList.add('hidden');
    }

    // Loop through the quizData to calculate score and update problem history
    for (let i = 0; i < quizData.length; i++) {
        const questionData = quizData[i];
        const selected = selectedAnswer.get(i); // The answer selected by the user
        const correct = questionData.correct;   // The correct answer for the question

        console.log(`Problem ${i} Data:`, questionData);
        console.log(`Problem ${i} ID Check (questionData._id):`, questionData.id);

        // Update the score based on user's answer
        if (selected === correct) {
            finalScore += 6;  // 6 points for correct answer
        } else if (selected === undefined) {
            finalScore += 1.5;  // 1.5 points for unanswered question
        }

        // Populate problemHistoryUpdates with relevant information
        problemHistoryUpdates.push(questionData.id);
        userChoices.push(selected || 'unanswered');  // Store user's choices (unanswered if no selection)
    }

    resultEl.textContent = `You scored ${score} out of ${quizData.length * 6}!`;
    resultEl.classList.remove('hidden');

    let userId;
    try {
        const userResponse = await fetch('/api/current-user');
        const userData = await userResponse.json();
        if (userData && userData.discordId) {
            userId = userData.discordId;
        } else {
            throw new Error('User is not logged in or discordId not found.');
        }
    } catch (error) {
        console.error('Error fetching current user ID:', error);
        resultEl.textContent = `Error: Could not submit results. Score: ${finalScore}`;
        resultEl.classList.remove('hidden');
        return;
    }

    let quizId;
    try {
        const randomIdResponse = await fetch('/api/random-id');
        if (!randomIdResponse.ok) throw new Error('Failed to fetch random ID');
        const randomIdData = await randomIdResponse.json();
        quizId = randomIdData.id;  // Assuming the response contains an `id` field
    } catch (error) {
        console.error('Error fetching random ID:', error);
        resultEl.textContent = `Error: Could not fetch random ID for the quiz. Score: ${finalScore}`;
        resultEl.classList.remove('hidden');
        return;
    }

    const quizPayload = {
        id: quizId,  // Random quiz ID
        problems: problemHistoryUpdates,  // The history of the problems and whether answers were correct
        choices: userChoices,  // The user's choices for each question
        score: finalScore,  // The user's score
        date: new Date().toISOString()  // The date when the quiz was completed
    };

    try {
      console.log(quizPayload)
      console.log('User ID:', userId);
        const apiResponse = await fetch(`/api/user/${userId}/newquiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizPayload)
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            throw new Error(`API error: ${errorData.error || apiResponse.statusText}`);
        }

        const successData = await apiResponse.json();
        console.log('Quiz submitted successfully:', successData);

        // --- 6. Display Result ---
        resultEl.textContent = `You scored ${finalScore} out of ${quizData.length * 6}! Results saved.`;
        resultEl.classList.remove('hidden');

    } catch (error) {
        console.error('Error submitting quiz to API:', error);
        resultEl.textContent = `You scored ${finalScore} out of ${quizData.length * 6}! Results **could not be saved**.`;
        resultEl.classList.remove('hidden');
    }
}
  
  // Start quiz
  loadQuestion();
  startTimer();
}

export default Quiz;
