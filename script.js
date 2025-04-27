const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyper Trainer Marking Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Marketing Language", correct: false},
            {text: "High Text Markup Language", correct: false},
        ]
    },
    {
        question: " Which of the following is a JavaScript framework?",
        answers: [
            {text: "Django", correct: false},
            {text: "React", correct: true},
            {text: "Flask", correct: false},
            {text: " Laravel", correct: false},
        ]
    },
    {
        question: "In CSS, which property is used to change the text color?",
        answers: [
            {text: "color", correct: true},
            {text: "font-color", correct: false},
            {text: " text-color", correct: false},
            {text: "background-color", correct: false},
        ]
    },
    {
        question: "Which one is a backend language?",
        answers: [
            {text: "HTML", correct: false},
            {text: " CSS", correct: false},
            {text: "JavaScript", correct: false},
            {text: "  Python ", correct: true},
        ]
    },
    {
        question: "What does API stand for?",
        answers: [
            {text: " Advanced Programming Internet", correct: false},
            {text: "Application Programming Interface ", correct: true},
            {text: " Application Performance Integration", correct: false},
            {text: "Applied Program Interface", correct: false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();