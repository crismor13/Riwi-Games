import i18next from "../node_modules/i18next/i18next";
import Backend from "../i18next-http-backend";

export function getLanguague() {
  if (localStorage.getItem("lang")) {
    return localStorage.getItem("lang");
  } else {
    return "en";
  }
}

let language = getLanguague();

i18next
  .use(Backend)
  .init({
    lng: language,
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["translation"],
    defaultNS: "translation",
  })
  .then(() => updateContent());

export function updateContent() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = data[key];
  });
}

window.changeLanguage = function (lng) {
  i18next.changeLanguage(lng, updateContent);
  localStorage.setItem("lang", lng);
};

export function changeLanguageOnClick() {
  const btnChangeLanguage = document.querySelector(".menu__header--lang");
  const langFlag = document.querySelector(".lang--flag");
  function upfateFlag() {
    if (langFlag) {
      if (language === "es") {
        langFlag.classList.add("es");
      } else {
        langFlag.classList.remove("es");
      }
    }
  }
  upfateFlag();

  if (btnChangeLanguage) {
    btnChangeLanguage.querySelector("h4").innerText = language.toUpperCase();
    btnChangeLanguage.addEventListener("click", () => {
      language == "en" ? (language = "es") : (language = "en");
      i18next.changeLanguage(language, updateContent);
      localStorage.setItem("lang", language);
      upfateFlag();
    });
  }
}
