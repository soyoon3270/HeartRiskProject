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
if(score <= 11){

    riskLevel.textContent = "🟢 Low Risk";
    circle.style.background = "#4CAF50";

}
else if(score <= 21){

    riskLevel.textContent = "🟡 Mild Risk";
    circle.style.background = "#FBC02D";

}
else if(score <= 32){

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