// We start the quiz with a timer set to 75. Timer left also will be the final score.
var timeLeft = 75;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var shuffledQuestions, currentQuestionIndex;

// Countdown timer
function timer() {
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;
        if (timeLeft === 0) {
            console.log("You are out of time");
            //timerEl.textContent = "";
            //clearInterval(timeInterval);
        }
    }, 1000)
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Start Quiz
function startGame() {
    startButton.classList.add("hide");
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
    // setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        //startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

// Check and show the correct answer
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
        document.querySelector("#check-answer").textContent = "Correct!";
    } else {
         // If the aswer is wrong, deduct time by 10
        timeLeft -= 10;
        element.classList.add("wrong");
        document.querySelector("#check-answer").textContent = "Wrong!";
    }
}

// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}
