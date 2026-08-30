const score = Number(localStorage.getItem("heartguardScore")) || 0;
const MAX_SCORE = 51;
const answers = JSON.parse(localStorage.getItem("heartguardAnswers") || "{}");

// ==========================
// Elements
// ==========================
const scoreText = document.getElementById("score");
const scoreOutOf = document.getElementById("scoreOutOf");
const riskLevel = document.getElementById("riskLevel");
const circle = document.querySelector(".risk-circle");
const riskMarker = document.getElementById("riskMarker");
const rawScoreText = document.getElementById("rawScoreText");
const comparisonEl = document.getElementById("comparisonText");

// ==========================
// Score display
// ==========================
if (scoreText) scoreText.textContent = score;
if (scoreOutOf) scoreOutOf.textContent = `out of ${MAX_SCORE}`;

const percentage = Math.min(Math.round((score / MAX_SCORE) * 100), 100);
if (riskMarker) riskMarker.style.left = `calc(${percentage}% - 2px)`;

if (rawScoreText) {
    rawScoreText.textContent = `Risk factor score: ${score} out of ${MAX_SCORE}`;
}

// TODO: replace AVG_SCORE with a real average once Firebase data is collected
const AVG_SCORE = 15;
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

// ==========================
// Risk classification
// ==========================
if (score <= 12) {
    riskLevel.textContent = "🟢 Low Risk";
    circle.style.background = "#4CAF50";
} else if (score <= 24) {
    riskLevel.textContent = "🟡 Mild Risk";
    circle.style.background = "#FBC02D";
} else if (score <= 38) {
    riskLevel.textContent = "🟠 Moderate Risk";
    circle.style.background = "#F57C00";
} else {
    riskLevel.textContent = "🔴 High Risk";
    circle.style.background = "#D32F2F";
}

// ==========================
// Prevention tips (enhanced with outcomes + projected score)
// ==========================
const tipsData = [
    { threshold: 0, action: "🏃 Exercise at least 150 minutes per week.", outcome: "can lower resting blood pressure and strengthen your heart within a few months.", pointsReducible: 3 },
    { threshold: 11, action: "🥤 Reduce sugary beverages and processed foods.", outcome: "helps stabilize blood sugar and reduces strain on your blood vessels within weeks.", pointsReducible: 4 },
    { threshold: 23, action: "🩺 Monitor your blood pressure regularly.", outcome: "catches dangerous spikes early, before they cause lasting damage.", pointsReducible: 3 },
    { threshold: 23, action: "🩸 Monitor your blood glucose levels if you have diabetes or prediabetes.", outcome: "slows the vascular damage linked to diabetic cardiomyopathy.", pointsReducible: 4 },
    { threshold: 36, action: "👨‍⚕️ Schedule a medical evaluation with a healthcare professional.", outcome: "gives you a personalized, clinically accurate risk picture beyond this screening.", pointsReducible: 0 }
];
const answerBasedTips = [];

if (answers.smoking === "daily" || answers.smoking === "sometimes") {
    answerBasedTips.push({ action: "🚭 Consider a plan to quit smoking.", outcome: "even partial reduction significantly lowers your risk of heart attack and stroke over time." });
}

if (answers.diet === "processed" || answers.diet === "eatingout") {
    answerBasedTips.push({ action: "🍽️ Try replacing 2–3 meals a week with home-cooked options.", outcome: "reduces your intake of excess sodium and unhealthy fats that strain your heart." });
}

if (answers.sugar === "daily" || answers.sugar === "3daily") {
    answerBasedTips.push({ action: "🥤 Cut back on sugary drinks specifically — even switching every other one to water helps.", outcome: "reduces blood sugar spikes linked to insulin resistance." });
}

if (answers.activity === "sitting") {
    answerBasedTips.push({ action: "🧍 Stand or walk for a few minutes every hour.", outcome: "offsets some of the cardiovascular risk associated with prolonged sitting." });
}

if (answers.exercise === "0" || answers.exercise === "1") {
    answerBasedTips.push({ action: "🚶 Start with short walks a few times a week and build up gradually.", outcome: "is often more sustainable than an intense routine and still meaningfully lowers risk." });
}

if (answers.diabetes === "type2" || answers.diabetes === "prediabetes") {
    answerBasedTips.push({ action: "🩸 Pair diet changes with regular glucose monitoring.", outcome: "helps catch and correct blood sugar spikes before they cause lasting vascular damage." });
}

if (answers.bp === "yes" || answers.bp === "unsure") {
    answerBasedTips.push({ action: "🧂 Reduce sodium intake, especially from processed and street food.", outcome: "can noticeably lower blood pressure within a few weeks." });
}

const applicableTips = tipsData.filter(t => score >= t.threshold);
const totalReducible = applicableTips.reduce((sum, t) => sum + t.pointsReducible, 0);
const projectedScore = Math.max(0, score - totalReducible);
const projectedPct = Math.round((projectedScore / MAX_SCORE) * 100);

const preventionListEl = document.querySelector(".recommendations ul");
if (preventionListEl) {
    preventionListEl.innerHTML =
        applicableTips.map(t => `<li><strong>${t.action}</strong><br><span class="tip-outcome">→ This ${t.outcome}</span></li>`).join("")
        + answerBasedTips.map(t => `<li><strong>${t.action}</strong><br><span class="tip-outcome">→ This ${t.outcome}</span></li>`).join("")
        + (totalReducible > 0
            ? `<li class="tip-projection">📉 If you act on all of these, your risk factor score could drop from ${score} to approximately ${projectedScore} out of ${MAX_SCORE} (~${projectedPct}%).</li>`
            : "");
}

// ==========================
// Donut chart data (good = gray, needs attention = color)
// ==========================
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

        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", "100");
        c.setAttribute("cy", "100");
        c.setAttribute("r", radius);
        c.setAttribute("fill", "none");
        c.setAttribute("stroke", cat.color);
        c.setAttribute("stroke-width", "22");
        c.setAttribute("stroke-dasharray", `${segmentLength - gap} ${circumference - (segmentLength - gap)}`);
        c.setAttribute("stroke-dashoffset", String(-offset));
        c.setAttribute("transform", "rotate(-90 100 100)");
        c.classList.add("donut-segment");
        if (cat.good) c.classList.add("good"); // good = grayscale

        svg.appendChild(c);
        offset += segmentLength;

        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `
            <span class="legend-dot ${cat.good ? "good" : ""}" style="background:${cat.color}"></span>
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

// ==========================
// Category risk points (mirrors assessment.js scoring)
// ==========================
const categoryPointTables = {
    age: { under30: 0, "30-39": 1, "40-49": 2, "50-59": 3, "60-69": 4, "70plus": 5 },
    bmi: { underweight: 1, healthy: 0, overweight: 2, obese: 3 },
    diabetes: { type1: 3, type2: 4, prediabetes: 2, no: 0 },
    exercise: { "5": 0, "3": 1, "1": 2, "0": 3 },
    diet: { homecooked: 0, mostlyhome: 1, eatingout: 3, processed: 4 },
    activity: { sitting: 3, standing: 2, physical: 0 },
    sugar: { never: 0, "1-2": 1, "3-6": 2, daily: 3, "3daily": 4 },
    smoking: { never: 0, former: 1, sometimes: 2, daily: 3 },
    bp: { yes: 3, no: 0, unsure: 1 },
    cholesterol: { yes: 2, no: 0 },
    family: { yes: 2, no: 0, unsure: 0 }
};

function toggleFlip(index) {
    const inner = document.getElementById(`flipInner${index}`);
    if (inner) inner.classList.toggle("flipped");
}

function toggleAccordion(index) {
    const body = document.getElementById(`accBody${index}`);
    const icon = document.getElementById(`accIcon${index}`);
    if (!body) return;
    const isOpen = body.classList.toggle("open");
    icon.textContent = isOpen ? "▾" : "▸";
}

// ==========================
// Gender-aware Mexico stat picker
// ==========================
function getGenderedStat(stat, gender) {
    if (gender === "female" && stat.mexicoWomen !== undefined) {
        return { mx: stat.mexicoWomen, gl: stat.globalWomen, label: stat.labelWomen || stat.label, mxNote: stat.mexicoWomenNote, glNote: stat.globalWomenNote };
    }
    if (gender === "male" && stat.mexicoMen !== undefined) {
        return { mx: stat.mexicoMen, gl: stat.globalMen, label: stat.labelMen || stat.label, mxNote: stat.mexicoMenNote, glNote: stat.globalMenNote };
    }
    if (stat.mexico !== undefined) {
        return { mx: stat.mexico, gl: stat.global, label: stat.label, mxNote: stat.mexicoNote, glNote: stat.globalNote };
    }
    if (stat.mexicoWomen !== undefined) {
        return { mx: stat.mexicoWomen, gl: stat.globalWomen, label: stat.labelWomen || stat.label, mxNote: stat.mexicoWomenNote, glNote: stat.globalWomenNote };
    }
    if (stat.mexicoMen !== undefined) {
        return { mx: stat.mexicoMen, gl: stat.globalMen, label: stat.labelMen || stat.label, mxNote: stat.mexicoMenNote, glNote: stat.globalMenNote };
    }
    return null;
}

// ==========================
// Personalized Analysis (flip cards + accordion)
// ==========================
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

    items.sort((a, b) => b.points - a.points);

    const HIGH_RISK_THRESHOLD_COUNT = 4;
    const highlighted = items.slice(0, HIGH_RISK_THRESHOLD_COUNT).filter(i => i.points > 0);
    window.highlightedFactors = highlighted;
    const rest = items.filter(i => !highlighted.includes(i));

    // Flip cards: front = mechanism ("why this matters"), back = result + tip
       highlightsEl.innerHTML = highlighted.map((item, i) => {
        const mech = categoryMechanisms[item.category] || {};
        const stat = typeof mexicodata !== "undefined" ? mexicodata[item.category] : null;
        const g = stat ? getGenderedStat(stat, answers.gender) : null;

        const evidenceLine = g
            ? `<span class="evidence-note">(Statistic: ${g.mx}${stat.unit === "%" ? "%" : " " + stat.unit} in Mexico)</span>`
            : "";

        const statLine = g
            ? `<p class="stat-line">🇲🇽 In Mexico: ${g.label} is ${g.mx}${stat.unit === "%" ? "%" : " " + stat.unit}.</p>`
            : "";

        return `
        <div class="flip-card" onclick="toggleFlip(${i})">
            <div class="flip-card-inner" id="flipInner${i}">
                <div class="flip-card-front">
                    <h4>⚠️ ${item.title}</h4>
                    <p><strong>${item.average}</strong> ${evidenceLine}</p>
                    <p>${item.explanation}</p>
                    <p class="flip-hint">🔄 Tap to see why this matters ▾</p>
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

    // Accordion for the rest
    accordionEl.innerHTML = rest.map((item, i) => {
        const stat = typeof mexicodata !== "undefined" ? mexicodata[item.category] : null;
        const g = stat ? getGenderedStat(stat, answers.gender) : null;
        const statLine = g
            ? `<p class="stat-line">🇲🇽 In Mexico: ${g.label} is ${g.mx}${stat.unit === "%" ? "%" : " " + stat.unit}.</p>`
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

// ==========================
// Mexico stat panel (top risk factors only, gender-aware)
// ==========================
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

    const gender = answers.gender;

    card.innerHTML = `
        <h4>🇲🇽 How Your Risk Factors Compare in Mexico</h4>
        ${statsToShow.map(({ stat }) => {

            const g = getGenderedStat(stat, gender);
            if (!g) return "";

            const maxVal = Math.max(g.mx, g.gl || g.mx) * 1.2;
            const unitSuffix = stat.unit === "%" ? "%" : ` ${stat.unit}`;

            return `
            <div class="mexico-stat-block">
                <p class="mexico-stat-label">${g.label}</p>
                <div class="stat-bar-row">
                    <span class="stat-bar-tag">🇲🇽 Mexico</span>
                    <div class="stat-bar-track"><div class="stat-bar-fill mexico" style="width:${(g.mx / maxVal) * 100}%"></div></div>
                    <span>${g.mx}${unitSuffix}</span>
                </div>
                ${g.mxNote ? `<p class="mexico-stat-unitnote">${g.mxNote}</p>` : ""}
                ${g.gl !== undefined ? `
                <div class="stat-bar-row">
                    <span class="stat-bar-tag">🌍 Global</span>
                    <div class="stat-bar-track"><div class="stat-bar-fill global" style="width:${(g.gl / maxVal) * 100}%"></div></div>
                    <span>${g.gl}${unitSuffix}</span>
                </div>
                ${g.glNote ? `<p class="mexico-stat-unitnote">${g.glNote}</p>` : ""}
                ` : ""}
                <p class="mexico-stat-note">${stat.note}</p>
            </div>
            `;
        }).join("")}
    `;

    card.style.display = "block";
}

// ==========================
// Disease/Condition explanations (severity scales with # of matched factors)
// ==========================
const conditionData = {

    cad: {
        title: "❤️ Coronary Artery Disease",
        general: "Coronary artery disease develops when plaque builds up inside the arteries that supply blood to the heart, gradually narrowing them and restricting blood flow.",
        relatedFactors: ["cholesterol", "bp", "smoking", "diet", "bmi"]
    },
    hf: {
        title: "🫀 Heart Failure",
        general: "Heart failure occurs when the heart muscle becomes too weak or stiff to pump blood efficiently, often as a result of prolonged strain from other conditions.",
        relatedFactors: ["bp", "bmi", "exercise", "activity", "diabetes"]
    },
    stroke: {
        title: "🧠 Stroke",
        general: "A stroke happens when blood flow to part of the brain is interrupted, often due to a blocked or burst blood vessel — frequently linked to long-term vascular damage.",
        relatedFactors: ["bp", "smoking", "cholesterol", "diabetes"]
    },
    dcm: {
        title: "🩸 Diabetic Cardiomyopathy",
        general: "Diabetic cardiomyopathy is heart muscle damage caused by prolonged high blood sugar, which leads to stiffening and scarring (fibrosis) of heart tissue over time.",
        relatedFactors: ["diabetes", "sugar", "diet"]
    }

};

const factorLabels = {
    cholesterol: "high cholesterol",
    bp: "high blood pressure",
    smoking: "smoking",
    diet: "your diet",
    bmi: "your BMI",
    exercise: "low exercise levels",
    activity: "low daily activity",
    diabetes: "diabetes",
    sugar: "sugary beverage intake"
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

        const count = matchedFactors.length;
        let severityNote = "";
        let consequenceNote = "";

        if (count === 0) {
            severityNote = "Your current answers don't show strong risk indicators for this condition — keep up the healthy habits.";
        } else if (count === 1) {
            severityNote = `One factor from your answers may contribute to this condition.`;
            consequenceNote = "Addressing this single factor could meaningfully reduce your risk here.";
        } else if (count <= 3) {
            severityNote = `Several factors (${count}) from your answers combine to raise your risk for this condition.`;
            consequenceNote = "When multiple risk factors act together, they often compound each other — for example, high blood pressure combined with high cholesterol accelerates artery damage faster than either alone.";
        } else {
            severityNote = `A high number of factors (${count}) from your answers are associated with this condition.`;
            consequenceNote = "With this many overlapping factors, the combined strain on your cardiovascular system is significantly higher than any single factor would suggest — addressing even one or two could meaningfully lower the compounded risk.";
        }

        const labels = matchedFactors.map(f => factorLabels[f] || f);
        const labelText = labels.length
            ? (labels.length === 1 ? labels[0] : labels.slice(0, -1).join(", ") + " and " + labels[labels.length - 1])
            : "";

        const factorLine = labels.length ? `Factors identified: ${labelText}.` : "";

        textEl.innerHTML = `
            ${data.general}<br><br>
            <strong>${severityNote}</strong> ${factorLine}<br>
            ${consequenceNote ? `<span class="consequence-note">${consequenceNote}</span>` : ""}
        `;

    });

}

// ==========================
// Retake
// ==========================
function retakeAssessment() {
    localStorage.removeItem("heartguardScore");
    localStorage.removeItem("heartguardAnswers");
    window.location.href = "assessment.html";
}

// ==========================
// Run everything
// ==========================
renderDonutChart();
renderFactorSnapshot();
renderAnalysis();
renderMexicoStat();
renderConditions();