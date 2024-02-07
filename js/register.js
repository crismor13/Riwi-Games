//Selectores

const URL = "http://localhost:3000/users";

const form = document.getElementById("form-register");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("repeat-password");
const fullName = document.getElementById("fullName");
const level = document.getElementById("level");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  registerUser();
});

async function registerUser() {
  //1. La contraseñas tienen que ser iguales

  const { validated, message } = validatePassword();
  //2. Contraseña segura
  console.log(validated, message);

  if (!validated) {
    showAlert(message);
    return;
  }

  if (await validateEmail()) {
    showAlert("El email ya se encuentra registrado.");
    return;
  }

  console.log("TODO CORRECTO");

  try {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: await picProfile(),
        email: email.value,
        password: password.value,
        fullName: fullName.value,
        level: level.value,
      }),
    });
    window.location.href = "./login.html";
  } catch (error) {
    showAlert(error);
  }
}

async function validateEmail() {
  const response = await fetch(`${URL}?email=${email.value}`);

  const data = await response.json();

  return data.length;
}

function validatePassword() {
  if (password.value != passwordConfirmation.value) {
    return { validated: false, message: "Las contraseñas no coinciden" };
  }

  return { validated: true };
}

function showAlert(message) {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    toast: "true",
    timer: 4000,
    showConfirmButton: false,
    position: "bottom-right",
    confirmButtonText: "Aceptar",
  });
}
