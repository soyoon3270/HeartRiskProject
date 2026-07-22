function startAssessment() {
    window.location.href = "about.html";
}


function beginAssessment() {
    window.location.href = "assessment.html";
}


function setLanguage(lang){

    localStorage.setItem("language", lang);

    location.reload();

}


const lang = localStorage.getItem("language") || "en";


document.getElementById("title").innerText =
translations[lang].title;


document.getElementById("subtitle").innerText =
translations[lang].subtitle;


document.getElementById("startButton").innerText =
translations[lang].start;