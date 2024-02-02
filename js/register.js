//Selectores
const URL = 

const form = document.getElementById("form-register");
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("repeat-password")

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    console.log("object");
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newUser = {};
  
    for (const [key, value] of formData) {
  
      newUser[key] = value;
    }
    console.log(newUser);
    // createUser(user);
    form.reset();
  })


async function registerUser() {
  //1. La contraseñas tienen que ser iguales

  const { validated, message } = validatePassword();
  //2. Contraseña segura
  console.log(validated, message)

  if (!validated) {
      showAlert(message)
      return
  }

  const { validated: validatedSegurity, message: messageError } = validatePasswordSegurity();

  if (!validatedSegurity) {
      showAlert(messageError)
      return
  }
}














































