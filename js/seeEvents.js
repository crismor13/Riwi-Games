const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Selectores
const container = document.getElementById("hero");
const URL = "http://localhost:3000/events";

//eventos
document.addEventListener("DOMContentLoaded", () => {
  getEvents();
});

async function getEvents() {
  const response = await fetch(`${URL}?_embed=user`);
  const data = await response.json();
  pintarEvents(data);
}

function pintarEvents(data) {
  console.log(data);
  cleanHTML();
  data.forEach((event) => {
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

            <div class="d-flex justify-content-between">
            <p>Date Event ${event.date}</p>
            <p>time ${event.time}</p>
            </div>

            <p class="card-text">
              ${event.description}
            </p>
            <div class="d-flex g-2 justify-content-between">
            <p class="card-text">${event.rentalCost}</p>
            <p class="card-text">
              Confirmed Players 0/${event.minPlayers}
            </p>
            <p class="card-text">
              Cannot Attend 0 
            </p>
            </div>
            <div class="d-flex justify-content-center">
            <p>pay per player </p>
            </div>
            <div class="d-flex justify-content-between">
            <p>Award</p>
            <p>${event.award}</p>
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Confirm Assistance"
                type="button"
                class="btn btn-success"
              >
                <i class="bx bxs-like"></i>
              </button>
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="I can't attend"
                type="button"
                class="btn btn-danger"
              >
                <i class="bx bxs-dislike"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="buttonsS d-flex justify-content-evenly">
          <button type="button" class="btn btn-outline-light">Edit</button>
          <button type="button" class="btn btn-outline-light">Delete</button>
        </div>`;
    container.appendChild(div);
  });
}

function cleanHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
