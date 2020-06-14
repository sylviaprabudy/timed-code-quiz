// We start the quiz with a timer set to 75. This will be the final score.
var time = 75;
var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons")

var shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.classList.add("hide");
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
}

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

function resetState() {
    //nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
}
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    //setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        //setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}




// Loop over every question object
// for (var i = 0; i < questions.length; i++) {
//     // Display current question to quiz takers
//     var answer = confirm(questions[i].question);

//     // Compare answers
//     if (
//         (answer === true && questions[i].answer === 't') ||
//         (answer === false && questions[i].answer === 'f')
//     ) {
//         alert('Correct!');
//     } else {
//         // If the aswer is wrong, deduct time by 10
//         time -= 10;
//         alert('Wrong!');
//     }
// }
//   // Show total at end
//   alert('You got ' + time + '/' + questions.length);