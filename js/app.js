// Let's check if the user is logged in

let isUserLoggedIn = localStorage.getItem("isAuthenticated");

// select nav bar links to reutilize them
let navbarUnorderedList = document.querySelector(".navbar-nav");

// If the user is authenticated, he or she should be able to log out

if (isUserLoggedIn == "true") {
  let logInOption = navbarUnorderedList.querySelector("#log-in");
  logInOption.remove();

  let registerOption = navbarUnorderedList.querySelector("#register");
  registerOption.remove();

  let newLogOutItem = document.createElement("li");
  newLogOutItem.innerHTML = `<a class="nav-link" id="log-out" href="./">Log out</a>`;

  newLogOutItem.addEventListener("click", logOutUser);

  console.log(newLogOutItem);
  navbarUnorderedList.append(newLogOutItem);

  console.log(newLogOutItem);
} else if (isUserLoggedIn == "false") {
  let logOutOption = navbarUnorderedList.querySelector("#log-out");
  logOutOption.remove();
}

function logOutUser() {
  localStorage.setItem("isAuthenticated", "false");
  alert("You have been logged out");
}
