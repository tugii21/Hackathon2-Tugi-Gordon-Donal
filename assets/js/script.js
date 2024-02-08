/* <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz API Sandbox</title>
</head>

<body>
    <div style="color:blue; background-color:red" id="content1"></div>
    <div id="content"></div>
    <div id="content2"></div>
    <div style="color:blue; background-color:aqua; width: 50%" id="content3"></div>
    <div id="content4"></div>
    <div id="content5"></div>
    <div id="content6"></div>
</body>


*/

/*
wait for the page/DOM to load
add event listeners
*/
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    //for (let i=0; i < buttons.length; i++) - traditional, more explicit (clearer?) syntax
    for (let button of buttons) {
        // iterate through array of buttons and add event listener to each button
        button.addEventListener("click", startQuiz() /*function () {
                if (this.getAttribute("data-type") === "submit") {
                    checkAnswer();
                    //alert("You clicked submit");
                } else {
                    startQuiz();
                    //let gameType = this.getAttribute("data-type");
                    //runGame(gameType);
                    //alert(`You clicked ${gameType}`);                
                }
            }*/
        )
    }
});
// fetch("https://the-trivia-api.com/v2/session")
// make an API call to get the questions for this quiz round
/*   fetch('https://the-trivia-api.com/v2/questions')
       .then(response => response.json())      // then(response => response.text())
       .then(data => displayData(data))
       .catch(error => {
           console.error('Error fetching data:', error);
       });
*/
async function startQuiz() {
    console.log("test");
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    console.log("test");
    if (response.ok) {
        console.log(data);
    }
    console.log("test");
    //     return data;
    displayData(data);
    runQuiz(data);
}

console.log("test");
//   runQuiz();
//document.getElementById("content1").innerText = "Hi World";
//   startQuiz(data);
startQuiz();

function displayData(data) {
    setTimeout(20000)
    //document.getElementById("content").innerText = "Question Topic: " + data[0].tags;
    //document.getElementById("content5").innerText = "incorrectAnswers: " + data[0].incorrectAnswers;
    //document.getElementById("content2").innerText = "Question: " + data[0].question.text;  // access the actual question: object = question -> text = parameter.
    //document.getElementById("content").innerText = data[0].question;
    //document.getElementById("content").innerText = data[1].category;
    //document.getElementById("content").innerText = data["id"];
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
        console.log(i);
        for (const key in data[i]) {
            console.log(`${key}: ${data[i][key]}`);
            //  console.log(`${key}: ${data[0][question][0]}`);

            // for (const key in data[0][question]) {
            //console.log(`${key}: ${data[0][question][key]}`);
            //  console.log(`${key}: ${data[0][question][0]}`);
        }
    }
    //setTimeout(resolve, 20);
    //setTimeout(200)      
}

// });

/**
 * Main Quiz Loop
 */
//    function runGame(gameType)
function runQuiz(data) {
    // document.getElementById("answer-box").value = "";
    // document.getElementById("answer-box").focus();
    //document.getElementById("content3").innerText = "Hi World again";
    // startQuiz();
    //document.getElementById("content3").innerText = "Hi Hi World again";
    console.log(data);
    //const q = data[0].question.text;

    for (let i = 0; i < data.length; i++) {
        displayQuestion(data[i].question.text);
        //        const myArray = data[i].incorrectAnswers.split(", ");
        // console.log(p);
        //        displayAnswerOptions(data[i].correctAnswer, data[i].incorrectAnswers);
        answerArray = data[i].incorrectAnswers;
        answerArray[answerArray.length] = data[i].correctAnswer;
        console.log("test: " + answerArray);

        const answerIndex = [0, 1, 2, 3];
        // Shuffle the array
        const shuffledIndex = shuffleArray(answerIndex);
        console.log("test: " + shuffledIndex);
        displayCorrectAnswer(data[i].correctAnswer);

        displayAnswerOptions(answerArray);
        //   let userAnswer = getUserAnswer();
        // create answer array containing correct & incorrect answers:

        // shuffle array of numbers, so that answers will be displayed randomly to user.

        // this needs to be changed - the correct answer is always the last element currently.
        if (checkAnswer(userAnswer, 3)) {
            incrementCorrectCount();
        } else {
            incrementWrongCount();
        }
        // user selects 'next question' so that loop doesn't run through all questions instantly
    }
}

function displayQuestion(q) {
    //        document.getElementById("content2").innerText = "Question: " + data[0].question.text;  // access the actual question: object = question -> text = parameter.
    document.getElementById("question").innerText = "Question: " + q;  // access the actual question: object = question -> text = parameter.
};

function displayAnswerOptions(p) {
    // these need to be randomised
    // and displayed in indivdual boxes numbered 1 to 4
    //console.log(p);
    document.getElementById("answer1").innerText = p[0];
    document.getElementById("answer2").innerText = p[1];
    document.getElementById("answer3").innerText = p[2];
    document.getElementById("answer4").innerText = p[3];

};

function displayCorrectAnswer(q) {
    document.getElementById("cab").innerText = "Correct Answer: " + q;
};

function getUserAnswer() {
    // let answer = document.getElementById("answer").textContent;
    let userAnswer = parseInt(document.getElementById("answerbox").textContent);
    //       document.getElementById("content6").textContent = "Answer Choice: " + q + " " + p;
    // decrement User Answer (1-4) by 1 to make it array point (0-3)
    userAnswer--;
    return userAnswer;
}

function checkAnswer() {
    //  is user answer = data[i].correctAnswer
    // return 0 == incorrect; 1 == correct
    //     let userAnswer = parseInt(document.getElementById("answer-box").value);
    return 1;


    /*
     let userAnswer = parseInt(document.getElementById("answer-box").value);
     let calculatedAnswer = calculateCorrectAnswer();
     let isCorrect = userAnswer === calculatedAnswer[0];
     //let gt = gameType;
     let operator = document.getElementById("operator").innerText;
     //let operator = this.getAttribute("data-type"); 
     if (isCorrect) {
         alert("Well Done, Correct.");
         incrementScore();
     } else {
         alert(`Doh! ${userAnswer} ?? Wrong! can you ${operator} ? oh well, the correct answer is ${calculatedAnswer[0]}`)
         incrementWrongAnswer();
     }*/
}
function incrementCorrectCount() {
    console.log("correct");
    //   let oldScore = parseInt(document.getElementById("score").innerText);
    //document.getElementById("score").innerText = ++oldScore;

}
function incrementWrongCount() {
    console.log("wrong");
    //      let oldScore = parseInt(document.getElementById("incorrect").innerText);
    //document.getElementById("incorrect").innerText = ++oldScore;

}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// shuffle array of numbers, so that answers will be displayed randomly to user.
const answerIndex = [0, 1, 2, 3];

// Shuffle the array
const shuffledIndex = shuffleArray(answerIndex);

console.log(shuffledIndex);




