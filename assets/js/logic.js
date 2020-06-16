// Start the quiz with a timer set to 75. Timer left also will be the final score.
var timeLeft = 75;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");


var shuffledQuestions, currentQuestionIndex;

// Countdown timer
function timer() {
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;
        //console.log(timeLeft)
        if (timeLeft <= 0) {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            saveScore();
        }
    }, 1000);
    return timeLeft;
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Start Quiz
function startGame() {
    //startButton.classList.add("hide");
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");
    // Timer will start as soon as start button is clicked
    timer();
    setNextQuestion();
}

// Go to next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Display questions
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

// Reset state function
function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
}

// Select answer function
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
     //setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

// Check and show the correct answer
function setStatusClass(element, correct) {
    clearStatusClass(element)
    console.log(correct);
    if (correct) {
        element.classList.add("correct");
        document.querySelector("#check-answer").textContent = "You got it right!";
    } else {
         // If the aswer is wrong, deduct time by 10
        timeLeft -= 10;
        element.classList.add("wrong");
        document.querySelector("#check-answer").textContent = "Sorry that was not the correct answer.";
    }
}

// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// Save score
function saveScore() {
    document.getElementById("score-container").classList.remove("hide");
    questionContainerEl.classList.add("hide");
    document.getElementById("your-score").textContent =  "Your final score is " + timeLeft;
}


// Show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    questionContainerEl.classList.add("hide");
    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("timeLeft");
  
    var initialsField = document.getElementById("initial1");
    var scoreField = document.getElementById("score1");
  
    initialsField.textContent = initials;
    scoreField.textContent = timeLeft;
  
    if (initials == null || timeLeft == null) {
      document.getElementById("no-scores").classList.remove("hide");
      //document.getElementById("no-scores").style.display = "inline-block";
    }
     //console.log(initials);
     //console.log(timeLeft);
  };

  
// View high scores link
viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
  event.preventDefault()
  var initials = document.querySelector("#initials-field").value;
  localStorage.setItem("initials", initials);
  localStorage.setItem("timeLeft", timeLeft);
  showHighScores();
});
