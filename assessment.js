const questions = document.querySelectorAll(".question");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiDisplay = document.getElementById("bmiValue");

let currentQuestion = 0;
let bmi = 0;

// ==========================
// 초기화
// ==========================
showQuestion();

// ==========================
// 화면 표시
// ==========================
function showQuestion() {

    questions.forEach(q => q.classList.remove("active"));

    questions[currentQuestion].classList.add("active");

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

    prevBtn.style.display =
        currentQuestion === 0 ? "none" : "inline-block";

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Submit Assessment"
            : "Next →";
}

// ==========================
// BMI 계산
// ==========================
function calculateBMI() {

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight) {

        bmiDisplay.textContent = "--";
        bmi = 0;
        return;
    }

    bmi = weight / Math.pow(height / 100, 2);

    let category = "";

    if (bmi < 18.5) {

        category = "🔵 Underweight";

    } else if (bmi < 25) {

        category = "🟢 Healthy";

    } else if (bmi < 30) {

        category = "🟠 Overweight";

    } else {

        category = "🔴 Obese";

    }

    bmiDisplay.textContent =
        `${bmi.toFixed(1)} (${category})`;
}

heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

// ==========================
// 질문 체크
// ==========================
function validateQuestion() {

    const current = questions[currentQuestion];

    const numbers =
        current.querySelectorAll("input[type='number']");

    const radios =
        current.querySelectorAll("input[type='radio']");

    // BMI 질문
    if (numbers.length > 0) {

        let complete = true;

        numbers.forEach(input => {

            if (input.value.trim() === "") {

                complete = false;

            }

        });

        if (!complete) {

            alert("Please enter your height and weight.");

            return false;

        }

        calculateBMI();

        return true;

    }

    // Radio 질문
    if (radios.length > 0) {

        const checked =
            Array.from(radios).some(r => r.checked);

        if (!checked) {

            alert("Please select an answer.");

            return false;

        }

    }

    return true;

}

// ==========================
// 점수 계산
// ==========================
function calculateScore() {

    let score = 0;

    // Age
    const age = document.querySelector("input[name='age']:checked")?.value;

    const agePoints = {
        "under30": 0,
        "30-39": 1,
        "40-49": 2,
        "50-59": 3,
        "60-69": 4,
        "70plus": 5
    };

    score += agePoints[age] || 0;

    // BMI
    if (bmi >= 30) score += 3;
    else if (bmi >= 25) score += 2;
    else if (bmi >= 18.5) score += 1;

    // Diabetes
    const diabetes = document.querySelector("input[name='diabetes']:checked")?.value;

    const diabetesPoints = {
        type1: 3,
        type2: 4,
        prediabetes: 2,
        no: 0
    };

    score += diabetesPoints[diabetes] || 0;

    // Duration
    const duration = document.querySelector("input[name='duration']:checked")?.value;

    const durationPoints = {
        lt5: 1,
        "5to10": 2,
        gt10: 3,
        na: 0
    };

    score += durationPoints[duration] || 0;

    // Treatment
    const treatment = document.querySelector("input[name='treatment']:checked")?.value;

    if (treatment === "none") score += 1;

    // Exercise
    const exercise = document.querySelector("input[name='exercise']:checked")?.value;

    const exercisePoints = {
        "5": -3,
        "3": -2,
        "1": -1,
        "0": 0
    };

    score += exercisePoints[exercise] || 0;

    // Sugary Drinks
    const sugar = document.querySelector("input[name='sugar']:checked")?.value;

    const sugarPoints = {
        never: 0,
        "1-2": 1,
        "3-6": 2,
        daily: 3,
        "3daily": 4
    };

    score += sugarPoints[sugar] || 0;

    // Smoking
    const smoking = document.querySelector("input[name='smoking']:checked")?.value;

    const smokingPoints = {
        never: 0,
        former: 1,
        sometimes: 2,
        daily: 3
    };

    score += smokingPoints[smoking] || 0;

    // Blood Pressure
    const bp = document.querySelector("input[name='bp']:checked")?.value;

    if (bp === "yes") score += 3;
    else if (bp === "unsure") score += 1;

    // Shortness of Breath
    const breath = document.querySelector("input[name='breath']:checked")?.value;

    if (breath === "yes") score += 3;

    // Swelling
    const swelling = document.querySelector("input[name='swelling']:checked")?.value;

    if (swelling === "yes") score += 3;

    // Cholesterol
    const cholesterol = document.querySelector("input[name='cholesterol']:checked")?.value;

    if (cholesterol === "yes") score += 2;

    // Family History
    const family = document.querySelector("input[name='family']:checked")?.value;

    if (family === "yes") score += 2;
    else if (family === "no") score += 1;

    return score;
}

// ==========================
// Next 버튼
// ==========================
nextBtn.addEventListener("click", () => {

    if (!validateQuestion()) return;

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        const score = calculateScore();

        localStorage.setItem("heartguardScore", score);

        window.location.href = "result.html";

    }

});

// ==========================
// Previous 버튼
// ==========================
prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});