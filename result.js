const score = Number(localStorage.getItem("heartguardScore")) || 0;

// Elements
const scoreText = document.getElementById("score");
const scoreOutOf = document.getElementById("scoreOutOf");
const riskLevel = document.getElementById("riskLevel");
const circle = document.querySelector(".risk-circle");
const riskMarker = document.getElementById("riskMarker");
const reasonList = document.getElementById("reasonList");

// Display score
scoreText.textContent = score;
if (scoreOutOf) scoreOutOf.textContent = "out of 49";

// Display score
scoreText.textContent = score;

// Risk position on gradient bar
const percentage = Math.min(Math.round((score / 49) * 100), 100);
if (riskMarker) riskMarker.style.left = `calc(${percentage}% - 2px)`;
document.getElementById("rawScoreText").textContent =
    `Your score: ${score} / 49 (${percentage}% estimated risk)`;
// Risk classification
if(score <= 11){

    riskLevel.textContent = "🟢 Low Risk";
    circle.style.background = "#4CAF50";

}
else if(score <= 23){

    riskLevel.textContent = "🟡 Mild Risk";
    circle.style.background = "#FBC02D";

}
else if(score <= 36){

    riskLevel.textContent = "🟠 Moderate Risk";
    circle.style.background = "#F57C00";

}
else{

    riskLevel.textContent = "🔴 High Risk";
    circle.style.background = "#D32F2F";

}

// Personalized recommendations
const tips = [];

tips.push("🏃 Exercise at least 150 minutes per week.");

if (score >= 11) {
    tips.push("🥤 Reduce sugary beverages and processed foods.");
}

if (score >= 23) {
    tips.push("🩺 Monitor your blood pressure regularly.");
}

if (score >= 23) {
    tips.push("🩸 Monitor your blood glucose levels if you have diabetes or prediabetes.");
}

if (score >= 36) {
    tips.push("👨‍⚕️ Schedule a medical evaluation with a healthcare professional.");
}

document.querySelector(".recommendations ul").innerHTML =
    tips.map(tip => `<li>${tip}</li>`).join("");

const answers = JSON.parse(localStorage.getItem("heartguardAnswers") || "{}");

const donutCategories = [
    { key: "bmi", label: "BMI", color: "#4CAF50", good: answers.bmi === "healthy" },
    { key: "diet", label: "Eating Habits", color: "#F57C00", good: answers.diet === "homecooked" || answers.diet === "mostlyhome" },
    { key: "exercise", label: "Exercise Habits", color: "#1E88E5", good: answers.exercise === "5" || answers.exercise === "3" },
    { key: "smoking", label: "Smoking", color: "#8E24AA", good: answers.smoking === "never" || answers.smoking === "former" },
    { key: "bp", label: "Blood Pressure", color: "#D32F2F", good: answers.bp === "no" },
    { key: "sugar", label: "Sugar Intake", color: "#FBC02D", good: answers.sugar === "never" || answers.sugar === "1-2" },
    { key: "activity", label: "Daily Activity", color: "#00897B", good: answers.activity === "physical" || answers.activity === "standing" }
];

function renderDonutChart() {

    const svg = document.getElementById("donutChart");
    const legend = document.getElementById("donutLegend");
    if (!svg || !legend) return;

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const segmentLength = circumference / donutCategories.length;
    const gap = 4;

    let offset = 0;

    donutCategories.forEach(cat => {

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "100");
        circle.setAttribute("cy", "100");
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", cat.color);
        circle.setAttribute("stroke-width", "22");
        circle.setAttribute("stroke-dasharray", `${segmentLength - gap} ${circumference - (segmentLength - gap)}`);
        circle.setAttribute("stroke-dashoffset", String(-offset));
        circle.setAttribute("transform", "rotate(-90 100 100)");
        circle.classList.add("donut-segment");
        if (!cat.good) circle.classList.add("bad");

        svg.appendChild(circle);
        offset += segmentLength;

        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `
            <span class="legend-dot ${cat.good ? "" : "bad"}" style="background:${cat.color}"></span>
            <span>${cat.label} — ${cat.good ? "Good" : "Needs attention"}</span>
        `;
        legend.appendChild(item);

    });

}

renderDonutChart();

localStorage.setItem("heartguardAnswers", JSON.stringify(answers));
function retakeAssessment() {
    localStorage.removeItem("heartguardScore");
    localStorage.removeItem("heartguardAnswers");
    window.location.href = "assessment.html";
}