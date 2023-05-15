// Definerer en array med objekter som inneholder spørsmål og svaralternativer
const questions = [
    {

        question: "Kongeørnen kan oppnå en toppfart på omtrent 320 km/h. Hvor lang tid bruker ørnen på å fly en strekning på 100 m dersom den holder toppfarten hele veien? ",
        answers: [
            {text: "0,9s", correct: false},
            {text: "1,1s", correct: true},
            {text: "4,2s", correct: false},
            {text: "8,4s", correct: false}
    ]

    },
    {
        question: "En bil kjører med farten 83,5 km/h og må bremse opp på grunn av en hindring i veibanen. Fra sjåføren tråkker inn bremsen og til bilen står helt i ro, har bilen kjørt 31,2 m. Hva er bilens akselerasjon under oppbremsingen?",
        answers: [
            {text: "-8,6 m/s^2", correct: true},
            {text: "-11,5 m/s^2", correct: false},
            {text: "8,6 m/s^2", correct: false},
            {text: "11,5 m/s^2", correct: false}
    ]
    },
    {
        question: "En funksjon s(t) gir tilbakelagt strekning etter som tiden t går. Hvilket av alternativene nedenfor er ikke riktig?",
        answers: [
            {text: "Når den deriverte av s'(t) er negativ, kan det skyldes at farten minker", correct: false},
            {text: "s'(0) gir startfarten", correct: false},
            {text: "s'(t) gir den gjennomsnittlige farten i løpet av tiden t", correct: true},
            {text: "Når s'(t) = 0 er farten null", correct: false}
    ]
    },
    {
        question: "En apekatt sitter på ei grein 6,0 m over en bilvei. En 3,0 m høy buss kjører med akselerasjonen 2,5 m/s^2 mot der apekatten befinner seg. Apekatten ønsker å få skyss av bussen og slipper tak i greina når bussen nærmer seg. Akkurat når apekatten slipper taket, har bussen farten 70 km/t og fronten på bussen er 15 meter unna der apekatten befinner seg, målt langs bakken. Kommer apekatten til å lande på taket av bussen?",
        answers: [
            {text: "Nei, den lander 0,97m foran bussen (og rekker ikke å hoppe unna)", correct: false},
            {text: "Nei, den lander 8,0 meter foran bussen (og rekker å hoppe unna)", correct: false},
            {text: "Ja, den lander 8,0 meter inn på taket av bussen", correct: false},
            {text: "Ja, den lander 0,97 meter inn på taket av bussen", correct: true}
    ]
    }
    ]


//Definerer variabler for hvert av elementene i HTML-dokumentet.
const questionElement = document.getElementById("question");
const scoreCompliment = document.getElementById("score-compliment");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Lager to variabler for spørsmålsindeks og antall poeng.
let currentQuestionIndex = 0;
let score = 0;

// Start quizen og tilbakestiller poengsummen og spørsmålsindeksen
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Neste Spørsmål";
    showQuestion();
}

// Viser spørsmåler og svarenealternativene på det
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Lager svarknapper for hvert svaralternativ
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

// Tilbakestiller quizen og gjør klar for neste spørsmål
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Sjekker om brukeren svarer riktig eller galt og endrer css på knappen som blir trykket
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    // Gjør at vi ikke kan trykke på flere knapper og viser riktig alterntiv dersom feil ble svart
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


// Viser antall riktige og kommer med kommentar utifra antall riktige
function showScore(){
    resetState();
    questionElement.innerHTML = `Du fikk ${score} av ${questions.length}!`;
    if(score >=4)
        scoreCompliment.innerHTML = `Dette kan du!`;
        if(score === 3)
        scoreCompliment.innerHTML = `Dette klarte du nesten!`;
        if(score === 2)
        scoreCompliment.innerHTML = `Her har du litt å øve på`;
        if(score === 1 )
        scoreCompliment.innerHTML = `Her må du masse å øve på`;
        if(score === 0 )
        scoreCompliment.innerHTML = `Har du lest gjennom teorien engang?`;

    nextButton.innerHTML = "Spill på nytt"
    nextButton.style.display = "block";
}

// JS for neste spørsmål knappen
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

// Følger med på om neste knappen blir trykket
nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

//Starter quizen når siden laster inn
startQuiz();


// Funksjon som regner ut inputet fra alerten
function calculate() {
    alert("= " + eval(prompt("Skriv inn et regnestykke")));
}

// Følger med på knappen i HTML
document.getElementById("calculate-btn").addEventListener("click", calculate);