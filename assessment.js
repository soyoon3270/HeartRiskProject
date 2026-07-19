const questions = [

{

question: "How old are you?",

answers: [

{text:"Under 40",score:0},

{text:"40-49",score:1},

{text:"50-59",score:2},

{text:"60+",score:3}

]

},

{

question:"How long have you had diabetes?",

answers:[

{text:"I do not have diabetes",score:0},

{text:"Less than 5 years",score:1},

{text:"5-10 years",score:2},

{text:"More than 10 years",score:3}

]

},

{

question:"How often do you exercise?",

answers:[

{text:"5+ days/week",score:0},

{text:"3-4 days/week",score:1},

{text:"1-2 days/week",score:2},

{text:"Rarely",score:3}

]

}

];

let currentQuestion = 0;

let totalScore = 0;

function loadQuestion(){

document.getElementById("progress").innerHTML=
"Question "+(currentQuestion+1)+" of "+questions.length;

document.getElementById("question").innerHTML=
questions[currentQuestion].question;

let answersDiv=document.getElementById("answers");

answersDiv.innerHTML="";

questions[currentQuestion].answers.forEach(answer=>{

answersDiv.innerHTML+=`

<button class="answer-btn"

onclick="selectAnswer(${answer.score})">

${answer.text}

</button><br><br>

`;

});

}

function selectAnswer(score){

totalScore+=score;

nextQuestion();

}

function nextQuestion(){

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}

else{

alert("Assessment Complete!\nYour Score: "+totalScore);

}

}

loadQuestion();