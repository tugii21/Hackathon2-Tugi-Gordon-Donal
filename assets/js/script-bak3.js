document.addEventListener("DOMContentLoaded", function () {
    startQuiz();
});

async function startQuiz() {
    try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        runQuiz(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function runQuiz(data) {
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    // Function to display a question
    function displayQuestion() {
        const questionElement = document.getElementById('question');
        questionElement.textContent = data[currentQuestionIndex].question.text;
    }

    // Function to display answer options
    function displayAnswerOptions() {
        const answers = data[currentQuestionIndex].incorrectAnswers.concat(data[currentQuestionIndex].correctAnswer);
        const shuffledAnswers = shuffleArray(answers);
        const answerElements = document.querySelectorAll('.answer');
        answerElements.forEach((element, index) => {
            element.textContent = shuffledAnswers[index];
        });
    }

    // Function to check the user's answer
    function checkAnswer(selectedAnswer) {
        const correctAnswer = data[currentQuestionIndex].correctAnswer;
        return selectedAnswer === correctAnswer;
    }

    // Function to handle user input and move to the next question
    function nextQuestion(selectedAnswer) {
        if (checkAnswer(selectedAnswer)) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < data.length) {
            displayQuestion();
            displayAnswerOptions();
        } else {
            endQuiz();
        }
    }

    // Function to end the quiz and display results
    function endQuiz() {
        const resultElement = document.getElementById('result');
        resultElement.textContent = `Quiz ended! Correct answers: ${correctAnswers}, Wrong answers: ${wrongAnswers}`;
    }

    // Shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Event listener for answer selection
    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((element) => {
        element.addEventListener('click', () => {
            nextQuestion(element.textContent);
        });
    });

    // Start the quiz by displaying the first question
    displayQuestion();
    displayAnswerOptions();
}
