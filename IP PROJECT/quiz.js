//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which of the following is a major cause of ocean pollution?",
        options: ["Plastic Waste", "Oil spills", "Chemical runoff", "all of the above"],
        correct: "all of the above",
    },
    {
        id: "1",
        question: "Which marine organism is most affected by ocean acidification?",
        options: ["Corals", "Sharks", "Turtles", "Seals"],
        correct: "Corals",
    },
    {
        id: "2",
        question: "What is the largest source of marine plastic pollution?",
        options: ["Fishing nets", "Plastic Bottles", "Microplastics", "Plastic bags"],
        correct: "Microplastics",
    },
    {
        id: "3",
        question: "What is the process of oxygen depletion in aquatic ecosystems called?",
        options: ["Ocean acidification", "Eutrophication", "Bioaccumulation", "Coral bleaching"],
        correct: "Eutrophication",
    },
    {
        id: "4",
        question: "Which of the following is a potential solution to combat ocean pollution?",
        options: ["Promoting recycling and waste management", "Implementing stricter regulations on industrial waste discharge", "Reducing single-use plastics", "All of the above"],
        correct: "All of the above",
    },
    {
        id: "5",
        question: "What is the main cause of sea level rise?",
        options: ["Melting glaciers and ice caps", "Increase in underwater volcanoes", "Ocean currents", "Deforestation"],
        correct: "Melting glaciers and ice caps",
    }, {
        id: "6",
        question: "Which animal is often referred to as an indicator species for ocean health?",
        options: ["Dolphin", "Sea Turtle", "Blue whale", "Seahorse"],
        correct: "Sea Turtle",
    },
    {
        id: "7",
        question: "Which international agreement aims to protect the ocean and its resources?",
        options: ["Paris agreement", "Kyoto protocol", "Convention on Biological Diversity", "Montreal Protocol"],
        correct: "Convention on Biological Diversity",
    },
    {
        id: "8",
        question: "What is the process of gradual increase in the acidity of ocean water called?",
        options: ["Ocean warming", "Ocean acidification", "Coral bleaching", "Algal bloom"],
        correct: "Ocean acidification",
    },
    {
        id: "9",
        question: "Which type of pollution originates from excessive nutrient runoff and leads to harmful algal blooms?",
        options: ["Plastic pollution", "Oil pollution", "Light pollution", "Nutrient pollution"],
        correct: "Nutrient pollution",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};