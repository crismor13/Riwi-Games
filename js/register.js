const form = document.querySelector("form");

// form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log("object");
// })

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const user = {};

  for (const [key, value] of formData) {
    user[key] = value;
  }
  // createUser(user);
  form.reset();
});
