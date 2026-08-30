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
    if (bmi > 30) score += 3;
    else if (bmi >= 25) score += 2;
    else if (bmi >= 18.5) score += 0;
    else if (bmi > 0) score += 1; // under 18.5

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

    // Treatment (checkbox — sum all selected; only "none" carries weight)
       // Treatment
    const treatments = Array.from(
        document.querySelectorAll("input[name='treatment']:checked")
    ).map(t => t.value);

    let treatmentScore = 0;
    if (treatments.includes("none")) treatmentScore = 1;
    else if (treatments.includes("pump")) treatmentScore = 3;
    else if (treatments.includes("insulin")) treatmentScore = 3;
    else if (treatments.includes("cgm")) treatmentScore = 2;
    else if (treatments.includes("oral")) treatmentScore = 1;

    score += treatmentScore;

    if (treatments.includes("none")) score += 1;
    // oral, insulin, cgm, pump, multiple, na all = 0, no need to add

    // Exercise
    const exercise = document.querySelector("input[name='exercise']:checked")?.value;
    const exercisePoints = {
        "5": 0,
        "3": 1,
        "1": 2,
        "0": 3
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
    const bpPoints = { yes: 3, no: 0, unsure: 1 };
    score += bpPoints[bp] || 0;

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
    // no = 0, unsure = 0

   // Diet Pattern
    const diet = document.querySelector("input[name='diet']:checked")?.value;
    const dietPoints = {
        homecooked: 0,
        mostlyhome: 1,
        eatingout: 3,
        processed: 4
    };
    score += dietPoints[diet] || 0;

    // Daily Activity
    const activity = document.querySelector("input[name='activity']:checked")?.value;
    const activityPoints = {
        sitting: 3,
        standing: 2,
        active: 0
    };
    score += activityPoints[activity] || 0;

    // Last Check-up
    const checkup = document.querySelector("input[name='checkup']:checked")?.value;
    const checkupPoints = {
        lt1: 0,
        "1to2": 1,
        gt2: 2,
        never: 3
    };
    score += checkupPoints[checkup] || 0;

    return score;
}

// ==========================
// 화면 표시
// ==========================
function showQuestion() {

    questions.forEach(q => q.classList.remove("active"));

    questions[currentQuestion].classList.add("active");

    const lang = localStorage.getItem("heartguardLang") || "en";
    const questionLabel = lang === "es" ? "Pregunta" : "Question";
    const ofLabel = lang === "es" ? "de" : "of";

    questionNumber.textContent =
        `${questionLabel} ${currentQuestion + 1} ${ofLabel} ${questions.length}`;

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

    prevBtn.style.display =
        currentQuestion === 0 ? "none" : "inline-block";

    const nextLabel = lang === "es"
        ? (currentQuestion === questions.length - 1 ? "Enviar Evaluación" : "Siguiente →")
        : (currentQuestion === questions.length - 1 ? "Submit Assessment" : "Next →");

    nextBtn.textContent = nextLabel;
    questionNumber.innerHTML = `${questionLabel} <span class="q-jump" id="qJump">${currentQuestion + 1}</span> ${ofLabel} ${questions.length}`;
document.getElementById("qJump").onclick = () => {
    const input = prompt(`Jump to question (1–${questions.length}):`);
    const num = parseInt(input);
    if (num >= 1 && num <= questions.length) {
        currentQuestion = num - 1;
        showQuestion();
    }
};
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

    const lang = localStorage.getItem("heartguardLang") || "en";

    const msgSelectAnswer = lang === "es" ? "Por favor selecciona una respuesta." : "Please select an answer.";
    const msgSelectOption = lang === "es" ? "Por favor selecciona al menos una opción." : "Please select at least one option.";
    const msgHeightWeight = lang === "es" ? "Por favor ingresa tu estatura y peso." : "Please enter your height and weight.";

    const current = questions[currentQuestion];
    const numbers = current.querySelectorAll("input[type='number']");
    const radioGroups = [...new Set(
        Array.from(current.querySelectorAll("input[type='radio']")).map(r => r.name)
    )];
    const checkboxGroups = [...new Set(
        Array.from(current.querySelectorAll("input[type='checkbox']")).map(c => c.name)
    )];

    // BMI 질문
    if (numbers.length > 0) {
        let complete = true;
        numbers.forEach(input => { if (input.value.trim() === "") complete = false; });
        if (!complete) { alert(msgHeightWeight); return false; }
        calculateBMI();
        return true;
    }

    // Radio 그룹 (gender 등 필수 항목)
    for (const name of radioGroups) {
        const groupInputs = current.querySelectorAll(`input[name='${name}']`);
        const isOptional = groupInputs[0].hasAttribute("data-optional");
        const checked = Array.from(groupInputs).some(r => r.checked);
        if (!checked && !isOptional) {
            alert(msgSelectAnswer);
            return false;
        }
    }

    // Checkbox 그룹 (treatment는 필수, ethnicity는 선택)
    for (const name of checkboxGroups) {
        const groupInputs = current.querySelectorAll(`input[name='${name}']`);
        const isOptional = groupInputs[0].hasAttribute("data-optional");
        const checked = Array.from(groupInputs).some(c => c.checked);
        if (!checked && !isOptional) {
            alert(msgSelectOption);
            return false;
        }
    }

    return true;
}
// ==========================
// Next 버튼
// ==========================
nextBtn.addEventListener("click", () => {

    if (!validateQuestion()) return;

    const current = questions[currentQuestion];
    let nextIndex = currentQuestion + 1;

    // Diabetes = "No" → skip duration & treatment, jump straight to exercise
       // Diabetes = "No" → skip duration & treatment, jump straight to exercise
    if (current.id === "q-diabetes") {
        const diabetes = document.querySelector("input[name='diabetes']:checked")?.value;
        if (diabetes === "no") {

            // Clear stale duration/treatment answers so they don't get counted
            document.querySelectorAll("input[name='duration']").forEach(r => r.checked = false);
            document.querySelectorAll("input[name='treatment']").forEach(c => c.checked = false);

            nextIndex = Array.from(questions).findIndex(q => q.id === "q-exercise");
        }
    }
    

    if (nextIndex < questions.length) {

        currentQuestion = nextIndex;
        showQuestion();

    } else {

        const score = calculateScore();
        localStorage.setItem("heartguardScore", score);

        const bmi = parseFloat(document.getElementById("bmiValue").textContent);
        let bmiCategory;

        if (bmi < 18.5) bmiCategory = "underweight";
        else if (bmi < 25) bmiCategory = "healthy";
        else if (bmi < 30) bmiCategory = "overweight";
        else bmiCategory = "obese";

        const answers = {
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            age: document.querySelector('input[name="age"]:checked')?.value,
            diabetes: document.querySelector('input[name="diabetes"]:checked')?.value,
            duration: document.querySelector('input[name="duration"]:checked')?.value,
            treatment: document.querySelector('input[name="treatment"]:checked')?.value,
            exercise: document.querySelector('input[name="exercise"]:checked')?.value,
            sugar: document.querySelector('input[name="sugar"]:checked')?.value,
            smoking: document.querySelector('input[name="smoking"]:checked')?.value,
            bp: document.querySelector('input[name="bp"]:checked')?.value,
            breath: document.querySelector('input[name="breath"]:checked')?.value,
            swelling: document.querySelector('input[name="swelling"]:checked')?.value,
            cholesterol: document.querySelector('input[name="cholesterol"]:checked')?.value,
            family: document.querySelector('input[name="family"]:checked')?.value,
            activity: document.querySelector('input[name="activity"]:checked')?.value,
            diet: document.querySelector('input[name="diet"]:checked')?.value,
            bmi: bmiCategory
        };

        localStorage.setItem("heartguardAnswers", JSON.stringify(answers));

        window.location.href = "result.html";
    }

});

// ==========================
// Previous 버튼
// ==========================
prevBtn.addEventListener("click", () => {

    const current = questions[currentQuestion];
    let prevIndex = currentQuestion - 1;

    // On exercise question and diabetes was "No" → go back straight to diabetes
    if (current.id === "q-exercise") {
        const diabetes = document.querySelector("input[name='diabetes']:checked")?.value;
        if (diabetes === "no") {
            prevIndex = Array.from(questions).findIndex(q => q.id === "q-diabetes");
        }
    }

    if (prevIndex >= 0) {
        currentQuestion = prevIndex;
        showQuestion();
    }

});
document.querySelectorAll("input[name='family']").forEach(input => {
    input.addEventListener("change", () => {
        const banner = document.getElementById("familyUnsureBanner");
        if (banner) {
            banner.style.display = (input.value === "unsure" && input.checked) ? "block" : "none";
        }
    });
});
document.querySelectorAll("input[name='swelling']").forEach(input => {
    input.addEventListener("change", () => {
        const banner = document.getElementById("swellingBanner");
        if (banner) banner.style.display = (input.value === "yes" && input.checked) ? "block" : "none";
    });
});
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        setTimeout(showQuestion, 0);
    });
});
document.querySelectorAll("input[name='breath']").forEach(input => {
    input.addEventListener("change", () => {
        const banner = document.getElementById("breathBanner");
        if (banner) banner.style.display = (input.value === "yes" && input.checked) ? "block" : "none";
    });
});