const score = Number(localStorage.getItem("heartguardScore")) || 0;
const MAX_SCORE = 51;
const answers = JSON.parse(localStorage.getItem("heartguardAnswers") || "{}");

// ==========================
// Language state
// NOTE: this file must load AFTER language.js so window.translations exists.
// ==========================
function getCurrentLang() {
    return localStorage.getItem("heartguardLang") || "en";
}

// ==========================
// Strings for content that is generated dynamically from the user's
// answers (prevention tips, condition explanations, donut labels, etc).
// These are separate from translations.js because they are keyed by
// answer value / category, not by a flat UI id.
// ==========================
const resultStrings = {

en: {
    goodLabel: "Good",
    needsAttentionLabel: "Needs attention",
    factorsIdentified: labelText => `Factors identified: ${labelText}.`,
    and: " and ",
    evidenceStat: (value, unit) => `(Statistic: ${value}${unit} in Mexico)`,
    statLine: (label, value, unit) => ` In Mexico: ${label} is ${value}${unit}.`,
    tapOutcomePrefix: "→ This ",
    projectionTip: (score, projectedScore, maxScore, pct) =>
        `📉 If you act on all of these, your risk factor score could drop from ${score} to approximately ${projectedScore} out of ${maxScore} (~${pct}%).`,

    donutLabels: {
        bmi: "BMI",
        diet: "Eating Habits",
        exercise: "Exercise Habits",
        smoking: "Smoking",
        bp: "Blood Pressure",
        sugar: "Sugar Intake",
        activity: "Daily Activity"
    },

    factorLabels: {
        cholesterol: "high cholesterol",
        bp: "high blood pressure",
        smoking: "smoking",
        diet: "your diet",
        bmi: "your BMI",
        exercise: "low exercise levels",
        activity: "low daily activity",
        diabetes: "diabetes",
        sugar: "sugary beverage intake"
    },

    tipsData: [
        { threshold: 0, action: " Exercise at least 150 minutes per week.", outcome: "can lower resting blood pressure and strengthen your heart within a few months.", pointsReducible: 3 },
        { threshold: 11, action: " Reduce sugary beverages and processed foods.", outcome: "helps stabilize blood sugar and reduces strain on your blood vessels within weeks.", pointsReducible: 4 },
        { threshold: 23, action: " Monitor your blood pressure regularly.", outcome: "catches dangerous spikes early, before they cause lasting damage.", pointsReducible: 3 },
        { threshold: 23, action: " Monitor your blood glucose levels if you have diabetes or prediabetes.", outcome: "slows the vascular damage linked to diabetic cardiomyopathy.", pointsReducible: 4 },
        { threshold: 36, action: " Schedule a medical evaluation with a healthcare professional.", outcome: "gives you a personalized, clinically accurate risk picture beyond this screening.", pointsReducible: 0 }
    ],

    answerBasedTips: {
        smoking: { action: " Consider a plan to quit smoking.", outcome: "even partial reduction significantly lowers your risk of heart attack and stroke over time." },
        diet: { action: " Try replacing 2–3 meals a week with home-cooked options.", outcome: "reduces your intake of excess sodium and unhealthy fats that strain your heart." },
        sugar: { action: " Cut back on sugary drinks specifically — even switching every other one to water helps.", outcome: "reduces blood sugar spikes linked to insulin resistance." },
        activitySitting: { action: " Stand or walk for a few minutes every hour.", outcome: "offsets some of the cardiovascular risk associated with prolonged sitting." },
        exerciseLow: { action: " Start with short walks a few times a week and build up gradually.", outcome: "is often more sustainable than an intense routine and still meaningfully lowers risk." },
        diabetes: { action: " Pair diet changes with regular glucose monitoring.", outcome: "helps catch and correct blood sugar spikes before they cause lasting vascular damage." },
        bp: { action: " Reduce sodium intake, especially from processed and street food.", outcome: "can noticeably lower blood pressure within a few weeks." }
    },

    conditionData: {
        cad: {
            title: " Coronary Artery Disease",
            general: "Coronary artery disease develops when plaque builds up inside the arteries that supply blood to the heart, gradually narrowing them and restricting blood flow.",
            relatedFactors: ["cholesterol", "bp", "smoking", "diet", "bmi"]
        },
        hf: {
            title: " Heart Failure",
            general: "Heart failure occurs when the heart muscle becomes too weak or stiff to pump blood efficiently, often as a result of prolonged strain from other conditions.",
            relatedFactors: ["bp", "bmi", "exercise", "activity", "diabetes"]
        },
        stroke: {
            title: " Stroke",
            general: "A stroke happens when blood flow to part of the brain is interrupted, often due to a blocked or burst blood vessel — frequently linked to long-term vascular damage.",
            relatedFactors: ["bp", "smoking", "cholesterol", "diabetes"]
        },
        dcm: {
            title: " Diabetic Cardiomyopathy",
            general: "Diabetic cardiomyopathy is heart muscle damage caused by prolonged high blood sugar, which leads to stiffening and scarring (fibrosis) of heart tissue over time.",
            relatedFactors: ["diabetes", "sugar", "diet"]
        }
    },

    severity: {
        none: "Your current answers don't show strong risk indicators for this condition — keep up the healthy habits.",
        one: "One factor from your answers may contribute to this condition.",
        oneConsequence: "Addressing this single factor could meaningfully reduce your risk here.",
        few: count => `Several factors (${count}) from your answers combine to raise your risk for this condition.`,
        fewConsequence: "When multiple risk factors act together, they often compound each other — for example, high blood pressure combined with high cholesterol accelerates artery damage faster than either alone.",
        many: count => `A high number of factors (${count}) from your answers are associated with this condition.`,
        manyConsequence: "With this many overlapping factors, the combined strain on your cardiovascular system is significantly higher than any single factor would suggest — addressing even one or two could meaningfully lower the compounded risk."
    },

    summary: {
        low: `Your results place you in the <strong>Low Risk</strong> range. Overall, your answers suggest healthy habits are already working in your favor.`,
        mild: `Your results place you in the <strong>Mild Risk</strong> range. Most factors look reasonable, but a few areas are worth attention.`,
        moderate: `Your results place you in the <strong>Moderate Risk</strong> range. Several factors from your answers are meaningfully raising your cardiovascular risk.`,
        high: `Your results place you in the <strong>High Risk</strong> range. A number of factors from your answers are combining to significantly raise your cardiovascular risk.`,
        factorSentence: listText => ` The factors contributing most to your score are <strong>${listText}</strong>.`,
        noFactor: ` No single factor stood out as a major driver — your risk is spread fairly evenly across smaller contributors.`,
        closing: ` The sections below break down why each factor matters, how it can lead to heart disease, and specific steps you can take to lower your risk.`
    }
}, // end en

es: {
    goodLabel: "Bueno",
    needsAttentionLabel: "Necesita atención",
    factorsIdentified: labelText => `Factores identificados: ${labelText}.`,
    and: " y ",
    evidenceStat: (value, unit) => `(Estadística: ${value}${unit} en México)`,
    statLine: (label, value, unit) => ` En México: ${label} es ${value}${unit}.`,
    tapOutcomePrefix: "→ Esto ",
    projectionTip: (score, projectedScore, maxScore, pct) =>
        `📉 Si actúas en todo esto, tu puntuación de factores de riesgo podría bajar de ${score} a aproximadamente ${projectedScore} de ${maxScore} (~${pct}%).`,

    donutLabels: {
        bmi: "IMC",
        diet: "Hábitos Alimenticios",
        exercise: "Hábitos de Ejercicio",
        smoking: "Tabaquismo",
        bp: "Presión Arterial",
        sugar: "Consumo de Azúcar",
        activity: "Actividad Diaria"
    },

    factorLabels: {
        cholesterol: "el colesterol alto",
        bp: "la presión arterial alta",
        smoking: "el tabaquismo",
        diet: "tu dieta",
        bmi: "tu IMC",
        exercise: "los bajos niveles de ejercicio",
        activity: "la baja actividad diaria",
        diabetes: "la diabetes",
        sugar: "el consumo de bebidas azucaradas"
    },

    tipsData: [
        { threshold: 0, action: " Haz al menos 150 minutos de ejercicio por semana.", outcome: "puede reducir la presión arterial en reposo y fortalecer tu corazón en pocos meses.", pointsReducible: 3 },
        { threshold: 11, action: " Reduce los consumos de bebidas azucaradas y los alimentos procesados.", outcome: "ayuda a estabilizar el azúcar en sangre y reduce la tensión sobre tus vasos sanguíneos en cuestión de semanas.", pointsReducible: 4 },
        { threshold: 23, action: " Monitorea tu presión arterial con regularidad.", outcome: "detecta picos peligrosos a tiempo, antes de que causen daño duradero.", pointsReducible: 3 },
        { threshold: 23, action: " Monitorea tus niveles de glucosa si tienes diabetes o prediabetes.", outcome: "desacelera el daño vascular relacionado con la cardiomiopatía diabética.", pointsReducible: 4 },
        { threshold: 36, action: " Programa una evaluación médica con un profesional de la salud.", outcome: "te brinda un panorama de riesgo personalizado y clínicamente preciso más allá de este análisis.", pointsReducible: 0 }
    ],

    answerBasedTips: {
        smoking: { action: " Considera un plan para dejar de fumar.", outcome: "incluso una reducción parcial disminuye significativamente tu riesgo de infarto y accidente cerebrovascular con el tiempo." },
        diet: { action: " Intenta reemplazar 2–3 comidas a la semana con opciones caseras.", outcome: "reduce tu consumo de exceso de sodio y grasas poco saludables que sobrecargan tu corazón." },
        sugar: { action: " Reduce específicamente las bebidas azucaradas — incluso cambiar una de cada dos por agua ayuda.", outcome: "reduce los picos de azúcar en sangre relacionados con la resistencia a la insulina." },
        activitySitting: { action: " Ponte de pie o camina unos minutos cada hora.", outcome: "contrarresta parte del riesgo cardiovascular asociado con estar sentado por periodos prolongados." },
        exerciseLow: { action: " Comienza con caminatas cortas varias veces por semana y aumenta gradualmente.", outcome: "suele ser más sostenible que una rutina intensa y aun así reduce significativamente el riesgo." },
        diabetes: { action: " Combina cambios en la dieta con monitoreo regular de glucosa.", outcome: "ayuda a detectar y corregir los picos de azúcar en sangre antes de que causen daño vascular duradero." },
        bp: { action: " Reduce el consumo de sodio, especialmente de alimentos procesados y comida callejera.", outcome: "puede reducir notablemente la presión arterial en pocas semanas." }
    },

    conditionData: {
        cad: {
            title: " Enfermedad de las Arterias Coronarias",
            general: "La enfermedad de las arterias coronarias se desarrolla cuando se acumula placa dentro de las arterias que suministran sangre al corazón, estrechándolas gradualmente y restringiendo el flujo sanguíneo.",
            relatedFactors: ["cholesterol", "bp", "smoking", "diet", "bmi"]
        },
        hf: {
            title: " Insuficiencia Cardíaca",
            general: "La insuficiencia cardíaca ocurre cuando el músculo del corazón se debilita o se vuelve demasiado rígido para bombear sangre eficientemente, a menudo como resultado de una tensión prolongada por otras condiciones.",
            relatedFactors: ["bp", "bmi", "exercise", "activity", "diabetes"]
        },
        stroke: {
            title: "Accidente Cerebrovascular",
            general: "Un accidente cerebrovascular ocurre cuando se interrumpe el flujo sanguíneo a una parte del cerebro, a menudo debido a un vaso sanguíneo bloqueado o roto — frecuentemente relacionado con daño vascular a largo plazo.",
            relatedFactors: ["bp", "smoking", "cholesterol", "diabetes"]
        },
        dcm: {
            title: " Miocardiopatía Diabética",
            general: "La miocardiopatía diabética es un daño al músculo cardíaco causado por el azúcar en sangre elevado de forma prolongada, lo que provoca rigidez y cicatrización (fibrosis) del tejido cardíaco con el tiempo.",
            relatedFactors: ["diabetes", "sugar", "diet"]
        }
    },

    severity: {
        none: "Tus respuestas actuales no muestran indicadores de riesgo fuertes para esta condición — sigue manteniendo tus hábitos saludables.",
        one: "Un factor de tus respuestas podría contribuir a esta condición.",
        oneConsequence: "Abordar este único factor podría reducir significativamente tu riesgo en este aspecto.",
        few: count => `Varios factores (${count}) de tus respuestas se combinan para aumentar tu riesgo de esta condición.`,
        fewConsequence: "Cuando varios factores de riesgo actúan juntos, a menudo se potencian entre sí — por ejemplo, la presión arterial alta combinada con el colesterol alto acelera el daño arterial más rápido que cualquiera de los dos por separado.",
        many: count => `Un número alto de factores (${count}) de tus respuestas está asociado con esta condición.`,
        manyConsequence: "Con tantos factores superpuestos, la tensión combinada sobre tu sistema cardiovascular es significativamente mayor de lo que sugeriría cualquier factor individual — abordar incluso uno o dos podría reducir significativamente el riesgo combinado."
    },

    summary: {
        low: `Tus resultados te ubican en el rango de <strong>Riesgo Bajo</strong>. En general, tus respuestas sugieren que ya tienes hábitos saludables trabajando a tu favor.`,
        mild: `Tus resultados te ubican en el rango de <strong>Riesgo Leve</strong>. La mayoría de los factores se ven razonables, pero algunas áreas merecen atención.`,
        moderate: `Tus resultados te ubican en el rango de <strong>Riesgo Moderado</strong>. Varios factores de tus respuestas elevan tu riesgo cardiovascular de manera significativa.`,
        high: `Tus resultados te ubican en el rango de <strong>Riesgo Alto</strong>. Varios factores de tus respuestas se combinan para elevar significativamente tu riesgo cardiovascular.`,
        factorSentence: listText => ` Los factores que más contribuyen a tu puntuación son <strong>${listText}</strong>.`,
        noFactor: ` Ningún factor individual se destacó como un motivo principal — tu riesgo está distribuido de manera bastante uniforme entre contribuyentes menores.`,
        closing: ` Las secciones a continuación explicarán por qué cada factor es importante, cómo puede contribuir a una enfermedad cardíaca y qué pasos específicos puedes tomar para reducir tu riesgo.`
    }
} // end es

};

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
// Score display (language-independent numbers)
// ==========================
if (scoreText) scoreText.textContent = score;
if (scoreOutOf) scoreOutOf.textContent = `${score} / ${MAX_SCORE}`;

const percentage = Math.min(Math.round((score / MAX_SCORE) * 100), 100);
if (riskMarker) riskMarker.style.left = `calc(${percentage}% - 2px)`;

// TODO: replace AVG_SCORE with a real average once Firebase data is collected
const AVG_SCORE = 15;

// ==========================
// Risk classification (language-independent thresholds)
// ==========================
function getRiskBucket() {
    if (score <= 12) return { key: "lowRisk", color: "#4CAF50" };
    if (score <= 24) return { key: "mildRisk", color: "#FBC02D" };
    if (score <= 38) return { key: "moderateRisk", color: "#F57C00" };
    return { key: "highRisk", color: "#D32F2F" };
}

// ==========================
// Text that reuses the flat UI keys from translations.js (language.js)
// ==========================
function renderLanguageDependentBasics(lang) {
    const t = (window.translations && window.translations[lang]) || {};

    if (rawScoreText && typeof t.rawScore === "function") {
        rawScoreText.textContent = t.rawScore(score, MAX_SCORE);
    }

    if (comparisonEl && typeof t.comparisonHigher === "function") {
        const diff = Math.round(((score - AVG_SCORE) / AVG_SCORE) * 100);
        if (diff > 0) {
            comparisonEl.textContent = t.comparisonHigher(diff);
        } else if (diff < 0) {
            comparisonEl.textContent = t.comparisonLower(Math.abs(diff));
        } else {
            comparisonEl.textContent = t.comparisonSame;
        }
    }

    const bucket = getRiskBucket();
    if (riskLevel) riskLevel.textContent = t[bucket.key] || bucket.key;
    if (circle) circle.style.background = bucket.color;
}

// ==========================
// Prevention tips (enhanced with outcomes + projected score)
// ==========================
function renderPreventionTips(lang) {
    const s = resultStrings[lang];
    const preventionListEl = document.querySelector(".recommendations ul");
    if (!preventionListEl) return;

    const answerBasedTips = [];

    if (answers.smoking === "daily" || answers.smoking === "sometimes") {
        answerBasedTips.push(s.answerBasedTips.smoking);
    }
    if (answers.diet === "processed" || answers.diet === "eatingout") {
        answerBasedTips.push(s.answerBasedTips.diet);
    }
    if (answers.sugar === "daily" || answers.sugar === "3daily") {
        answerBasedTips.push(s.answerBasedTips.sugar);
    }
    if (answers.activity === "sitting") {
        answerBasedTips.push(s.answerBasedTips.activitySitting);
    }
    if (answers.exercise === "0" || answers.exercise === "1") {
        answerBasedTips.push(s.answerBasedTips.exerciseLow);
    }
    if (answers.diabetes === "type2" || answers.diabetes === "prediabetes") {
        answerBasedTips.push(s.answerBasedTips.diabetes);
    }
    if (answers.bp === "yes" || answers.bp === "unsure") {
        answerBasedTips.push(s.answerBasedTips.bp);
    }

    const applicableTips = s.tipsData.filter(t => score >= t.threshold);
    const totalReducible = applicableTips.reduce((sum, t) => sum + t.pointsReducible, 0);
    const projectedScore = Math.max(0, score - totalReducible);
    const projectedPct = Math.round((projectedScore / MAX_SCORE) * 100);

    preventionListEl.innerHTML =
        applicableTips.map(t => `<li><strong>${t.action}</strong><br><span class="tip-outcome">${s.tapOutcomePrefix}${t.outcome}</span></li>`).join("")
        + answerBasedTips.map(t => `<li><strong>${t.action}</strong><br><span class="tip-outcome">${s.tapOutcomePrefix}${t.outcome}</span></li>`).join("")
        + (totalReducible > 0
            ? `<li class="tip-projection">${s.projectionTip(score, projectedScore, MAX_SCORE, projectedPct)}</li>`
            : "");
}

// ==========================
// Donut chart data (good = gray, needs attention = color)
// ==========================
function getDonutCategories(lang) {
    const s = resultStrings[lang];
    return [
        { key: "bmi", label: s.donutLabels.bmi, color: "#4CAF50", good: answers.bmi === "healthy" },
        { key: "diet", label: s.donutLabels.diet, color: "#F57C00", good: answers.diet === "homecooked" || answers.diet === "mostlyhome" },
        { key: "exercise", label: s.donutLabels.exercise, color: "#1E88E5", good: answers.exercise === "5" || answers.exercise === "3" },
        { key: "smoking", label: s.donutLabels.smoking, color: "#8E24AA", good: answers.smoking === "never" || answers.smoking === "former" },
        { key: "bp", label: s.donutLabels.bp, color: "#D32F2F", good: answers.bp === "no" },
        { key: "sugar", label: s.donutLabels.sugar, color: "#FBC02D", good: answers.sugar === "never" || answers.sugar === "1-2" },
        { key: "activity", label: s.donutLabels.activity, color: "#00897B", good: answers.activity === "physical" || answers.activity === "standing" }
    ];
}

function renderDonutChart(lang) {

    const svg = document.getElementById("donutChart");
    const legend = document.getElementById("donutLegend");
    if (!svg || !legend) return;

    svg.innerHTML = "";
    legend.innerHTML = "";

    const s = resultStrings[lang];
    const donutCategories = getDonutCategories(lang);

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
            <span>${cat.label} — ${cat.good ? s.goodLabel : s.needsAttentionLabel}</span>
        `;
        legend.appendChild(item);

    });

}

function renderFactorSnapshot(lang) {

    const onTrackList = document.getElementById("onTrackList");
    const needsAttentionList = document.getElementById("needsAttentionList");
    if (!onTrackList || !needsAttentionList) return;

    onTrackList.innerHTML = "";
    needsAttentionList.innerHTML = "";

    getDonutCategories(lang).forEach(cat => {
        const li = document.createElement("li");
        li.textContent = cat.label;
        if (cat.good) onTrackList.appendChild(li);
        else needsAttentionList.appendChild(li);
    });

}

// ==========================
// Category risk points (mirrors assessment.js scoring — language independent)
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
function renderAnalysis(lang) {

    const highlightsEl = document.getElementById("analysisHighlights");
    const accordionEl = document.getElementById("analysisAccordion");
    if (!highlightsEl || !accordionEl || typeof window.analysisData === "undefined") return;

    const s = resultStrings[lang];
    const langAnalysisData = window.analysisData[lang];
    const langMechanisms = window.categoryMechanisms[lang];
    const langMexicoData = typeof window.mexicodata !== "undefined" ? window.mexicodata[lang] : null;

    const items = [];

    Object.keys(categoryPointTables).forEach(category => {
        const answerValue = answers[category];
        if (!answerValue) return;
        const points = categoryPointTables[category][answerValue] ?? 0;
        const data = langAnalysisData[category]?.[answerValue];
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
        const mech = langMechanisms[item.category] || {};
        const stat = langMexicoData ? langMexicoData[item.category] : null;
        const g = stat ? getGenderedStat(stat, answers.gender) : null;

        const evidenceLine = g
            ? `<span class="evidence-note">${s.evidenceStat(g.mx, stat.unit === "%" ? "%" : " " + stat.unit)}</span>`
            : "";

        const statLine = g
            ? `<p class="stat-line">${s.statLine(g.label, g.mx, stat.unit === "%" ? "%" : " " + stat.unit)}</p>`
            : "";

        return `
        <div class="flip-card" onclick="toggleFlip(${i})">
            <div class="flip-card-inner" id="flipInner${i}">
                <div class="flip-card-front">
                    <h4>⚠️ ${item.title}</h4>
                    <p><strong>${item.average}</strong> ${evidenceLine}</p>
                    <p>${item.explanation}</p>
                    <p class="flip-hint">${(window.translations?.[lang]?.tapMore) || "🔄 Tap to see why this matters ▾"}</p>
                </div>
                <div class="flip-card-back">
                    <h4>${(window.translations?.[lang]?.whyMatters) || "🫀 Why this matters"}</h4>
                    <p>${mech.mechanism || ""}</p>
                    <h4>${(window.translations?.[lang]?.improve) || "✅ If you improve this"}</h4>
                    <p>${mech.future || ""}</p>
                    ${statLine}
                </div>
            </div>
        </div>
        `;
    }).join("");

    // Accordion for the rest
    accordionEl.innerHTML = rest.map((item, i) => {
        const stat = langMexicoData ? langMexicoData[item.category] : null;
        const g = stat ? getGenderedStat(stat, answers.gender) : null;
        const statLine = g
            ? `<p class="stat-line">${s.statLine(g.label, g.mx, stat.unit === "%" ? "%" : " " + stat.unit)}</p>`
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
// Overall Summary
// ==========================
function renderSummary(lang) {

    const summaryEl = document.getElementById("summaryText");
    if (!summaryEl) return;

    const s = resultStrings[lang].summary;
    const highlighted = window.highlightedFactors || [];

    let opening = "";
    if (score <= 12) opening = s.low;
    else if (score <= 24) opening = s.mild;
    else if (score <= 38) opening = s.moderate;
    else opening = s.high;

    let factorSentence = "";
    if (highlighted.length > 0) {
        const topTitles = highlighted.slice(0, 3).map(f => f.title.replace(/^[^\w]+/, "").trim());
        const listText = topTitles.length === 1
            ? topTitles[0]
            : topTitles.slice(0, -1).join(", ") + resultStrings[lang].and + topTitles[topTitles.length - 1];

        factorSentence = s.factorSentence(listText);
    } else {
        factorSentence = s.noFactor;
    }

    summaryEl.innerHTML = opening + factorSentence + s.closing;

}

// ==========================
// Mexico stat panel (top risk factors only, gender-aware)
// ==========================
function renderMexicoStat(lang) {

    const card = document.getElementById("mexicodataCard");
    if (!card || typeof window.mexicodata === "undefined") return;

    const langMexicoData = window.mexicodata[lang];
    const t = (window.translations && window.translations[lang]) || {};
    const highlighted = window.highlightedFactors || [];
    const statsToShow = highlighted
        .map(item => ({ category: item.category, stat: langMexicoData[item.category] }))
        .filter(entry => entry.stat);

    if (statsToShow.length === 0) {
        card.style.display = "none";
        return;
    }

    const gender = answers.gender;

    card.innerHTML = `
        <h4>${t.mexicoTitle || " How Your Risk Factors Compare in Mexico"}</h4>
        ${statsToShow.map(({ stat }) => {

            const g = getGenderedStat(stat, gender);
            if (!g) return "";

            const maxVal = Math.max(g.mx, g.gl || g.mx) * 1.2;
            const unitSuffix = stat.unit === "%" ? "%" : ` ${stat.unit}`;

            return `
            <div class="mexico-stat-block">
                <p class="mexico-stat-label">${g.label}</p>
                <div class="stat-bar-row">
                    <span class="stat-bar-tag">${t.mexico || " Mexico"}</span>
                    <div class="stat-bar-track"><div class="stat-bar-fill mexico" style="width:${(g.mx / maxVal) * 100}%"></div></div>
                    <span>${g.mx}${unitSuffix}</span>
                </div>
                ${g.mxNote ? `<p class="mexico-stat-unitnote">${g.mxNote}</p>` : ""}
                ${g.gl !== undefined ? `
                <div class="stat-bar-row">
                    <span class="stat-bar-tag">${t.global || " Global"}</span>
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
function renderConditions(lang) {

    const s = resultStrings[lang];
    const conditionData = s.conditionData;
    const factorLabels = s.factorLabels;
    const sev = s.severity;

    Object.keys(conditionData).forEach(key => {

        const titleEl = document.getElementById(`${key}Title`);
        const textEl = document.getElementById(`${key}Text`);
        if (!textEl) return;

        const data = conditionData[key];
        if (titleEl) titleEl.textContent = data.title;

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
            severityNote = sev.none;
        } else if (count === 1) {
            severityNote = sev.one;
            consequenceNote = sev.oneConsequence;
        } else if (count <= 3) {
            severityNote = sev.few(count);
            consequenceNote = sev.fewConsequence;
        } else {
            severityNote = sev.many(count);
            consequenceNote = sev.manyConsequence;
        }

        const labels = matchedFactors.map(f => factorLabels[f] || f);
        const labelText = labels.length
            ? (labels.length === 1 ? labels[0] : labels.slice(0, -1).join(", ") + s.and + labels[labels.length - 1])
            : "";

        const factorLine = labels.length ? s.factorsIdentified(labelText) : "";

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
// Run / re-run everything for the current language.
// Called on first load AND whenever the language switcher fires.
// ==========================
function renderResultsPage() {
    const lang = getCurrentLang();
    renderLanguageDependentBasics(lang);
    renderPreventionTips(lang);
    renderDonutChart(lang);
    renderFactorSnapshot(lang);
    renderAnalysis(lang);
    renderSummary(lang);
    renderMexicoStat(lang);
    renderConditions(lang);
}

// Expose so language.js can trigger a re-render after switching languages
window.renderResultsPage = renderResultsPage;

renderResultsPage();
async function generatePDF() {

    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "⏳ Generating PDF...";
    btn.disabled = true;

    // PDF에 안 들어갈 요소들 임시로 숨기기
    const hideEls = document.querySelectorAll(".language-switch, #retakeButton, #backButton, .background-circle, .flip-hint");
    hideEls.forEach(el => el.style.visibility = "hidden");

    // Flip card는 뒷면(mechanism)까지 다 보이게 임시로 펼치기
    const flipInners = document.querySelectorAll(".flip-card-inner");
    flipInners.forEach(el => {
        el.style.transform = "none";
        el.style.position = "static";
        el.style.height = "auto";
    });
    const flipBacks = document.querySelectorAll(".flip-card-back");
    flipBacks.forEach(el => {
        el.style.position = "static";
        el.style.transform = "none";
        el.style.marginTop = "10px";
    });

    // 아코디언 전부 펼치기
    const accBodies = document.querySelectorAll(".accordion-body");
    accBodies.forEach(el => {
        el.style.maxHeight = "none";
    });

    const target = document.querySelector(".container");

    try {

        const canvas = await html2canvas(target, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        });

        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`HeartGuard-Result-${new Date().toISOString().slice(0,10)}.pdf`);

    } catch (err) {
        console.error("PDF generation failed:", err);
        alert("Something went wrong generating the PDF. Please try again.");
    } finally {
        // 원래 상태로 복구
        hideEls.forEach(el => el.style.visibility = "");
        flipInners.forEach(el => {
            el.style.transform = "";
            el.style.position = "";
            el.style.height = "";
        });
        flipBacks.forEach(el => {
            el.style.position = "";
            el.style.transform = "";
            el.style.marginTop = "";
        });
        accBodies.forEach(el => {
            el.style.maxHeight = "";
        });

        btn.textContent = originalText;
        btn.disabled = false;
    }

}
