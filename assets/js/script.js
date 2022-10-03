var timer = document.getElementById("timer")
var instructions = document.querySelector("#instructions")
var startGameButton = document.querySelector("#start-game")
var game = document.querySelector("#game")
var scoreInput = document.querySelector("scores-input")
var correctAns = document.querySelector("#correct-ans")
var questions = document.getElementById("questions")
var ansButtons = document.getElementById("ans-buttons")
var score = document.getElementById("score")

// Create three variables for time storage, shuffling and counter
var timeLeft;
var shuffledQuestions;
var counter;
// funtion for shuffling the question using math.random

function shuffle(questions){
    var result = [];
    var array = [...arr];
    while (array.length) {
        result.push(array.splice(Math.floor(Math.random() * array.length), 1)[0])
    }
    return result;
}

// funtion to start the game
function startGame(){
instructions.setAttribute("class", "hide");
game.setAttribute("class", "");
shuffledQuestions = shuffle(questions);
timeLeft = 300;
timer.textContent = `${timeLeft} seconds remaining!`
counter = setInterval(() => {
    timeLeft--;
    timer.textContent = `${timeLeft} second(s) remaining!`;
    if (timeLeft <= 0) {
        timeLeft = 0;
        endGame()
    }
    }, 1000)
loadNextQuestion()
}

//funtion to load next question

// function loadNextQuestion(){

// }
// funtion for correct and
// funtion for wrong answer
// funtion for end game
// add event listner on start quiz
// add event listner on submit of quiz
function loadNextQuestion(){
    correctAns.setAttribute("class","hide")
    ansButtons.setAttribute("class","")
    questions.setAttribute("class","")
    console.log(shuffle[currQuest])
    var shuffledAns = shuffle(shuffle[currQuest].answers);
    ansButtons.innerHTML = ""
    questions.textContent = shuffle[currQuest].question
    shuffledAns.forEach(answer=>{
        var newton = document.createElement("button");
        newton.textContent = answer;
        answer===shuffle[currQuest].correctAnswer? newton.setAttribute("data-correct","yes"):null;
        ansButtons.append(newton)
    })
}

function correctGuess(){
    isCorrectEl.textContent = "correct!"
    isCorrectEl.setAttribute("class","correct")
    answersEl.setAttribute("class","hide")
    questions.setAttribute("class","hide")
    currQuest++;
    if(currQuest<shuffled.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}
function wrongGuess(){
    isCorrectEl.textContent = "wrong!"
    isCorrectEl.setAttribute("class","wrong")
    answersEl.setAttribute("class","hide")
    questionEl.setAttribute("class","hide")
    currQuest++;
    timeLeft-=15;
    if(currQuest<shuffled.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}

function endGame(){
    clearInterval(countdown)
    gameDiv.setAttribute("class","hide");
    addScoreDiv.setAttribute("class","")
    timerEl.textContent=""
    scoreEl.textContent = timeLeft;

}

startGameBtn.addEventListener("click",startGame)
answersEl.addEventListener("click",function(event){
    if(event.target.matches("button")){
      event.target.getAttribute("data-correct")?correctGuess():wrongGuess()
    }
})
document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault();
    var currentScores = JSON.parse(localStorage.getItem("scores"))||[];
    console.log(currentScores);
    var me = {
        init:document.querySelector("input").value,
        score:timeLeft
    }
    currentScores.push(me);
    currentScores.sort((a,b)=>b.score-a.score)
    localStorage.setItem("scores",JSON.stringify(currentScores));
    location.assign("./highscores.html")
})

