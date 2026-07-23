const score = Number(localStorage.getItem("heartguardScore")) || 0;

// Elements
const scoreText = document.getElementById("score");
const riskLevel = document.getElementById("riskLevel");
const circle = document.querySelector(".risk-circle");
const riskFill = document.getElementById("riskFill");
const riskPercent = document.getElementById("riskPercent");
const reasonList = document.getElementById("reasonList");

// Display score
scoreText.textContent = score;

// Progress bar
const percentage = Math.min(Math.round((score / 40) * 100), 100);

riskFill.style.width = percentage + "%";
riskPercent.textContent = `${percentage}% estimated cardiovascular risk factors`;

// Risk classification
if (score <= 10) {

    riskLevel.textContent = "🟢 Low Risk";
    circle.style.background = "#4CAF50";
    riskFill.style.background = "#4CAF50";

    reasonList.innerHTML = `
        <li>Your current lifestyle shows relatively few cardiovascular risk factors.</li>
        <li>Maintaining healthy habits can help keep your risk low.</li>
    `;

} else if (score <= 19) {

    riskLevel.textContent = "🟡 Mild Risk";
    circle.style.background = "#FBC02D";
    riskFill.style.background = "#FBC02D";

    reasonList.innerHTML = `
        <li>Some lifestyle habits may increase your future cardiovascular risk.</li>
        <li>Improving your diet and increasing physical activity may reduce your risk.</li>
    `;

} else if (score <= 29) {

    riskLevel.textContent = "🟠 Moderate Risk";
    circle.style.background = "#F57C00";
    riskFill.style.background = "#F57C00";

    reasonList.innerHTML = `
        <li>Several cardiovascular risk factors were identified.</li>
        <li>Monitoring blood pressure, blood glucose, and body weight is recommended.</li>
    `;

} else {

    riskLevel.textContent = "🔴 High Risk";
    circle.style.background = "#D32F2F";
    riskFill.style.background = "#D32F2F";

    reasonList.innerHTML = `
        <li>Multiple significant cardiovascular risk factors were detected.</li>
        <li>Consider discussing these results with a healthcare professional.</li>
    `;
}

// Personalized recommendations
const tips = [];

tips.push("🏃 Exercise at least 150 minutes per week.");

if (score >= 8) {
    tips.push("🥤 Reduce sugary beverages and processed foods.");
}

if (score >= 10) {
    tips.push("🩺 Monitor your blood pressure regularly.");
}

if (score >= 15) {
    tips.push("🩸 Monitor your blood glucose levels if you have diabetes or prediabetes.");
}

if (score >= 20) {
    tips.push("👨‍⚕️ Schedule a medical evaluation with a healthcare professional.");
}

document.querySelector(".recommendations ul").innerHTML =
    tips.map(tip => `<li>${tip}</li>`).join("");

const answers =
JSON.parse(localStorage.getItem("heartguardAnswers"));

const container =
document.getElementById("personalizedAnalysis");

const age =
analysisData.age[answers.age];

container.innerHTML += `
<div class="analysis-card">
<h2>${age.title}</h2>
<p><strong>Population Insight</strong></p>
<p>${age.average}</p>
<p><strong>Why it matters</strong></p>
<p>${age.explanation}</p>
</div>
`;

let bmiKey;

if(answers.bmi<18.5)
    bmiKey="underweight";
else if(answers.bmi<25)
    bmiKey="healthy";
else if(answers.bmi<30)
    bmiKey="overweight";
else
    bmiKey="obese";

const bmiInfo=
analysisData.bmi[bmiKey];

container.innerHTML+=`
<div class="analysis-card">
<h2>${bmiInfo.title}</h2>
<p><strong>Population Insight</strong></p>
<p>${bmiInfo.average}</p>
<p><strong>Why it matters</strong></p>
<p>${bmiInfo.explanation}</p>
</div>
`;

["exercise", "smoking", "bp", "cholesterol", "family"].forEach(category => {
    const info = analysisData[category]?.[answers[category]];
    if (!info) return;

    container.innerHTML += `
        <div class="analysis-card">
            <h2>${info.title}</h2>
            <p><strong>Population Insight</strong></p>
            <p>${info.average}</p>
            <p><strong>Why it matters</strong></p>
            <p>${info.explanation}</p>
        </div>
    `;
});
