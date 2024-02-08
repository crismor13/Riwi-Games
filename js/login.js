import "./translator.js";

//selectores
const formLogin = document.getElementById("form-login");

const email = document.getElementById("email");
console.log(email.value);
const password = document.getElementById("password");

const URLBase = "http://localhost:3000/users";

//Eventos

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

async function login() {
  const response = await fetch(`${URLBase}?email=${email.value}`);
  const data = await response.json();
  const user = JSON.stringify(data[0].id);
  console.log(user);
  if (!data.length) {
    console.log("Email no resgistrado");
    return;
  }
  if (data[0].password === password.value) {
    window.location.href = "../index.html"; //en el caso del proyecto seria enviarlo a home
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", user);
  } else {
    console.log("Credenciales incorrectas");
  }
}
