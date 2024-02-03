//selectores
const URL = "http://localhost:3000";
const form = document.querySelector("form");
let cache = idUserlogin();

//Eventos
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const event = {};
  
    for (const [key, value] of formData) {
      if (value == "") return;
      event[key] = value;
    }
    event.userID = cache;
    event.confirmed = [{ userID: cache }];
    event.unconfirmed = [];
    createEvent(event);
    form.reset();
  });
}

export function idUserlogin() {
  let userId = localStorage.getItem("user");
  let Id = JSON.parse(userId);
  return Id;
}
//Funciones
async function createEvent(event) {
  //VERBOS HTTP
  //GET -> OBTENER
  //POST -> CREAR
  //PUT -> ACTUALIZAR
  //DELETE -> ELIMINAR
  //PATCH -> ACTUALIZAR PARCIAL

  await fetch(`${URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
}
