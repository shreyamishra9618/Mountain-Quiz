var scores = JSON.parse(localStorage.getItem("TotalScores"))||[];

scores.forEach(score=>{
    var newlistEl = document.createElement("li");
    newlistEl.textContent = `${score.init} : ${score.score}`
    document.querySelector("ol").append(newlistEl)
})