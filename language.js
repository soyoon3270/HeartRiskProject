const translations = {
    en: {
        hero_title: "PROTECT YOUR<br>HEART TODAY",
        hero_intro: "Understand your cardiovascular health through a personalized assessment based on your lifestyle, medical history, and daily habits.",
        badge_time: "⏱ Under 3 minutes",
        badge_prep: "🩺 No medical prep needed",
        badge_privacy: "🔒 100% confidential & free",
        cta_button: "Check My Risk →",
        footer_privacy: "🔒 Your privacy matters to us. All responses are confidential and are never shared, sold, or disclosed to third parties.",
        footer_disclaimer: "This tool is for educational purposes only and does not replace professional medical diagnosis or treatment."
    },
    es: {
        hero_title: "PROTEGE TU<br>CORAZÓN HOY",
        hero_intro: "Comprende tu salud cardiovascular a través de una evaluación personalizada basada en tu estilo de vida, historial médico y hábitos diarios.",
        badge_time: "⏱ Menos de 3 minutos",
        badge_prep: "🩺 Sin preparación médica",
        badge_privacy: "🔒 100% confidencial y gratis",
        cta_button: "Revisar Mi Riesgo →",
        footer_privacy: "🔒 Tu privacidad es importante para nosotros. Todas las respuestas son confidenciales y nunca se comparten, venden ni divulgan a terceros.",
        footer_disclaimer: "Esta herramienta es solo para fines educativos y no reemplaza el diagnóstico o tratamiento médico profesional."
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