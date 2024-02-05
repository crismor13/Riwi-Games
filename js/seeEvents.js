import { idUserlogin } from "./createNewEvent.js";
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Selectores
const container = document.getElementById("hero");
const URL = "http://localhost:3000/events";
let cache = idUserlogin();
// cache = "id login";

//eventos
document.addEventListener("DOMContentLoaded", () => {
  container.click();
  getEvents();
});

container.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("like")) {
    const id = e.target.getAttribute("data-id");
    confirmAsis(id);
  }

  if (e.target.classList.contains("dislike")) {
    const id = e.target.getAttribute("data-id");
    unConfirmAsis(id);
  }

  if (e.target.classList.contains("delete")) {
    const id = e.target.getAttribute("data-id");
    deleteEvent(id);
  }

  if (e.target.classList.contains("edit")) {
    const id = e.target.getAttribute("data-id");
    editEvent(id);
    window.location.href = "./createNewEvent.html";
  }
});

async function editEvent(id) {
  const response = await fetch(`${URL}/${id}`);
  const data = await response.json();
  const event = JSON.stringify(data);
  localStorage.setItem("event", event);
}

async function deleteEvent(id) {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function confirmAsis(id) {
  const response = await fetch(`${URL}/${id}`);
  const data = await response.json();
  const isUserInUnconfirmed = data.unconfirmed.some(
    (user) => user.userId === cache
  );
  const isUserInList = data.confirmed.some((user) => user.userId === cache); // esto busca si por lo menos uno esta en la lista
  if (!isUserInList) {
    const newAsist = [...data.confirmed, { userId: cache }];
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmed: newAsist }),
    });
    console.log("object");
  }

  if (isUserInUnconfirmed) {
    const newNotAsist = [...data.unconfirmed];
    const newlist = newNotAsist.filter((user) => user.userId !== cache);
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unconfirmed: newlist }),
    });
  }
}

async function unConfirmAsis(id) {
  const response = await fetch(`${URL}/${id}`);
  const data = await response.json();

  const isUserInUnconfirmed = data.unconfirmed.some(
    (user) => user.userId === cache
  );
  const isUserInList = data.confirmed.some((user) => user.userId === cache);

  if (isUserInList) {
    // const newAsist = [...data.confirmed, { userId: cache }];
    const newAsist = [...data.confirmed];
    const newlist = newAsist.filter((user) => user.userId !== cache);
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmed: newlist }),
    });
    console.log("object");
  }

  if (!isUserInUnconfirmed) {
    const newNotAsist = [...data.unconfirmed, { userId: cache }];
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unconfirmed: newNotAsist }),
    });
  }
}

async function getEvents() {
  const response = await fetch(`${URL}/?_embed=user`);
  const data = await response.json();
  pintarEvents(data);
}

function pintarEvents(data) {
  cleanHTML();
  data.forEach((event) => {
    const x = event.confirmed.length;
    const ux = event.unconfirmed.length;
    const number = Number.parseInt(event.rentalCost);
    const d = number / x;
    const cd = d.toLocaleString("en", {
      style: "currency",
      currency: "COP",
    });
    const cost = number.toLocaleString("en", {
      style: "currency",
      currency: "COP",
    });
    const div = document.createElement("div");
    div.classList.add("cont_cards");
    div.innerHTML += `
        <div class="card" style="width: 30rem">
          <div class="card-body d-flex flex-column">
            <div class="tittle d-flex justify-content-between">
              <h5 class="card-title">${event.location}</h5>
              <i
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="more information about the event"
                class="bx bxs-info-circle"
              ></i>
            </div>

            <div class="d-flex justify-content-evenly">
            <p>Date Event ${event.date}</p>
            <p>Time ${event.time}</p>
            </div>
            <div class="desc">
            <h5 class="card-text d-flex justify-content-center">
              ${event.description}
            </h5>
            </div>
            <div class="d-flex g-2 justify-content-evenly asist">
            <p class="">${cost}</p>
            <p class="g">
              Confirmed Players ${x}/${event.minPlayers}
            </p>
            <p class="r">
              Cannot Attend ${ux}
            </p>
            </div>
            <div class="d-flex justify-content-center">
            <p>Pay per player ${cd} </p>
            </div>
            <div class="d-flex justify-content-evenly">
            <p>Award</p>
            <p>${event.award}</p>
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                data-id="${event.id}"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Confirm Assistance"
                type="button"
                class="btn btn-success like"
              >
                <i class="bx bxs-like"></i>
              </button>
              <button
                data-id="${event.id}"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="I can't attend"
                type="button"
                class="btn btn-danger dislike"
              >
                <i class="bx bxs-dislike"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="buttonsS d-flex justify-content-evenly">

          <button data-id="${
            event.id
          }" type="button" class="btn btn-outline-light edit" ${
      event.userId !== cache && "disabled"
    } >Edit</button>
          <button data-id="${
            event.id
          }"type="button" class="btn btn-outline-light delete" ${
      event.userId !== cache && "disabled"
    }>Delete</button>

        </div>`;
    container.appendChild(div);
  });
}

function cleanHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
