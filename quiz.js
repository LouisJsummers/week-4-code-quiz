var startQuiz = document.getElementById('startQuiz');
var saveScore = document.getElementById('saveScore');
var viewScores = document.getElementById('viewScores');
var playAgain = document.getElementById('playAgain');



var welcome = document.getElementById('welcome');
var quiz = document.getElementById('quiz');
// var result = document.getElementById('result');

var options = document.getElementById('options');
var message = document.getElementById('message');

var timer = document.getElementById('timer');

var summary = document.getElementById('summary');

var secondsLeft = 75;
var score = 0;
var currentQuestion = -1;
var countDownTimer;


function onStartGame() {

    countDownTimer = setInterval(function (){

        if (secondsLeft > 0) {
            timer.textContent = secondsLeft;
        } else {
            stopGame();
        }
        secondsLeft--;
    }, 1000);

    welcome.style.display = 'none';
    // result.style.display = 'none';
    quiz.style.display = "flex";

    displayQuestion();
}

function onSaveScore(e) {

    var initials = document.getElementById("initials").value

    if (initials !== "") {
        localStorage.setItem(initials, score);

        document.getElementById("initials").value = "";
    }
}

function onViewScores(e) {

    window.location.href = 'scores.html';
}

function onSelectAnswer(e) {

    var correctAnswer = questions[currentQuestion].answer;

    var userAnswer = e.target.textContent;
    if (correctAnswer === userAnswer) {
        score ++;

        displayMessage ('CORRECT!')
    } else {

        score --;
        displayMessage ('WRONG')
    }
    
    displayQuestion();
}

function displayMessage(msg) {

    message.textContent = msg;

    setTimeout(function() {
        message.textContent = "";
    }, 1000);
}

function displayQuestion() {

    currentQuestion ++;

    console.log('current Question is ' + currentQuestion);

    if (currentQuestion >= questions.length) {
        stopGame();
        return;
    }

    var question = questions[currentQuestion];
    document.getElementById('question').textContent = question.title

    options.innerHTML = "";

    for (var i = 0; i < question.choices.length; i++) {
        var option = document.createElement('div');
        option.textContent = question.choices [i];
        option.onclick = onSelectAnswer;
        option.classList.add('option');

        options.appendChild(option);
    }
}

function stopGame() {
    
    clearInterval(countDownTimer);
    
    timer.textContent = ""

    quiz.style.display = 'none';
    // result.style.display = 'flex';

    summary.textContent = 'Your Score is: ' + score;

}

startQuiz.addEventListener('click', onStartGame);
saveScore.addEventListener('click', onSaveScore);
viewScores.addEventListener('click', onViewScores);
playAgain.addEventListener('click', onStartGame);
