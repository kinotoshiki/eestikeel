// デバッグ: scriptタグの data-quiz 属性を取得
const scriptTag = document.querySelector('script[data-quiz]');
console.log("Script tag found:", scriptTag);

if (scriptTag) {
    const quizType = scriptTag.getAttribute('data-quiz');
    console.log("data-quiz attribute value:", quizType);

    if (quizData[quizType]) {
        console.log("Quiz data found:", quizData[quizType]); // 正しくデータが取得できているか？
        startQuiz(quizData[quizType]); // クイズ開始
    } else {
        console.error("Quiz data not found for:", quizType);
    }
} else {
    console.error("No script tag with data-quiz found.");
}

console.log("Quiz data in script.js:", quizData);

// script.js - Main script for handling the quiz

let quizData = [];

// Load quiz data dynamically based on the data-quiz attribute
const scriptTag = document.querySelector("script[data-quiz]");
const quizCategory = scriptTag ? scriptTag.getAttribute("data-quiz") : null;

if (quizCategory) {
    const script = document.createElement("script");
    script.src = `data/${quizCategory}.js`;
    script.onload = () => {
        initializeQuiz();
    };
    document.head.appendChild(script);
} else {
    console.error("Quiz category not specified.");
}

function initializeQuiz() {
    if (!quizData || quizData.length === 0) {
        console.error("No quiz data available.");
        return;
    }

    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    let currentQuestionIndex = 0;

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-button");
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct) {
            alert("Correct!");
        } else {
            alert("Wrong! The correct answer is: " + currentQuestion.correct);
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            alert("Quiz completed!");
        }
    }

    loadQuestion();
}
