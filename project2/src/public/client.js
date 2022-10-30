let store = {
  user: { name: "Student" },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  selectedRover: "Curiosity",
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);

  store.rovers.forEach((elm) => {
    const button = document.getElementById(`${elm}`);
    button.addEventListener("click", function (event) {
      const roverName = String(event.target.id);
      state.selected = roverName;
      getRoverPhotos(store);
    });
  });
};

// create content
const App = (state) => {
  let { rovers, apod, photos } = state;

  return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                ${rovers
                  .map((r) => `<button class="btn" id="${r}">${r}</button>`)
                  .join("")}
                </div>
            </section>
            <p>number of photos ${countPhotos(photos, calculatePhotosCount)}</p>
            <div>${setRoverPhotos(photos, RoverPhotosHandler)}</div>
        </main>
        <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `<h1>Welcome, ${name}!</h1>`;
  }

  return `<h1>Hello!</h1>`;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
  }
};

const setRoverPhotos = (photos, callback) => {
  return callback(photos);
};

const RoverPhotosHandler = (photos) => {
  return store.selected
    ? `
  <div class="rover-card">
  <p>Information</p>
  <dl>
  <dt>Rover Name</dt>
  <dd>${store.selected}</dd>
  <dt>Launch date</dt>
  <dd>${photos[0].rover.launch_date}</dd>
  <dt>Landing date</dt>
  <dd>${photos[0].rover.landing_date}</dd>
  <dt>Status</dt>
  <dd>${photos[0].rover.status}</dd>
    </dl>
  </div>` +
        `<div class="grid-container">
  ${photos
    .map(
      (photo) => `
  <div class="">
  <img src="${photo.img_src}" height="auto" width="auto" />
  </div>
  `
    )
    .join("")}
  </div>`
    : '<div class="empty-select-dev"><p>Please select from above</p></div>';
};

// ------------------------------------------------------  API CALLS
const getRoverPhotos = (state) => {
  const roverName = state.selected;
  fetch(`http://localhost:3000/${roverName}/photos`)
    .then((res) => res.json())
    .then((photos) => updateStore(store, photos));
};

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));

  return data;
};
const calculatePhotosCount = (photos) => {
  return photos?.length || 0;
};
const countPhotos = (photos, callback) => {
  return callback(photos);
};
