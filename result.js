const score = Number(localStorage.getItem("heartguardScore")) || 0;


// Risk elements
const scoreText = document.getElementById("score");
const riskLevel = document.getElementById("riskLevel");
const circle = document.querySelector(".risk-circle");
const riskFill = document.getElementById("riskFill");
const riskPercent = document.getElementById("riskPercent");
const reasonList = document.getElementById("reasonList");


// Show score
scoreText.textContent = score;


// Risk percentage
let percentage = Math.min(Math.round((score / 40) * 100), 100);

riskFill.style.width = percentage + "%";
riskPercent.textContent = percentage + "% estimated cardiovascular risk factors";


// Risk classification

if(score <= 10){

    riskLevel.textContent = "🟢 Low Risk";
    circle.style.background = "#4CAF50";
    riskFill.style.background = "#4CAF50";

    reasonList.innerHTML = `
        <li>Your current lifestyle shows fewer major risk factors.</li>
        <li>Continue maintaining healthy habits.</li>
    `;

}

else if(score <= 19){

    riskLevel.textContent = "🟡 Mild Risk";
    circle.style.background = "#FBC02D";
    riskFill.style.background = "#FBC02D";

    reasonList.innerHTML = `
        <li>Some lifestyle factors may increase cardiovascular risk.</li>
        <li>Consider improving diet and exercise habits.</li>
    `;

}

else if(score <= 29){

    riskLevel.textContent = "🟠 Moderate Risk";
    circle.style.background = "#F57C00";
    riskFill.style.background = "#F57C00";

    reasonList.innerHTML = `
        <li>Multiple risk factors were identified.</li>
        <li>Monitor your health and lifestyle regularly.</li>
    `;

}

else{

    riskLevel.textContent = "🔴 High Risk";
    circle.style.background = "#D32F2F";
    riskFill.style.background = "#D32F2F";

    reasonList.innerHTML = `
        <li>Several important cardiovascular risk factors were found.</li>
        <li>Consider consulting a healthcare professional.</li>
    `;

}



// Recommendations

const tips = [];

tips.push("🏃 Exercise at least 150 minutes per week.");


if(score >= 8){
    tips.push("🥤 Reduce sugary beverages.");
}


if(score >= 10){
    tips.push("🩺 Monitor your blood pressure regularly.");
}


if(score >= 15){
    tips.push("🧑‍⚕️ Schedule a medical evaluation.");
}


document.querySelector(".recommendations ul").innerHTML =
    tips.map(t => `<li>${t}</li>`).join("");