import { idUserlogin } from "./createNewEvent.js";
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Selectores
const container = document.getElementById("hero");
const URL = "http://localhost:3000";
let cache = idUserlogin();
// let prueba = await obtenerUser();
// console.log(prueba);
// async function obtenerUser() {
//   const response = await fetch(`${URL}/users`);
//   const data = await response.json();
//   return data;
// }

// cache = "id login";

//eventos

document.addEventListener("DOMContentLoaded", () => {
  getEvents();
  container.click();
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

  if (e.target.classList.contains("info")) {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    const dl = id + "d";
    const str = "." + id;
    const showInfo = document.getElementById(str);
    showInfo.classList.add("showI");

    const tbodylike = document.getElementById(id);
    const tbodydislike = document.getElementById(dl);

    cleanHTMLlikes(tbodylike, tbodydislike);

    getUsersEvent(id);
  }

  if (e.target.classList.contains("subcontentI")) {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    const str = "." + id;
    const showInfo = document.getElementById(str);
    showInfo.classList.remove("showI");
  }
});

async function editEvent(id) {
  const response = await fetch(`${URL}/events/${id}`);
  const data = await response.json();
  const event = JSON.stringify(data);
  localStorage.setItem("event", event);
}

async function deleteEvent(id) {
  await fetch(`${URL}/events/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function confirmAsis(id) {
  const response = await fetch(`${URL}/events/${id}`);
  const data = await response.json();
  const isUserInUnconfirmed = data.unconfirmed.some(
    (user) => user.userId === cache
  );
  const isUserInList = data.confirmed.some((user) => user.userId === cache); // esto busca si por lo menos uno esta en la lista

  if (!isUserInList) {
    const newAsist = [...data.confirmed, { userId: cache }];
    await fetch(`${URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmed: newAsist }),
    });
  }

  if (isUserInUnconfirmed) {
    const newNotAsist = [...data.unconfirmed];
    const newlist = newNotAsist.filter((user) => user.userId !== cache);
    await fetch(`${URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unconfirmed: newlist }),
    });
  }
}

async function unConfirmAsis(id) {
  const response = await fetch(`${URL}/events/${id}`);
  const data = await response.json();

  const isUserInUnconfirmed = data.unconfirmed.some(
    (user) => user.userId === cache
  );
  const isUserInList = data.confirmed.some((user) => user.userId === cache);

  if (isUserInList) {
    // const newAsist = [...data.confirmed, { userId: cache }];
    const newAsist = [...data.confirmed];
    const newlist = newAsist.filter((user) => user.userId !== cache);
    await fetch(`${URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmed: newlist }),
    });
  }

  if (!isUserInUnconfirmed) {
    const newNotAsist = [...data.unconfirmed, { userId: cache }];
    await fetch(`${URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unconfirmed: newNotAsist }),
    });
  }
}

async function getEvents() {
  const response = await fetch(`${URL}/events/?_embed=user`);
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
            <div class="tooltipI-container">
              <div class="tooltipI">
                <div id=".${event.id}" data-id="${
      event.id
    }" class="subcontentI">
                  <div class="asist">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Class</th>
                        </tr>
                      </thead>
                      <tbody id="${event.id}"></tbody>
                    </table>
                  </div>
                  <div class="unasist">
                    <table id="unlike">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Class</th>
                        </tr>
                      </thead>
                      <tbody id="${event.id}d"></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tittle d-flex justify-content-between">
              <h5 class="card-title">${event.location}</h5>
              <i data-id="${event.id}" class="bx bxs-info-circle info"></i>
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
              <p class="g">Confirmed Players ${x}/${event.minPlayers}</p>
              <p class="r">Cannot Attend ${ux}</p>
            </div>
            <div class="d-flex justify-content-center">
              <p>Pay per player ${cd}</p>
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
          <button
            data-id="${event.id}"
            type="button"
            class="btn btn-outline-light edit ${
              event.userId != cache && "disabled"
            }"
          >
            Edit
          </button>
          <button
            data-id="${event.id}"
            type="button"
            class="btn btn-outline-light delete ${
              event.userId != cache && "disabled"
            }"
          >
            Delete
          </button>
        </div>`;
    container.appendChild(div);
  });
}

function cleanHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function cleanHTMLlikes(tbodylike, tbodydislike) {
  while (tbodylike.firstChild) {
    tbodylike.removeChild(tbodylike.firstChild);
  }

  while (tbodydislike.firstChild) {
    tbodydislike.removeChild(tbodydislike.firstChild);
  }
}

async function getUsersEvent(id) {
  const response = await fetch(`${URL}/events/${id}`);
  const data = await response.json();
  const noparticipantes = await data.unconfirmed;
  const participantes = await data.confirmed;
  if (participantes.length != 0) {
    participantes.forEach((participante) => {
      obtenerInfo(participante, id);
    });
  }
  if (noparticipantes.length != 0) {
    noparticipantes.forEach((participante) => {
      obtenerInfod(participante, id);
    });
  }
}

async function obtenerInfo(userId, idEvent) {
  const Id = userId.userId;
  const response = await fetch(`${URL}/users/${Id}`);
  const data = await response.json();
  const fullName = await data.fullName;
  const level = await data.level;
  inyectarInfo(fullName, level, idEvent);
}

async function obtenerInfod(userId, idEvent) {
  // console.log(userId);
  const Id = userId.userId;
  // console.log(Id);
  const response = await fetch(`${URL}/users/${Id}`);
  const data = await response.json();
  const fullName = await data.fullName;
  const level = await data.level;
  inyectarInfod(fullName, level, idEvent);
}

function inyectarInfo(fullName, level, idEvent) {
  // console.log(idEvent);
  // console.log(fullName);
  // console.log(level);
  const tbodylike = document.getElementById(idEvent);
  const tr = document.createElement("tr");
  tr.innerHTML += `<td>${fullName}</td>
  <td>${level}</td>`;
  tbodylike.appendChild(tr);
}

function inyectarInfod(fullName, level, idEvent) {
  console.log(idEvent);
  console.log(fullName);
  console.log(level);
  const id = idEvent + "d";
  const tbodydislike = document.getElementById(id);
  const tr = document.createElement("tr");
  console.log(tbodydislike);
  tr.innerHTML += `<td>${fullName}</td>
  <td>${level}</td>`;
  tbodydislike.appendChild(tr);
}
