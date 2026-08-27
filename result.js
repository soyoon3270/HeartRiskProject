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
if (scoreOutOf) scoreOutOf.textContent = "out of 51";

// Display score
scoreText.textContent = score;

// Risk position on gradient bar
const percentage = Math.min(Math.round((score / 51) * 100), 100);
if (riskMarker) riskMarker.style.left = `calc(${percentage}% - 2px)`;
// TODO: replace AVG_SCORE with a real average once Firebase data is collected
const AVG_SCORE = 15;
const comparisonEl = document.getElementById("comparisonText");

if (comparisonEl) {
    const diff = Math.round(((score - AVG_SCORE) / AVG_SCORE) * 100);
    if (diff > 0) {
        comparisonEl.textContent = `Your score is approximately ${diff}% higher than the average score among users so far.`;
    } else if (diff < 0) {
        comparisonEl.textContent = `Your score is approximately ${Math.abs(diff)}% lower than the average score among users so far.`;
    } else {
        comparisonEl.textContent = `Your score matches the average score among users so far.`;
    }
}
const rawScoreText = document.getElementById("rawScoreText");
const MAX_SCORE = 51;

if (rawScoreText) {
    rawScoreText.textContent = `Risk factor score: ${score} out of ${MAX_SCORE}`;
}
// Risk classification
if(score <= 12){

    riskLevel.textContent = "🟢 Low Risk";
    circle.style.background = "#4CAF50";

}
else if(score <= 24){

    riskLevel.textContent = "🟡 Mild Risk";
    circle.style.background = "#FBC02D";

}
else if(score <= 38){

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
function renderFactorSnapshot() {

    const onTrackList = document.getElementById("onTrackList");
    const needsAttentionList = document.getElementById("needsAttentionList");
    if (!onTrackList || !needsAttentionList) return;

    donutCategories.forEach(cat => {
        const li = document.createElement("li");
        li.textContent = cat.label;
        if (cat.good) onTrackList.appendChild(li);
        else needsAttentionList.appendChild(li);
    });

}

renderFactorSnapshot();

renderDonutChart();

localStorage.setItem("heartguardAnswers", JSON.stringify(answers));
function retakeAssessment() {
    localStorage.removeItem("heartguardScore");
    localStorage.removeItem("heartguardAnswers");
    window.location.href = "assessment.html";
}

// ==========================
// Category risk points (mirrors assessment.js scoring)
// ==========================
const categoryPointTables = {
    age: { under30:0, "30-39":1, "40-49":2, "50-59":3, "60-69":4, "70plus":5 },
    bmi: { underweight:1, healthy:0, overweight:2, obese:3 },
    diabetes: { type1:3, type2:4, prediabetes:2, no:0 },
    exercise: { "5":0, "3":1, "1":2, "0":3 },
    diet: { homecooked:0, mostlyhome:1, eatingout:3, processed:4 },
    activity: { sitting:3, standing:2, physical:0 },
    sugar: { never:0, "1-2":1, "3-6":2, daily:3, "3daily":4 },
    smoking: { never:0, former:1, sometimes:2, daily:3 },
    bp: { yes:3, no:0, unsure:1 },
    cholesterol: { yes:2, no:0 },
    family: { yes:2, no:0, unsure:0 }
};
function toggleFlip(index) {
    // Only needed for touch devices; hover handles desktop automatically via CSS
    const inner = document.getElementById(`flipInner${index}`);
    if (inner) inner.classList.toggle("flipped");
}
function renderAnalysis() {

    const highlightsEl = document.getElementById("analysisHighlights");
    const accordionEl = document.getElementById("analysisAccordion");
    if (!highlightsEl || !accordionEl || typeof analysisData === "undefined") return;

    const items = [];

    Object.keys(categoryPointTables).forEach(category => {

        const answerValue = answers[category];
        if (!answerValue) return;

        const points = categoryPointTables[category][answerValue] ?? 0;
        const data = analysisData[category]?.[answerValue];
        if (!data) return;

        items.push({ category, points, ...data });

    });

    // Sort by risk points, highest first
    items.sort((a, b) => b.points - a.points);

    const HIGH_RISK_THRESHOLD_COUNT = 4;
    const highlighted = items.slice(0, HIGH_RISK_THRESHOLD_COUNT).filter(i => i.points > 0);
    window.highlightedFactors = highlighted; // 다른 함수에서 재사용하기 위해 저장
    const rest = items.filter(i => !highlighted.includes(i));
    // Render highlighted cards as flip cards
    highlightsEl.innerHTML = highlighted.map((item, i) => {
        const mech = categoryMechanisms[item.category] || {};
        const stat = mexicodata[item.category];
        const statLine = stat
            ? `<p class="stat-line">🇲🇽 In Mexico: ${stat.label || stat.labelWomen} is ${stat.mexico ?? stat.mexicoWomen}${stat.unit === "%" ? "%" : " " + stat.unit}.</p>`
            : "";

        return `
        <div class="flip-card" onclick="toggleFlip(${i})">
            <div class="flip-card-inner" id="flipInner${i}">
                <div class="flip-card-front">
                    <h4>⚠️ ${item.title}</h4>
                    <p><strong>${item.average}</strong></p>
                    <p>${item.explanation}</p>
                    <p class="flip-hint">🔄 Tap or hover for more</p>
                </div>
                <div class="flip-card-back">
                    <h4>🫀 Why this matters</h4>
                    <p>${mech.mechanism || "This factor contributes to cardiovascular strain over time."}</p>
                    <h4>✅ If you improve this</h4>
                    <p>${mech.future || "Addressing this factor can meaningfully lower your long-term risk."}</p>
                    ${statLine}
                </div>
            </div>
        </div>
        `;
    }).join("");

       // Render accordion for the rest
    accordionEl.innerHTML = rest.map((item, i) => {
        const stat = mexicodata[item.category];
        const statLine = stat
            ? `<p class="stat-line">🇲🇽 In Mexico: ${stat.label || stat.labelWomen} is ${stat.mexico ?? stat.mexicoWomen}${stat.unit === "%" ? "%" : " " + stat.unit}.</p>`
            : "";

        return `
        <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(${i})">
                <span>${item.title}</span>
                <span id="accIcon${i}">▸</span>
            </button>
            <div class="accordion-body" id="accBody${i}">
                <p>${item.average}</p>
                <p>${item.explanation}</p>
                ${statLine}
            </div>
        </div>
        `;
    }).join("");

}
function renderMexicoStat() {

    const card = document.getElementById("mexicodataCard");
    if (!card || typeof mexicodata === "undefined") return;

    const highlighted = window.highlightedFactors || [];
    const statsToShow = highlighted
        .map(item => ({ category: item.category, stat: mexicodata[item.category] }))
        .filter(entry => entry.stat);

    if (statsToShow.length === 0) {
        card.style.display = "none";
        return;
    }

    card.innerHTML = `
        <h4>🇲🇽 How Your Top Risk Factors Compare in Mexico</h4>
        ${statsToShow.map(({ stat }) => {

                        const label = stat.label || stat.labelWomen;
            const mx = stat.mexico ?? stat.mexicoWomen;
            const gl = stat.global ?? stat.globalWomen;
            const mxNote = stat.mexicoNote || stat.mexicoWomenNote;
            const glNote = stat.globalNote || stat.globalWomenNote;
            const maxVal = Math.max(mx, gl || mx) * 1.2;
            const unitSuffix = stat.unit === "%" ? "%" : ` ${stat.unit}`;

                    return `
            <div class="mexico-stat-block">
                <p class="mexico-stat-label">${label}</p>
                <div class="stat-bar-row">
                    <span class="stat-bar-tag">🇲🇽 Mexico</span>
                    <div class="stat-bar-track"><div class="stat-bar-fill mexico" style="width:${(mx / maxVal) * 100}%"></div></div>
                    <span>${mx}${unitSuffix}</span>
                </div>
                ${mxNote ? `<p class="mexico-stat-unitnote">${mxNote}</p>` : ""}
                ${gl !== undefined ? `
                <div class="stat-bar-row">
                    <span class="stat-bar-tag">🌍 Global</span>
                    <div class="stat-bar-track"><div class="stat-bar-fill global" style="width:${(gl / maxVal) * 100}%"></div></div>
                    <span>${gl}${unitSuffix}</span>
                </div>
                ${glNote ? `<p class="mexico-stat-unitnote">${glNote}</p>` : ""}
                ` : ""}
                <p class="mexico-stat-note">${stat.note}</p>
            </div>
        `;          
        
        }).join("")}
    `;

    card.style.display = "block"; 
}

function toggleAccordion(index) {
    const body = document.getElementById(`accBody${index}`);
    const icon = document.getElementById(`accIcon${index}`);
    if (!body) return;
    const isOpen = body.classList.toggle("open");
    icon.textContent = isOpen ? "▾" : "▸";
}

// ==========================
// Disease/Condition explanations
// ==========================
const conditionData = {

    cad:{
        title:"❤️ Coronary Artery Disease",
        general:"Coronary artery disease develops when plaque builds up inside the arteries that supply blood to the heart, gradually narrowing them and restricting blood flow.",
        relatedFactors:["cholesterol", "bp", "smoking", "diet", "bmi"]
    },

    hf:{
        title:"🫀 Heart Failure",
        general:"Heart failure occurs when the heart muscle becomes too weak or stiff to pump blood efficiently, often as a result of prolonged strain from other conditions.",
        relatedFactors:["bp", "bmi", "exercise", "activity", "diabetes"]
    },

    stroke:{
        title:"🧠 Stroke",
        general:"A stroke happens when blood flow to part of the brain is interrupted, often due to a blocked or burst blood vessel — frequently linked to long-term vascular damage.",
        relatedFactors:["bp", "smoking", "cholesterol", "diabetes"]
    },

    dcm:{
        title:"🩸 Diabetic Cardiomyopathy",
        general:"Diabetic cardiomyopathy is heart muscle damage caused by prolonged high blood sugar, which leads to stiffening and scarring (fibrosis) of heart tissue over time.",
        relatedFactors:["diabetes", "sugar", "diet"]
    }

};

const factorLabels = {
    cholesterol:"high cholesterol",
    bp:"high blood pressure",
    smoking:"smoking",
    diet:"your diet",
    bmi:"your BMI",
    exercise:"low exercise levels",
    activity:"low daily activity",
    diabetes:"diabetes",
    sugar:"sugary beverage intake"
};

function renderConditions() {

    Object.keys(conditionData).forEach(key => {

        const textEl = document.getElementById(`${key}Text`);
        if (!textEl) return;

        const data = conditionData[key];

        const matchedFactors = data.relatedFactors.filter(factor => {
            const answerValue = answers[factor];
            if (!answerValue) return false;
            const points = categoryPointTables[factor]?.[answerValue] ?? 0;
            return points > 0;
        });

        let personalizedNote = "";

        if (matchedFactors.length > 0) {
            const labels = matchedFactors.map(f => factorLabels[f] || f);
            const labelText = labels.length === 1
                ? labels[0]
                : labels.slice(0, -1).join(", ") + " and " + labels[labels.length - 1];

            personalizedNote = `Based on your answers, factors like ${labelText} may increase your risk for this condition.`;
        } else {
            personalizedNote = "Your current answers don't show strong risk indicators for this condition — keep up the healthy habits.";
        }

        textEl.innerHTML = `${data.general} <br><br> <strong>${personalizedNote}</strong>`;

    });

}

renderAnalysis();
renderMexicoStat();
renderConditions();