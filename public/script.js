
let questions = [];

let current = 0;

let score = 0;


fetch("/questions")

.then(r=>r.json())

.then(data=>{

questions = data;

showQuestion();

});


function showQuestion(){

let q = questions[current];

document.getElementById("quiz").innerHTML = `

<h3>

${q.question}

</h3>

<button onclick="answer(1)">

${q.option1}

</button>

<button onclick="answer(2)">

${q.option2}

</button>

<button onclick="answer(3)">

${q.option3}

</button>

`;

}


function answer(choice){

if(

choice ==
questions[current].correct_option

){

score++;

}

current++;

if(current < questions.length){

showQuestion();

}else{

finish();

}

}


function finish(){

document.getElementById("quiz").innerHTML =
"quiz terminat";

document.getElementById("score").innerText =
"scor: " + score;

saveScore();

}


function saveScore(){

fetch("/score",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

score: score

})

});

}