const translations = {
    en: {
        hero_title: "PROTECT YOUR<br>HEART TODAY",
        hero_intro: "Understand your cardiovascular health through a personalized assessment based on your lifestyle, medical history, and daily habits.",
        badge_time: "⏱ Under 3 minutes",
        badge_prep: "🩺 No medical prep needed",
        badge_privacy: "🔒 100% confidential & free",
        cta_button: "Check Your Risk →",
        footer_privacy: "🔒 Your privacy matters to us. All responses are confidential and are never shared, sold, or disclosed to third parties.",
        footer_disclaimer: "This tool is for educational purposes only and does not replace professional medical diagnosis or treatment.",
        card1Title: "❤️ Assess Your Risk",
        card1Text: "Complete a quick evidence-based assessment in under 3 minutes.",
        card2Title: "📊 Personalized Results",
        card2Text: "Learn which lifestyle factors contribute most to your cardiovascular risk.",
        card3Title: "💡 Prevention Tips",
        card3Text: "Receive practical recommendations for improving long-term heart health.",
        sneakTitle: "See What You'll Get",
        sneakRisk: "🟠 Moderate Risk",
        sneakNote: "*Example only — your real results will be based on your own answers.",
          // --- oxygen/pressure/sugar/bmi/smoking tags ---
        oxygenTag: "Oxygen Level",
        pressureTag: "Blood Pressure",
        sugarTag: "Blood Sugar",
        bmiTag: "BMI",
        smokingTag: "Smoking",

        // --- footer (모든 페이지 공통) ---
        footer_privacy: "🔒 Your privacy matters to us. All responses are confidential and are never shared, sold, or disclosed to third parties.",
        footer_disclaimer: "This tool is for educational purposes only and does not replace professional medical diagnosis or treatment.",
        footer_contact: "📧 contact@heartguard.app",

    },
    es: {
        hero_title: "PROTEGE TU<br>CORAZÓN HOY",
        hero_intro: "Comprende tu salud cardiovascular a través de una evaluación personalizada basada en tu estilo de vida, historial médico y hábitos diarios.",
        badge_time: "⏱ Menos de 3 minutos",
        badge_prep: "🩺 Sin preparación médica",
        badge_privacy: "🔒 100% confidencial y gratis",
        cta_button: "Examina Tu Riesgo →",
        footer_privacy: "🔒 Tu privacidad es importante para nosotros. Todas las respuestas son confidenciales y nunca se comparten, venden ni divulgan a terceros.",
        footer_disclaimer: "Esta herramienta es solo para fines educativos y no reemplaza el diagnóstico o tratamiento médico profesional.",
        card1Title: "❤️ Evalúa Tu Riesgo",
        card1Text: "Completa una evaluación rápida basada en evidencia en menos de 3 minutos.",
        card2Title: "📊 Resultados Personalizados",
        card2Text: "Descubre qué factores de estilo de vida contribuyen más a tu riesgo cardiovascular.",
        card3Title: "💡 Consejos de Prevención",
        card3Text: "Recibe recomendaciones prácticas para mejorar la salud del corazón a largo plazo.",
        sneakTitle: "Mira Lo Que Obtendrás",
        sneakRisk: "🟠 Riesgo Moderado",
        sneakNote: "*Solo un ejemplo — tus resultados reales se basarán en tus propias respuestas.",

        oxygenTag: "Nivel de Oxígeno",
        pressureTag: "Presión Arterial",
        sugarTag: "Azúcar en Sangre",
        bmiTag: "IMC",
        smokingTag: "Tabaquismo",

        footer_privacy: "🔒 Tu privacidad es importante para nosotros. Todas las respuestas son confidenciales y nunca se comparten, venden ni divulgan a terceros.",
        footer_disclaimer: "Esta herramienta es solo para fines educativos y no reemplaza el diagnóstico o tratamiento médico profesional.",
        footer_contact: "📧 contact@heartguard.app",
    }
};

function setLanguage(lang) {

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    localStorage.setItem("heartguardLang", lang);

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("heartguardLang") || "en";
    setLanguage(saved);
});
