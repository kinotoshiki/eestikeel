// Quiz Data will be loaded based on the quiz specified in the HTML file
const quizData = {
    food: [
        { question: "piim", correct: "milk", options: ["water", "beer", "tea", "coffee"] },
        { question: "leib", correct: "bread", options: ["cake", "bread", "milk", "coffee"] },
        { question: "õun", correct: "apple", options: ["banana", "orange", "apple", "pear"] }
    ],
    colors: [
        { question: "punane", correct: "red", options: ["red", "green", "blue", "yellow"] },
        { question: "sinine", correct: "blue", options: ["blue", "green", "black", "purple"] }
    ]
};

// Get quiz type from the script tag's data-quiz attribute
const quizType = document.querySelector('script[data-quiz]').dataset.quiz;

// Load the relevant quiz data based on the quizType
const questions = quizData[quizType];

let currentQuestionIndex = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const li = document.createElement("li");
            li.textContent = option;
            li.onclick = () => checkAnswer(option);
            optionsElement.appendChild(li);
        });
    } else {
        alert("You have completed the quiz!");
    }
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (selectedOption === correctAnswer) {
        alert("Correct!");
    } else {
        alert("Incorrect. The correct answer is: " + correctAnswer);
    }

    currentQuestionIndex++;
    loadQuestion();
}

document.getElementById("nextBtn").addEventListener("click", loadQuestion);

loadQuestion();
