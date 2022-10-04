var timer = document.getElementById("timer")
var instructions = document.querySelector("#instructions")
var startGameButton = document.querySelector("#start-game")
var game = document.querySelector("#game")
var scoreInput = document.querySelector("#scores-input")
var correctAns = document.querySelector("#correct-ans")
var questionsEl = document.getElementById("questions")
var ansButtons = document.getElementById("ans-buttons")
var score = document.getElementById("score")


// Create three variables for time storage, shuffling and counter
var timeLeft;
var shuffledQuestions;
var counterd;
var currQuest = 0;
// funtion for shuffling the question using math.random

function shuffle(arr){
    var result = [];
    var arrCopy = [...arr];
    while(arrCopy.length){
        result.push(arrCopy.splice(Math.floor(Math.random()*arrCopy.length),1)[0])
    }
    return result
}

// funtion to start the game
function startGame(){
instructions.setAttribute("class", "hide");
game.setAttribute("class", "");
shuffledQuestions = shuffle(questions);
console.log(shuffledQuestions)
timeLeft = 300;
timer.textContent = `${timeLeft} seconds remaining!`
counterd = setInterval(() => {
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
    questionsEl.setAttribute("class","")
    console.log(shuffledQuestions[currQuest])
    var shuffledAns = shuffle(shuffledQuestions[currQuest].answers);
    ansButtons.innerHTML = ""
    questionsEl.textContent = shuffledQuestions[currQuest].question
    shuffledAns.forEach(answer=>{
        var newton = document.createElement("button");
        newton.textContent = answer;
        answer===shuffledQuestions[currQuest].correctAnswer? newton.setAttribute("data-correct","yes"):null;
        ansButtons.append(newton)
    })
}

function correctGuess(){
    correctAns.textContent = "correct!"
    correctAns.setAttribute("class","correct")
    ansButtons.setAttribute("class","hide")
    questionsEl.setAttribute("class","hide")
    currQuest++;
    if(currQuest<shuffledQuestions.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}
function wrongGuess(){
    correctAns.textContent = "wrong!"
    correctAns.setAttribute("class","wrong")
    ansButtons.setAttribute("class","hide")
    questionsEl.setAttribute("class","hide")
    currQuest++;
    timeLeft -= 15;
    if(currQuest<shuffledQuestions.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}

function endGame(){
    clearInterval(counterd)
    console.log('reached')
    game.setAttribute("class","hide")
    scoreInput.setAttribute("class", "")
    timer.textContent=""
    score.textContent = timeLeft;

}

startGameButton.addEventListener("click",startGame)
ansButtons.addEventListener("click",function(event){
    console.log(event)
    if(event.target.matches("button")){
      event.target.getAttribute("data-correct")?correctGuess():wrongGuess()
    }
})
document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault();
    var currentScores = JSON.parse(localStorage.getItem("score"))||[];
    console.log(currentScores);
    var me = {
        init:document.querySelector("input").value,
        score:timeLeft
    }
    currentScores.push(me);
    currentScores.sort((a,b)=>b.score-a.score)
    localStorage.setItem("scores",JSON.stringify(currentScores));
    console.log(currentScores)
    location.assign("./scores.html")
})

