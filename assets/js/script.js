document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll(".answer-btn");
    for (let button of buttons) {
        button.addEventListener("click", checkAnswer);
    }
    startQuiz();
});
let questions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
async function startQuiz() {
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    if (response.ok) {
        questions = data;
        runQuiz(currentQuestionIndex);
    }
}
function runQuiz(questionIndex) {
    const currentQuestion = questions[questionIndex];
    displayQuestion(currentQuestion.question.text);
    displayAnswerOptions(currentQuestion.correctAnswer, currentQuestion.incorrectAnswers);
}
function displayQuestion(q) {
    document.getElementById("question").innerText = q;
}
function displayAnswerOptions(q, p) {
    const answerButtons = document.querySelectorAll(".answer-btn");
    const options = [q, p[0], p[1], p[2]];
    const shuffledOptions = shuffleArray(options);
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].innerText = shuffledOptions[i];
    }
}
function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
function checkAnswer() {
    const userAnswer = this.innerText;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (userAnswer === correctAnswer) {
        document.getElementById("cab").innerText = "Correct!";
        incrementCorrectCount();
    } else {
        document.getElementById("cab").innerText = "Incorrect!";
        incrementWrongCount();
    }
    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        runQuiz(currentQuestionIndex);
    } else {
        displayFinalScore();
    }
}
function incrementCorrectCount() {
    correctCount++;
    document.getElementById("csb").innerText = "Correct score = " + correctCount;
}
function incrementWrongCount() {
    wrongCount++;
    document.getElementById("wsb").innerText = "Wrong score = " + wrongCount;
}
function displayFinalScore() {
    // You can add logic here to display the final score or perform any other actions
    console.log("Quiz finished. Correct: " + correctCount + ", Wrong: " + wrongCount);
}








//below javascript code makes all picture on front page slides 
let slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let slideWidth = slides[0].clientWidth;

  function nextSlide() {
   currentIndex = (currentIndex + 0.5) % slides.length;
    updateSlider();
  }

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  setInterval(nextSlide, 3000); // Change slide every 3 seconds




