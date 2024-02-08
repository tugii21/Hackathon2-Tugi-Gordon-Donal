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
<script>
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
    document.getElementById("content1").innerText = "Hi World";
    //   startQuiz(data);
    startQuiz();

    function displayData(data) {
        setTimeout(20000)
        document.getElementById("content").innerText = "Question Topic: " + data[0].tags;

        document.getElementById("content5").innerText = "incorrectAnswers: " + data[0].incorrectAnswers;

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
        document.getElementById("content3").innerText = "Hi World again";
        // startQuiz();
        document.getElementById("content3").innerText = "Hi Hi World again";
        console.log(data);
        //const q = data[0].question.text;

        for (let i = 0; i < data.length; i++) {
            displayQuestion(data[i].question.text);
            displayAnswerOptions(data[i].correctAnswer, data[i].incorrectAnswers);
            getUserAnswer();

            displayCorrectAnswer(data[i].correctAnswer);
            
            if (checkAnswer()) {
                incrementCorrectCount();
            } else {
              incrementWrongCount();
            }               
            // user selects 'next question' so that loop doesn't run through all questions instantly
        }
    }

    function displayQuestion(q) {
        //        document.getElementById("content2").innerText = "Question: " + data[0].question.text;  // access the actual question: object = question -> text = parameter.
        document.getElementById("content2").innerText = "Question: " + q;  // access the actual question: object = question -> text = parameter.
        // document.getElementById("content2").textContent = "Question: " + q; 
    };

    function displayAnswerOptions(q, p) {
        // these need to be randomised
        // and displayed in indivdual boxes numbered 1 to 4
        document.getElementById("content6").innerText = "Answer Choice: " + q + " " + p;
        //       document.getElementById("content6").textContent = "Answer Choice: " + q + " " + p;

    };

    function displayCorrectAnswer(q) {
        document.getElementById("content4").innerText = "correctAnswer: " + q;
    };

    function getUserAnswer() {
        //        let answer = document.getElementById("answer").textContent;
        //        return answer;
    }

    function checkAnswer() {
        //  is user answer = data[i].correctAnswer
        // return 0 == incorrect; 1 == correct
        //     let userAnswer = parseInt(document.getElementById("answer-box").value);
        return 1;
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

</script>

</html>