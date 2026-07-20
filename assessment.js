const questions = document.querySelectorAll(".question");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiDisplay = document.getElementById("bmiValue");

let bmi = 0;
let currentQuestion = 0;

// 초기 화면 표시
showQuestion();

// -------------------- 화면 표시 --------------------
function showQuestion() {

    questions.forEach(q => q.classList.remove("active"));

    questions[currentQuestion].classList.add("active");

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    prevBtn.style.display =
        currentQuestion === 0 ? "none" : "inline-block";

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Submit Assessment"
            : "Next →";
}

// -------------------- BMI 계산 --------------------
function calculateBMI() {

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight) {
        bmiDisplay.textContent = "--";
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

    bmiDisplay.textContent = `${bmi.toFixed(1)} (${category})`;
}

// 입력할 때마다 BMI 자동 계산
heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

// -------------------- 현재 질문 검증 --------------------
function validateQuestion() {

    const current = questions[currentQuestion];

    const numbers = current.querySelectorAll("input[type='number']");
    const radios = current.querySelectorAll("input[type='radio']");

    // BMI 질문
    if (numbers.length > 0) {

        let filled = true;

        numbers.forEach(input => {
            if (input.value.trim() === "") {
                filled = false;
            }
        });

        if (!filled) {
            alert("Please enter your height and weight.");
            return false;
        }

        return true;
    }

    // 라디오 질문
    if (radios.length > 0) {

        const checked = Array.from(radios).some(r => r.checked);

        if (!checked) {
            alert("Please select an answer before continuing.");
            return false;
        }
    }

    return true;
}

// -------------------- 버튼 이벤트 --------------------
nextBtn.addEventListener("click", () => {

    if (!validateQuestion()) return;

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        showQuestion();

    } else {

        alert("Assessment submitted! (Scoring will be added later.)");
    }
});

prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;
        showQuestion();
    }
});