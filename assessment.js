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

/* -----------------------
   Age
----------------------- */

const age = document.querySelector('input[name="age"]:checked')?.value;

switch(age){

    case "under30":
        score += 0;
        break;

    case "30-39":
        score += 1;
        break;

    case "40-49":
        score += 2;
        break;

    case "50-59":
        score += 3;
        break;

    case "60-69":
        score += 4;
        break;

    case "70plus":
        score += 5;
        break;

}


/* -----------------------
   BMI
----------------------- */

const height = Number(document.getElementById("height").value);
const weight = Number(document.getElementById("weight").value);

if(height > 0 && weight > 0){

    const bmi = weight / ((height / 100) ** 2);

    if(bmi >= 30){

        score += 3;

    }

    else if(bmi >= 25){

        score += 2;

    }

    else if(bmi >= 18.5){

        score += 1;

    }

}


/* -----------------------
   Diabetes
----------------------- */

const diabetes = document.querySelector('input[name="diabetes"]:checked')?.value;

switch(diabetes){

    case "type1":
        score += 3;
        break;

    case "type2":
        score += 4;
        break;

    case "prediabetes":
        score += 2;
        break;

}


/* -----------------------
   Duration
----------------------- */

const duration = document.querySelector('input[name="duration"]:checked')?.value;

switch(duration){

    case "lt5":
        score += 1;
        break;

    case "5to10":
        score += 2;
        break;

    case "gt10":
        score += 3;
        break;

}


/* -----------------------
   Treatment
----------------------- */

const treatment = document.querySelector('input[name="treatment"]:checked')?.value;

if(treatment === "none"){

    score += 1;

}


/* -----------------------
   Exercise
----------------------- */

const exercise = document.querySelector('input[name="exercise"]:checked')?.value;

switch(exercise){

    case "5":
        score += 3;
        break;

    case "3":
        score += 2;
        break;

    case "1":
        score += 1;
        break;

}


/* -----------------------
   Sugary Drinks
----------------------- */

const sugar = document.querySelector('input[name="sugar"]:checked')?.value;

switch(sugar){

    case "1-2":
        score += 1;
        break;

    case "3-6":
        score += 2;
        break;

    case "daily":
        score += 3;
        break;

    case "3daily":
        score += 4;
        break;

}


/* -----------------------
   Smoking
----------------------- */

const smoking = document.querySelector('input[name="smoking"]:checked')?.value;

switch(smoking){

    case "former":
        score += 1;
        break;

    case "sometimes":
        score += 2;
        break;

    case "daily":
        score += 3;
        break;

}


/* -----------------------
   Blood Pressure
----------------------- */

const bp = document.querySelector('input[name="bp"]:checked')?.value;

switch(bp){

    case "yes":
        score += 3;
        break;

    case "unsure":
        score += 1;
        break;

}


/* -----------------------
   Shortness of Breath
----------------------- */

if(document.querySelector('input[name="breath"]:checked')?.value === "yes"){

    score += 3;

}


/* -----------------------
   Swelling
----------------------- */

if(document.querySelector('input[name="swelling"]:checked')?.value === "yes"){

    score += 3;

}


/* -----------------------
   Cholesterol
----------------------- */

if(document.querySelector('input[name="cholesterol"]:checked')?.value === "yes"){

    score += 2;

}


/* -----------------------
   Family History
----------------------- */

const family = document.querySelector('input[name="family"]:checked')?.value;

switch(family){

    case "yes":
        score += 2;
        break;

    case "no":
        score += 1;
        break;

}


/* -----------------------
   Daily Activity
----------------------- */

const activity = document.querySelector('input[name="activity"]:checked')?.value;

switch(activity){

    case "sitting":
        score += 3;
        break;

    case "standing":
        score += 2;
        break;

    case "physical":
        score += 0;
        break;

}


/* -----------------------
   Diet
----------------------- */

const diet = document.querySelector('input[name="diet"]:checked')?.value;

switch(diet){

    case "healthy":
        score += 0;
        break;

    case "mixed":
        score += 1;
        break;

    case "fastfood":
        score += 3;
        break;

    case "processed":
        score += 4;
        break;

}
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