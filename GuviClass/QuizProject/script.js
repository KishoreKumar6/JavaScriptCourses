console.log("Quiz App")
const quizData = [
  {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d",
  },
  {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b",
  },
  {
      question: "What does HTML stand for?",
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborginis",
      correct: "a",
  },
  {
      question: "What year was JavaScript launched?",
      a: "1996",
      b: "1995",
      c: "1994",
      d: "none of the above",
      correct: "b",
  },
];

let quiz = document.getElementById('quiz')
let questionHeading = document.getElementById('questionHeading')
let optionList = document.querySelectorAll('.optionList')
let aoption=document.getElementById('aOption')
let boption=document.getElementById('bOption')
let coption=document.getElementById('cOption')
let doption=document.getElementById('dOption')
let submitBtn=document.getElementById('submitBtn')
let currentQuizCount = 0 //--->index to change question number or index number from 1, 2....without using quizdata[0,1..]
let score = 0
// console.log (quizData)
//console.log(quizData[currentQuizCount])

loadQuiz()

function loadQuiz(){
  deSelectOption()
  console.log ("Load Quiz")
  let currentQuizData = quizData[currentQuizCount]
  console.log (currentQuizData)

  questionHeading.innerText = currentQuizData.question
  aoption.innerText = currentQuizData.a
  boption.innerText = currentQuizData.b
  coption.innerText = currentQuizData.c
  doption.innerText = currentQuizData.d
}
function deSelectOption(){
  optionList.forEach((options)=>options.checked=false)
}

function getSelected(){
  //return the answer, what we select in the radio it will take to compare to the correct answer and show the result
  let selectedanswer ;
  optionList.forEach((element)=>{
   if (element.checked){
    selectedanswer = element.id
   }
  })
return selectedanswer;
}

submitBtn.addEventListener('click',()=>{
  let answer = getSelected()
  console.log (answer)
  if(answer){
    if(answer == quizData[currentQuizCount].correct){
      score++;
    }
    console.log("score",score)
    currentQuizCount++;
    if(currentQuizCount<quizData.length){
      loadQuiz()
    }
    else{
      //quiz.innerText = score;
      quiz.innerHTML=(`
         <h2>You scored ${score}/${quizData.length}</h2>
         <button class = "submitBtn" onclick=location.reload()>Reload</button>
      `)//inbuilt reload function btn
      document.body.style.backgroundImage="url('https://media.tenor.com/ESpfCb3gfuIAAAAC/you-win-winner.gif')"
    }
  }
  console.log("show next Question",currentQuizCount)
 
})