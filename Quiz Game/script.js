const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital city of Somalia?",
        answers: [
            { text: "a) Hargeisa", correct: false },
            { text: "b) Mogadishu", correct: true },
            { text: "c) Kismayo", correct: false },
            { text: "d) Bosaso", correct: false },
        ],
    },
    {
        question: "Which language is officially spoken in Somalia?",
        answers: [
            { text: "a) Arabic", correct: false },
            { text: "b) Amharic", correct: false },
            { text: "c) Somali", correct: true },
            { text: "d) Swahili", correct: false },
        ],
    },
    {
        question: "What is the traditional Somali house made of sticks and mats called?",
        answers: [
            { text: "a) Guri", correct: false },
            { text: "b) Aqal", correct: true },
            { text: "c) Qasr", correct: false },
            { text: "d) Baraka", correct: false },
        ],
    },
    {
        question: "Which ocean borders Somalia to the east?",
        answers: [
            { text: "a) Atlantic Ocean", correct: false },
            { text: "b) Red Sea", correct: false },
            { text: "c) Indian Ocean", correct: true },
            { text: "d) Mediterranean Sea", correct: false },
        ],
    },
    {
        question: "What is the name of the script historically used to write Somali before the Latin alphabet?",
        answers: [
            { text: "a) Ge'ez", correct: false },
            { text: "b) Osmanya", correct: true },
            { text: "c) Arabic", correct: false },
            { text: "d) Sabaean", correct: false },
        ],
    },
    {
        question: "What is Somalia’s most famous traditional camel milk called?",
        answers: [
            { text: "a) Malab", correct: false },
            { text: "b) Canjeero", correct: false },
            { text: "c) Caano geel", correct: true },
            { text: "d) Sambuus", correct: false },
        ],
    },
    {
        question: "In which year did Somalia gain independence from colonial rule?",
        answers: [
            { text: "a) 1950", correct: false },
            { text: "b) 1960", correct: true },
            { text: "c) 1970", correct: false },
            { text: "d) 1980", correct: false },
        ],
    },
    {
        question: "What is the name of the Somali traditional dance often performed at celebrations?",
        answers: [
            { text: "a) Dhaanto", correct: true },
            { text: "b) Dabke", correct: false },
            { text: "c) Atil", correct: false },
            { text: "d) Gwara", correct: false },
        ],
    },
    {
        question: "Which Somali region declared independence in 1991 but is not internationally recognized?",
        answers: [
            { text: "a) Puntland", correct: false },
            { text: "b) Jubaland", correct: false },
            { text: "c) Somaliland", correct: true },
            { text: "d) Galmudug", correct: false },
        ],
    },
    {
        question: "What is the traditional Somali flatbread often eaten with honey and tea?",
        answers: [
            { text: "a) Chapati", correct: false },
            { text: "b) Canjeero", correct: true },
            { text: "c) Injera", correct:  false},
            { text: "d) Mandazi", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//Event Listeners
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("Active");
    quizScreen.classList.add("Active");

    showQuestion();
}

function showQuestion() {
    // Reset the Stet
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;  // Update question number

    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    questionText.textContent = currentQuestion.question;

    // todo: explain this
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", (e) => {
            if (answersDisabled) return;
            answersDisabled = true;
            const selectedButton = e.target;
            const iscorrect = selectedButton.dataset.correct === "true";

            Array.from(answersContainer.children).forEach((button) => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                } else if (button === selectedButton) {
                    button.classList.add("incorrect");
                }
            });

            if (iscorrect) {
                score++;
                scoreSpan.textContent = score;
            }

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion();
                } else {
                    showResults();
                }
            }, 1000);
        });
        answersContainer.appendChild(button);
    });
}

function showResults() {
    quizScreen.classList.remove("Active");
    resultScreen.classList.add("Active");

    finalScoreSpan.textContent = score;
    const persentage = (score / quizQuestions.length) * 100;
    if (persentage === 100) {
        resultMessage.textContent = "Perfect Your are a Genius!";
    } else if (persentage >= 80) {
        resultMessage.textContent = "Greet job! you know your stuff";
    } else if (persentage >= 60) {
        resultMessage.textContent = "Good effort! keep learning";
    } else if (persentage >= 40) {
        resultMessage.textContent = "Not Bad! try again to improve";
    } else {
        resultMessage.textContent = "Better Luck Next Time!";
    }
}
restartButton.addEventListener("click", () => {
    resultScreen.classList.remove("Active");
    startQuiz();
});