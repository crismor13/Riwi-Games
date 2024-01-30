//selectores

const body = document.getElementById("body");
const sectionHome = document.getElementById("hero");

body.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("cta__btn1")) {
    sectionHome.style.display = "none";
    createEvent();
  }
});

function createEvent() {
  body.innerHTML += `<section class="hero2">
      <div class="create-event">
        <div class="container d-flex flex-column">
          <h4 class="text-center">New Event Information</h4>
          <form class="form-event">
            <div class="requerimientos">
              <fieldset class="border rounded-3 p-3 desc_award">
                <legend class="float-none w-auto px-3">
                  Minimum Requirements
                </legend>
                <!-- ubicacion lista -->
                <div class="min_requirements">
                  <div>
                    <label class="form-label"
                      >Rental Cost (skip if not necessary)</label
                    >
                    <input
                      name="rentalCost"
                      class="form-control"
                      type="number"
                      id="rental_cost"
                    />
                  </div>
                  <div>
                    <label class="form-label">Minimum Players Needed</label>
                    <input
                      name="minPlayers"
                      type="number"
                      class="form-control"
                      id="min_players"
                      required
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset class="border rounded-3 p-3 desc_award">
                <legend class="float-none w-auto px-3">
                  Location and Time
                </legend>
                <div class="location_time">
                  <div>
                    <label class="form-label">Location</label>
                    <input
                      name="location"
                      class="form-control"
                      type="text"
                      id="location"
                      required
                    />
                  </div>
                  <div>
                    <label class="form-label">Event Date</label>
                    <input
                      name="date"
                      type="date"
                      class="form-control"
                      id="date_event"
                      required
                    />
                  </div>
                  <div>
                    <label class="form-label">Event Time</label>
                    <input
                      name="time"
                      type="time"
                      class="form-control"
                      id="date_time"
                      required
                    />
                  </div>
                </div>
              </fieldset>
              <!-- mas datos -->
              <fieldset class="border rounded-3 p-3 desc_award">
                <legend class="float-none px-3">Description and Award</legend>
                <div class="des_award">
                  <div>
                    <label class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      name="description"
                      id="description"
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <label class="form-label">Award</label>
                    <textarea
                      class="form-control"
                      name="award"
                      id="award"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </fieldset>
            </div>
            <button type="submit" class="btn btn-success">Create Event</button>
          </form>
        </div>
      </div>
    </section>`;
}
