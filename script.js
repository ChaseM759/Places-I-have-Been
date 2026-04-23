const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const US_STATES_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const LEGACY_STORAGE_KEY = "places-i-have-travelled.entries";
const PROFILE_KEY = "places-i-have-travelled.profiles";
const ACTIVE_PROFILE_KEY = "places-i-have-travelled.activeProfile";
const PROFILE_COLLECTION = "travelProfiles";
const TOTAL_WORLD_COUNTRIES = 177;
const TOTAL_US_STATES = 50;
const USER_COLLECTION = "users";
const MICROCOUNTRIES = [
  { id: "020", name: "Andorra", continent: "Europe", coordinates: [1.5218, 42.5063] },
  { id: "438", name: "Liechtenstein", continent: "Europe", coordinates: [9.5554, 47.166] },
  { id: "470", name: "Malta", continent: "Europe", coordinates: [14.3754, 35.9375] },
  { id: "492", name: "Monaco", continent: "Europe", coordinates: [7.4246, 43.7384] },
  { id: "674", name: "San Marino", continent: "Europe", coordinates: [12.4578, 43.9424] },
  { id: "336", name: "Vatican City", continent: "Europe", coordinates: [12.4534, 41.9033] }
];

const stateNamesById = new Map([
  ["01", "Alabama"], ["02", "Alaska"], ["04", "Arizona"], ["05", "Arkansas"],
  ["06", "California"], ["08", "Colorado"], ["09", "Connecticut"], ["10", "Delaware"],
  ["11", "District of Columbia"], ["12", "Florida"], ["13", "Georgia"], ["15", "Hawaii"],
  ["16", "Idaho"], ["17", "Illinois"], ["18", "Indiana"], ["19", "Iowa"],
  ["20", "Kansas"], ["21", "Kentucky"], ["22", "Louisiana"], ["23", "Maine"],
  ["24", "Maryland"], ["25", "Massachusetts"], ["26", "Michigan"], ["27", "Minnesota"],
  ["28", "Mississippi"], ["29", "Missouri"], ["30", "Montana"], ["31", "Nebraska"],
  ["32", "Nevada"], ["33", "New Hampshire"], ["34", "New Jersey"], ["35", "New Mexico"],
  ["36", "New York"], ["37", "North Carolina"], ["38", "North Dakota"], ["39", "Ohio"],
  ["40", "Oklahoma"], ["41", "Oregon"], ["42", "Pennsylvania"], ["44", "Rhode Island"],
  ["45", "South Carolina"], ["46", "South Dakota"], ["47", "Tennessee"], ["48", "Texas"],
  ["49", "Utah"], ["50", "Vermont"], ["51", "Virginia"], ["53", "Washington"],
  ["54", "West Virginia"], ["55", "Wisconsin"], ["56", "Wyoming"], ["72", "Puerto Rico"]
]);

const countryAliases = new Map([
  ["usa", "United States of America"],
  ["u s a", "United States of America"],
  ["united states", "United States of America"],
  ["uk", "United Kingdom"],
  ["great britain", "United Kingdom"],
  ["south korea", "South Korea"],
  ["north korea", "North Korea"],
  ["czech republic", "Czechia"]
]);

const continentByCountry = {
  Afghanistan: "Asia", Albania: "Europe", Algeria: "Africa", Andorra: "Europe", Angola: "Africa",
  Argentina: "South America", Armenia: "Asia", Australia: "Oceania", Austria: "Europe",
  Azerbaijan: "Asia", Bahamas: "North America", Bahrain: "Asia", Bangladesh: "Asia",
  Barbados: "North America", Belarus: "Europe", Belgium: "Europe", Belize: "North America",
  Benin: "Africa", Bhutan: "Asia", Bolivia: "South America", Botswana: "Africa",
  Brazil: "South America", Bulgaria: "Europe", Cambodia: "Asia", Cameroon: "Africa",
  Canada: "North America", Chile: "South America", China: "Asia", Colombia: "South America",
  Congo: "Africa", "Costa Rica": "North America", "Côte d'Ivoire": "Africa", Croatia: "Europe", Cuba: "North America",
  Cyprus: "Europe", Czechia: "Europe", Denmark: "Europe", Egypt: "Africa", Estonia: "Europe",
  Ethiopia: "Africa", Finland: "Europe", France: "Europe", Georgia: "Asia", Germany: "Europe",
  Ghana: "Africa", Greece: "Europe", Guatemala: "North America", Haiti: "North America",
  Honduras: "North America", Hungary: "Europe", Iceland: "Europe", India: "Asia",
  Indonesia: "Asia", Iran: "Asia", Iraq: "Asia", Ireland: "Europe", Israel: "Asia",
  Italy: "Europe", Jamaica: "North America", Japan: "Asia", Jordan: "Asia", Kenya: "Africa",
  Kuwait: "Asia", Laos: "Asia", Latvia: "Europe", Lebanon: "Asia", Libya: "Africa",
  Lithuania: "Europe", Luxembourg: "Europe", Madagascar: "Africa", Malaysia: "Asia",
  Mexico: "North America", Monaco: "Europe", Mongolia: "Asia", Morocco: "Africa",
  Nepal: "Asia", Netherlands: "Europe", "New Zealand": "Oceania", Nicaragua: "North America",
  Nigeria: "Africa", Norway: "Europe", Pakistan: "Asia", Panama: "North America",
  Paraguay: "South America", Peru: "South America", Philippines: "Asia", Poland: "Europe",
  Portugal: "Europe", Qatar: "Asia", Romania: "Europe", Russia: "Europe", Rwanda: "Africa",
  "Saudi Arabia": "Asia", Senegal: "Africa", Serbia: "Europe", Singapore: "Asia",
  Slovakia: "Europe", Slovenia: "Europe", Somalia: "Africa", "South Africa": "Africa",
  Sudan: "Africa", "South Sudan": "Africa",
  "South Korea": "Asia", Spain: "Europe", "Sri Lanka": "Asia", Sweden: "Europe",
  Switzerland: "Europe", Syria: "Asia", Taiwan: "Asia", Tanzania: "Africa", Thailand: "Asia",
  Tunisia: "Africa", Turkey: "Asia", Uganda: "Africa", Ukraine: "Europe",
  "United Arab Emirates": "Asia", "United Kingdom": "Europe",
  "United States of America": "North America", Uruguay: "South America", "Vatican City": "Europe",
  Venezuela: "South America", Vietnam: "Asia", Yemen: "Asia", Zambia: "Africa", Zimbabwe: "Africa"
};

const continentAliases = new Map([
  ["antarctica", "Antarctica"],
  ["bosnia and herz", "Europe"],
  ["burkina faso", "Africa"],
  ["burundi", "Africa"],
  ["central african rep", "Africa"],
  ["cape verde", "Africa"],
  ["cabo verde", "Africa"],
  ["chad", "Africa"],
  ["ivory coast", "Africa"],
  ["côte d'ivoire", "Africa"],
  ["cote d ivoire", "Africa"],
  ["cote divoire", "Africa"],
  ["democratic republic of the congo", "Africa"],
  ["dem rep congo", "Africa"],
  ["djibouti", "Africa"],
  ["dominican rep", "North America"],
  ["dr congo", "Africa"],
  ["ecuador", "South America"],
  ["el salvador", "North America"],
  ["eq guinea", "Africa"],
  ["eritrea", "Africa"],
  ["republic of the congo", "Africa"],
  ["eswatini", "Africa"],
  ["falkland is", "South America"],
  ["fiji", "Oceania"],
  ["fr s antarctic lands", "Europe"],
  ["gabon", "Africa"],
  ["swaziland", "Africa"],
  ["greenland", "Europe"],
  ["the gambia", "Africa"],
  ["gambia", "Africa"],
  ["guinea", "Africa"],
  ["guinea bissau", "Africa"],
  ["guyana", "South America"],
  ["kazakhstan", "Asia"],
  ["kosovo", "Europe"],
  ["kyrgyzstan", "Asia"],
  ["lesotho", "Africa"],
  ["liberia", "Africa"],
  ["macedonia", "Europe"],
  ["malawi", "Africa"],
  ["mali", "Africa"],
  ["mauritania", "Africa"],
  ["montenegro", "Europe"],
  ["mozambique", "Africa"],
  ["myanmar", "Asia"],
  ["n cyprus", "Asia"],
  ["namibia", "Africa"],
  ["new caledonia", "Europe"],
  ["niger", "Africa"],
  ["north korea", "Asia"],
  ["oman", "Asia"],
  ["palestine", "Asia"],
  ["papua new guinea", "Oceania"],
  ["puerto rico", "North America"],
  ["s sudan", "Africa"],
  ["sao tome and principe", "Africa"],
  ["sao tome principe", "Africa"],
  ["sierra leone", "Africa"],
  ["solomon is", "Oceania"],
  ["somaliland", "Africa"],
  ["suriname", "South America"],
  ["tajikistan", "Asia"],
  ["togo", "Africa"],
  ["trinidad and tobago", "North America"],
  ["turkmenistan", "Asia"],
  ["uzbekistan", "Asia"],
  ["vanuatu", "Oceania"],
  ["w sahara", "Africa"],
  ["curacao", "North America"],
  ["timor leste", "Asia"],
  ["east timor", "Asia"],
  ["bosnia and herzegovina", "Europe"],
  ["north macedonia", "Europe"],
  ["moldova", "Europe"],
  ["brunei", "Asia"],
  ["micronesia", "Oceania"]
]);

const app = {
  countries: [],
  microcountries: [],
  states: [],
  places: new Map(),
  lookup: new Map(),
  tooltip: document.querySelector("#tooltip"),
  mapGroup: null,
  zoom: null,
  editKey: null,
  detailKey: null,
  editItemIndex: null,
  profiles: [],
  activeProfileId: "default",
  db: null,
  auth: null,
  currentUser: null,
  authProvider: null,
  useRemoteData: false,
  hasStarted: false
};

const defaultEntries = [
  {
    key: "state:25",
    name: "Massachusetts",
    type: "state",
    continent: "North America",
    continuous: true,
    visits: [],
    highlights: []
  }
];

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindUi();
  document.body.classList.add("is-locked");
  initializeDatabase();
  setupAuth();
}

async function startApp() {
  showLoading();

  try {
    const [world, us] = await Promise.all([d3.json(WORLD_URL), d3.json(US_STATES_URL)]);

    app.countries = topojson.feature(world, world.objects.countries).features.map((feature) => {
      const id = String(feature.id);
      const name = feature.properties?.name || `Country ${id}`;
      feature.properties = {
        ...feature.properties,
        id,
        name,
        kind: "country",
        key: `country:${id}`,
        continent: resolveContinent(name)
      };
      return feature;
    });

    app.microcountries = MICROCOUNTRIES.map((item) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: item.coordinates },
      properties: {
        id: item.id,
        name: item.name,
        kind: "country",
        key: `country:${item.id}`,
        continent: item.continent
      }
    }));

    app.states = topojson.feature(us, us.objects.states).features.map((feature) => {
      const id = String(feature.id).padStart(2, "0");
      feature.properties = {
        ...feature.properties,
        id,
        name: stateNamesById.get(id) || `State ${id}`,
        kind: "state",
        key: `state:${id}`,
        continent: "North America"
      };
      return feature;
    });

    buildLookup();
    loadProfilesFromLocal();
    loadEntriesFromLocal();
    renderMap();
    refreshPanels();
    void syncRemoteState();
  } catch (error) {
    const svg = d3.select("#travelMap");
    svg.selectAll("*").remove();
    svg.append("text")
      .attr("x", 600)
      .attr("y", 360)
      .attr("text-anchor", "middle")
      .attr("fill", "#f3f7f5")
      .attr("font-size", 24)
      .text("Map data could not load. Check your internet connection and refresh.");
  }
}

function bindUi() {
  document.querySelector("#menuToggle").addEventListener("click", toggleMenu);
  document.querySelector("#signInButton").addEventListener("click", signInWithGoogle);
  document.querySelector("#signOutButton").addEventListener("click", signOutCurrentUser);
  document.querySelector("#profileSelect").addEventListener("change", switchProfile);
  document.querySelector("#profileForm").addEventListener("submit", addProfile);
  document.querySelector("#deleteProfileButton").addEventListener("click", deleteActiveProfile);
  document.querySelector("#zoomIn").addEventListener("click", () => zoomMap(1.35));
  document.querySelector("#zoomOut").addEventListener("click", () => zoomMap(0.75));
  document.querySelector("#zoomReset").addEventListener("click", resetZoom);
  document.querySelector("#timelineToggle").addEventListener("click", toggleTimeline);
  document.querySelector("#closeTimeline").addEventListener("click", () => {
    document.querySelector("#timelinePanel").hidden = true;
  });
  document.querySelector("#searchForm").addEventListener("submit", handleSearch);
  document.querySelector("#continentToggle").addEventListener("click", toggleContinents);
  document.querySelector("#percentToggle").addEventListener("click", togglePercentages);
  document.querySelector("#visitedToggle").addEventListener("click", toggleVisited);
  document.querySelector("#addNewButton").addEventListener("click", openModal);
  document.querySelector("#closeModal").addEventListener("click", closeModal);
  document.querySelector("#modalBackdrop").addEventListener("click", (event) => {
    if (event.target.id === "modalBackdrop") closeModal();
  });
  document.querySelector("#closeDetail").addEventListener("click", () => {
    document.querySelector("#detailSlide").hidden = true;
  });
  document.querySelector("#editDetail").addEventListener("click", () => {
    if (app.detailKey) openEditModal(app.detailKey);
  });
  document.querySelector("#detailVisits").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-index]");
    if (button) deleteDetailEntry(Number(button.dataset.deleteIndex));
    const editButton = event.target.closest("[data-edit-index]");
    if (editButton) editDetailEntry(Number(editButton.dataset.editIndex));
  });
  document.querySelector("#visitedList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-edit-key]");
    if (button) openEditModal(button.dataset.editKey);
  });
  document.querySelector("#placeInput").addEventListener("input", validatePlaceInput);
  document.querySelector("#continuousInput").addEventListener("change", toggleOptionalFields);
  document.querySelector("#addForm").addEventListener("submit", savePlace);
}

function toggleMenu() {
  const collapsed = document.body.classList.toggle("menu-collapsed");
  const button = document.querySelector("#menuToggle");
  button.setAttribute("aria-expanded", String(!collapsed));
  button.setAttribute("aria-label", collapsed ? "Open menu" : "Close menu");
  button.textContent = collapsed ? "Menu" : "Close";
}

function showLoading() {
  d3.select("#travelMap").append("text")
    .attr("x", 600)
    .attr("y", 360)
    .attr("text-anchor", "middle")
    .attr("fill", "#9aa6a4")
    .attr("font-size", 22)
    .text("Loading map...");
}

function buildLookup() {
  app.lookup.clear();
  [...app.countries, ...app.microcountries, ...app.states].forEach((feature) => {
    app.lookup.set(normalize(feature.properties.name), feature.properties);
  });
  countryAliases.forEach((officialName, alias) => {
    const country = app.countries.find((feature) => feature.properties.name === officialName);
    if (country) app.lookup.set(alias, country.properties);
  });
}

function initializeDatabase() {
  try {
    if (!window.firebase || !window.travelFirebaseConfig) return;
    if (!firebase.apps.length) {
      firebase.initializeApp(window.travelFirebaseConfig);
    }
    app.auth = firebase.auth();
    app.db = firebase.firestore();
    app.authProvider = new firebase.auth.GoogleAuthProvider();
    app.useRemoteData = true;
  } catch (error) {
    app.auth = null;
    app.db = null;
    app.useRemoteData = false;
  }
}

function setupAuth() {
  const gate = document.querySelector("#authGate");
  if (!app.auth) {
    gate.hidden = true;
    document.body.classList.remove("is-locked");
    void startApp();
    return;
  }

  app.auth.onAuthStateChanged(async (user) => {
    app.currentUser = user;
    renderAuthStatus();
    if (!user) {
      gate.hidden = false;
      document.body.classList.add("is-locked");
      app.profiles = [];
      app.places = new Map();
      if (app.hasStarted) {
        refreshPanels();
        d3.select("#travelMap").selectAll("*").remove();
        showLoading();
      }
      return;
    }

    gate.hidden = true;
    document.body.classList.remove("is-locked");
    if (!app.hasStarted) {
      app.hasStarted = true;
      await startApp();
      return;
    }

    await loadProfiles();
    await loadEntries();
    updateRegionStyles();
    refreshPanels();
  });
}

async function signInWithGoogle() {
  const message = document.querySelector("#authMessage");
  message.classList.remove("is-error");
  try {
    await app.auth.signInWithPopup(app.authProvider);
  } catch (error) {
    if (error.code === "auth/popup-blocked" || error.code === "auth/operation-not-supported-in-this-environment") {
      await app.auth.signInWithRedirect(app.authProvider);
      return;
    }
    message.textContent = "Google sign-in did not complete.";
    message.classList.add("is-error");
  }
}

async function signOutCurrentUser() {
  if (!app.auth) return;
  await app.auth.signOut();
}

async function loadProfiles() {
  if (app.useRemoteData && app.db) {
    try {
      await withTimeout(loadProfilesFromFirestore(), 6000);
      return;
    } catch (error) {
      app.useRemoteData = false;
    }
  }
  loadProfilesFromLocal();
}

async function loadProfilesFromFirestore() {
  try {
    const snapshot = await profileCollectionRef().get();
    if (snapshot.empty) {
      await migrateLocalProfilesToFirestore();
      const migratedSnapshot = await profileCollectionRef().get();
      app.profiles = migratedSnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name || doc.id }));
    } else {
      app.profiles = snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name || doc.id }));
    }
  } catch (error) {
    app.useRemoteData = false;
    loadProfilesFromLocal();
    return;
  }

  if (!app.profiles.length) {
    app.profiles = [{ id: "default", name: "My Map" }];
    await ensureRemoteProfile(app.profiles[0], defaultEntries);
  }

  app.activeProfileId = localStorage.getItem(ACTIVE_PROFILE_KEY) || app.profiles[0].id;
  if (!app.profiles.some((profile) => profile.id === app.activeProfileId)) {
    app.activeProfileId = app.profiles[0].id;
  }
  saveProfileState();
}

function loadProfilesFromLocal() {
  let profiles = null;
  try {
    profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
  } catch (error) {
    profiles = null;
  }

  if (!Array.isArray(profiles) || !profiles.length) {
    profiles = [{ id: "default", name: "My Map" }];
    migrateLegacyEntries();
  }

  app.profiles = profiles;
  app.activeProfileId = localStorage.getItem(ACTIVE_PROFILE_KEY) || profiles[0].id;
  if (!profiles.some((profile) => profile.id === app.activeProfileId)) {
    app.activeProfileId = profiles[0].id;
  }
  saveProfileState();
}

function migrateLegacyEntries() {
  try {
    const oldEntries = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "null");
    if (Array.isArray(oldEntries)) {
      localStorage.setItem(profileStorageKey("default"), JSON.stringify(oldEntries));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch (error) {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
}

function saveProfileState() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(app.profiles));
  localStorage.setItem(ACTIVE_PROFILE_KEY, app.activeProfileId);
}

async function loadEntries() {
  if (app.useRemoteData && app.db) {
    try {
      await withTimeout(loadEntriesFromFirestore(), 6000);
      return;
    } catch (error) {
      app.useRemoteData = false;
    }
  }
  loadEntriesFromLocal();
}

async function loadEntriesFromFirestore() {
  let entries = defaultEntries;
  try {
    const doc = await profileCollectionRef().doc(app.activeProfileId).get();
    if (doc.exists) {
      const data = doc.data() || {};
      if (Array.isArray(data.entries)) entries = data.entries;
    } else {
      const profile = app.profiles.find((item) => item.id === app.activeProfileId) || { id: app.activeProfileId, name: app.activeProfileId };
      await ensureRemoteProfile(profile, entries);
    }
  } catch (error) {
    app.useRemoteData = false;
    loadEntriesFromLocal();
    return;
  }

  app.places = new Map(entries.filter((entry) => entry.key).map(normalizeEntry).map((entry) => [entry.key, entry]));
}

function loadEntriesFromLocal() {
  let entries = defaultEntries;
  try {
    const stored = JSON.parse(localStorage.getItem(profileStorageKey(app.activeProfileId)) || "null");
    if (Array.isArray(stored)) entries = stored;
  } catch (error) {
    localStorage.removeItem(profileStorageKey(app.activeProfileId));
  }

  app.places = new Map(
    entries
      .filter((entry) => entry.key)
      .map(normalizeEntry)
      .map((entry) => [entry.key, entry])
  );
  saveEntries();
}

async function saveEntries() {
  localStorage.setItem(profileStorageKey(app.activeProfileId), JSON.stringify([...app.places.values()]));
  if (app.useRemoteData && app.db) {
    const profile = app.profiles.find((item) => item.id === app.activeProfileId) || { id: app.activeProfileId, name: app.activeProfileId };
    await ensureRemoteProfile(profile, [...app.places.values()]);
    return;
  }
}

function profileStorageKey(profileId) {
  return `places-i-have-travelled.profile.${profileId}.entries`;
}

function renderMap() {
  const svg = d3.select("#travelMap");
  svg.selectAll("*").remove();
  const projection = d3.geoNaturalEarth1().fitSize([1120, 640], {
    type: "FeatureCollection",
    features: app.countries
  });
  const path = d3.geoPath(projection);
  app.mapGroup = svg.append("g").attr("transform", "translate(40, 42)");
  app.zoom = d3.zoom()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [1200, 720]])
    .on("zoom", (event) => {
      app.mapGroup.attr("transform", event.transform.toString());
    });

  svg.call(app.zoom);
  svg.call(app.zoom.transform, d3.zoomIdentity.translate(40, 42));

  app.mapGroup.selectAll(".country")
    .data(app.countries)
    .join("path")
    .attr("class", (d) => regionClass(d.properties))
    .attr("data-key", (d) => d.properties.key)
    .attr("d", path)
    .on("mousemove", handleRegionHover)
    .on("mouseleave", hideTooltip)
    .on("click", handleRegionClick);

  app.mapGroup.selectAll(".state")
    .data(app.states)
    .join("path")
    .attr("class", (d) => `${regionClass(d.properties)} us-state`)
    .attr("data-key", (d) => d.properties.key)
    .attr("d", path)
    .on("mousemove", handleRegionHover)
    .on("mouseleave", hideTooltip)
    .on("click", handleRegionClick);

  app.mapGroup.selectAll(".microcountry")
    .data(app.microcountries)
    .join("circle")
    .attr("class", (d) => `${regionClass(d.properties)} microcountry`)
    .attr("data-key", (d) => d.properties.key)
    .attr("cx", (d) => path.centroid(d)[0])
    .attr("cy", (d) => path.centroid(d)[1])
    .attr("r", 3.6)
    .on("mousemove", handleRegionHover)
    .on("mouseleave", hideTooltip)
    .on("click", handleRegionClick);
}

function zoomMap(factor) {
  d3.select("#travelMap").transition().duration(180).call(app.zoom.scaleBy, factor);
}

function resetZoom() {
  d3.select("#travelMap")
    .transition()
    .duration(180)
    .call(app.zoom.transform, d3.zoomIdentity.translate(40, 42));
}

function regionClass(properties) {
  const place = app.places.get(properties.key);
  if (!place) return "map-region";
  return place.home ? "map-region is-home" : "map-region is-visited";
}

function updateRegionStyles() {
  d3.selectAll(".map-region").attr("class", function () {
    const key = this.dataset.key;
    const stateClass = this.classList.contains("us-state") ? " us-state" : "";
    const place = app.places.get(key);
    if (!place) return `map-region${stateClass}`;
    return `${place.home ? "map-region is-home" : "map-region is-visited"}${stateClass}`;
  });
}

function handleRegionHover(event, feature) {
  const place = app.places.get(feature.properties.key);
  const meta = place
    ? place.continuous
      ? `${place.home ? "Home" : "Continuous"}${getHighlights(place).length ? " | Click to see highlights" : ""}`
      : `${formatYears(getVisits(place))} | Click to see more`
    : "Not added yet";

  app.tooltip.hidden = false;
  app.tooltip.innerHTML = `<strong>${feature.properties.name}</strong><span>${meta}</span>`;
  app.tooltip.style.left = `${event.clientX + 14}px`;
  app.tooltip.style.top = `${event.clientY + 14}px`;
}

function hideTooltip() {
  app.tooltip.hidden = true;
}

function handleRegionClick(_event, feature) {
  const place = app.places.get(feature.properties.key);
  if (place) showDetail(place, feature.properties.kind, _event.clientX);
}

function handleSearch(event) {
  event.preventDefault();
  const properties = findPlace(document.querySelector("#searchInput").value);
  const result = document.querySelector("#searchResult");
  clearHighlights();

  if (!properties) {
    result.innerHTML = "No matching country or US state was found.";
    return;
  }

  const saved = app.places.get(properties.key);
  const type = properties.kind === "state" ? "US state" : "country";
  const visited = saved
    ? saved.home
      ? "Home"
      : saved.continuous
      ? "Visited continuously"
      : `Visited: ${formatYears(getVisits(saved))}`
    : "Not marked as visited";

  result.innerHTML = `<strong>${properties.name}</strong><br>Type: ${type}<br>Continent: ${properties.continent}<br>Status: ${visited}`;
  d3.select(`[data-key="${properties.key}"]`).classed("is-highlighted", true);
}

function toggleContinents() {
  const list = document.querySelector("#continentList");
  const toggle = document.querySelector("#continentToggle span");
  list.hidden = !list.hidden;
  toggle.textContent = list.hidden ? "+" : "-";
}

function toggleVisited() {
  const list = document.querySelector("#visitedList");
  const toggle = document.querySelector("#visitedToggle span");
  list.hidden = !list.hidden;
  toggle.textContent = list.hidden ? "+" : "-";
}

function togglePercentages() {
  const list = document.querySelector("#percentList");
  const toggle = document.querySelector("#percentToggle span");
  list.hidden = !list.hidden;
  toggle.textContent = list.hidden ? "+" : "-";
}

function refreshPanels() {
  renderStorageBadge();
  renderBrandTitle();
  renderProfiles();
  renderVisitedList();
  renderContinents();
  renderPercentages();
  renderTimeline();
}

function renderStorageBadge() {
  const badge = document.querySelector("#storageBadge");
  if (!badge) return;
  badge.classList.remove("is-remote", "is-local");
  if (app.useRemoteData && app.db && app.currentUser) {
    badge.textContent = "Firebase connected";
    badge.classList.add("is-remote");
  } else {
    badge.textContent = app.auth ? "Sign in required" : "Local only";
    badge.classList.add("is-local");
  }
}

function renderAuthStatus() {
  const status = document.querySelector("#authStatus");
  if (!status) return;
  status.textContent = app.currentUser ? `Signed in as ${app.currentUser.email || "Google user"}` : "Not signed in";
}

function renderBrandTitle() {
  const title = document.querySelector("#brandTitle");
  const profile = app.profiles.find((item) => item.id === app.activeProfileId);
  if (!title) return;
  title.textContent = profile ? `Places ${profile.name} Has Travelled` : "Places I Have Travelled";
}

function renderProfiles() {
  const select = document.querySelector("#profileSelect");
  select.innerHTML = app.profiles
    .map((profile) => `<option value="${profile.id}">${escapeHtml(profile.name)}</option>`)
    .join("");
  select.value = app.activeProfileId;
  document.querySelector("#deleteProfileButton").disabled = app.profiles.length <= 1;
}

async function switchProfile(event) {
  app.activeProfileId = event.target.value;
  saveProfileState();
  await loadEntries();
  updateRegionStyles();
  refreshPanels();
  document.querySelector("#detailSlide").hidden = true;
}

async function addProfile(event) {
  event.preventDefault();
  const input = document.querySelector("#profileNameInput");
  const name = input.value.trim();
  if (!name) return;

  const profile = { id: `profile-${Date.now()}`, name };
  app.profiles.push(profile);
  app.activeProfileId = profile.id;
  app.places = new Map();
  promptForHomePlace();
  saveProfileState();
  await saveEntries();
  input.value = "";
  updateRegionStyles();
  refreshPanels();
  document.querySelector("#detailSlide").hidden = true;
}

async function deleteActiveProfile() {
  if (app.profiles.length <= 1) return;
  const profile = app.profiles.find((item) => item.id === app.activeProfileId);
  const name = profile ? profile.name : "this profile";
  if (!window.confirm(`Delete ${name} and its saved map?`)) return;

  if (app.useRemoteData && app.db) {
    await profileCollectionRef().doc(app.activeProfileId).delete();
  } else {
    localStorage.removeItem(profileStorageKey(app.activeProfileId));
  }
  app.profiles = app.profiles.filter((item) => item.id !== app.activeProfileId);
  app.activeProfileId = app.profiles[0].id;
  saveProfileState();
  await loadEntries();
  updateRegionStyles();
  refreshPanels();
  document.querySelector("#detailSlide").hidden = true;
}

function renderVisitedList() {
  const list = document.querySelector("#visitedList");
  const entries = [...app.places.values()].sort((a, b) => a.name.localeCompare(b.name));
  if (!entries.length) {
    list.textContent = "No places added yet.";
    return;
  }
  const grouped = new Map();
  entries.forEach((entry) => {
    if (!grouped.has(entry.continent)) grouped.set(entry.continent, []);
    grouped.get(entry.continent).push(entry);
  });

  list.innerHTML = [...grouped.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([continent, continentEntries]) => {
      const items = continentEntries.map((entry) => {
        const meta = entry.home ? "Home" : entry.continuous ? "Continuous" : formatYears(getVisits(entry));
        const label = entry.continuous ? "Add highlight" : "Add another visit";
        const homeClass = entry.home ? " is-home" : "";
        return `<div class="visited-item${homeClass}"><button class="visited-edit" type="button" data-edit-key="${entry.key}" aria-label="${label} to ${escapeHtml(entry.name)}">Edit</button><strong>${escapeHtml(entry.name)}</strong><br>${escapeHtml(meta)}</div>`;
      }).join("");
      return `<section class="visited-group"><div class="visited-group-title">${escapeHtml(continent)}</div>${items}</section>`;
    })
    .join("");
}

function renderContinents() {
  const list = document.querySelector("#continentList");
  const counts = new Map();
  let visitedStateCount = 0;
  app.places.forEach((entry) => {
    const countryKey = entry.type === "state" ? "country:840" : entry.key;
    if (!counts.has(entry.continent)) counts.set(entry.continent, new Set());
    counts.get(entry.continent).add(countryKey);
    if (entry.type === "state") visitedStateCount += 1;
  });

  if (!counts.size) {
    list.innerHTML = "No continents yet.";
    return;
  }

  const continentOrder = [
    "North America",
    "Asia",
    "Europe",
    "South America",
    "Africa",
    "Oceania"
  ];

  list.innerHTML = [...counts.entries()]
    .sort((a, b) => {
      const aIndex = continentOrder.indexOf(a[0]);
      const bIndex = continentOrder.indexOf(b[0]);
      if (aIndex === -1 && bIndex === -1) return a[0].localeCompare(b[0]);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    })
    .map(([continent, count]) => {
    const countryCount = count.size;
    const label = countryCount === 1 ? "country" : "countries";
    const states = continent === "North America" && visitedStateCount
      ? `<div class="stat-subrow">${visitedStateCount} ${visitedStateCount === 1 ? "state" : "states"}</div>`
      : "";
    return `<div class="continent-pill"><div class="stat-row"><strong>${continent}</strong><span>${countryCount} ${label}</span></div>${states}</div>`;
  })
    .join("");
}

function renderPercentages() {
  const container = document.querySelector("#percentList");
  const countryKeys = new Set();
  const stateKeys = new Set();

  app.places.forEach((entry) => {
    if (entry.type === "state") {
      stateKeys.add(entry.key);
    } else if (entry.type === "country") {
      countryKeys.add(entry.key);
    }
  });

  if ([...stateKeys].length) {
    countryKeys.add("country:840");
  }

  const worldPercent = Math.round((countryKeys.size / TOTAL_WORLD_COUNTRIES) * 1000) / 10;
  const statePercent = Math.round((stateKeys.size / TOTAL_US_STATES) * 1000) / 10;

  container.innerHTML = `
    <div class="percent-card">
      <strong>${worldPercent}% of world countries</strong>
      <span>${countryKeys.size} of ${TOTAL_WORLD_COUNTRIES}</span>
    </div>
    <div class="percent-card">
      <strong>${statePercent}% of US states</strong>
      <span>${stateKeys.size} of ${TOTAL_US_STATES}</span>
    </div>
  `;
}

function renderTimeline() {
  const container = document.querySelector("#timelineList");
  const items = [];

  app.places.forEach((entry) => {
    if (entry.type !== "country" || entry.continuous) return;
    getVisits(entry).forEach((visit) => {
      if (!visit.year) return;
      items.push({
        year: Number(visit.year),
        name: entry.name,
        description: visit.description || "No description added."
      });
    });
  });

  items.sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));

  if (!items.length) {
    container.innerHTML = `<div class="timeline-item"><strong>No country visits with years yet.</strong><p>Add a year to a country visit and it will appear here.</p></div>`;
    return;
  }

  container.innerHTML = items.map((item) => `
    <article class="timeline-item">
      <strong>${escapeHtml(String(item.year))} - ${escapeHtml(item.name)}</strong>
      <p>${escapeHtml(item.description)}</p>
    </article>
  `).join("");
}

function toggleTimeline() {
  const panel = document.querySelector("#timelinePanel");
  panel.hidden = !panel.hidden;
}

function openModal() {
  app.editKey = null;
  app.editItemIndex = null;
  document.querySelector("#modalTitle").textContent = "Add New Place";
  document.querySelector("#placeInput").disabled = false;
  document.querySelector("#continuousInput").closest("label").hidden = false;
  document.querySelector("#yearField").hidden = false;
  document.querySelector("#descriptionLabel").textContent = "Description";
  document.querySelector("#descriptionInput").placeholder = "Add a favorite memory, route, or note.";
  document.querySelector(".save-button").textContent = "Save Place";
  document.querySelector("#modalBackdrop").hidden = false;
  document.querySelector("#placeInput").focus();
  validatePlaceInput();
}

function openEditModal(key) {
  const place = app.places.get(key);
  if (!place) return;

  app.editKey = key;
  app.editItemIndex = null;
  document.querySelector("#addForm").reset();
  document.querySelector("#modalTitle").textContent = place.continuous ? `Add Highlight to ${place.name}` : `Add Visit to ${place.name}`;
  document.querySelector("#placeInput").value = place.name;
  document.querySelector("#placeInput").disabled = true;
  document.querySelector("#continuousInput").closest("label").hidden = true;
  document.querySelector("#optionalFields").hidden = false;
  document.querySelector("#yearField").hidden = place.continuous;
  document.querySelector("#descriptionLabel").textContent = place.continuous ? "Highlight" : "Description";
  document.querySelector("#descriptionInput").placeholder = place.continuous ? "Add a highlight from this place." : "Add a favorite memory, route, or note.";
  document.querySelector(".save-button").textContent = place.continuous ? "Add Highlight" : "Add Visit";
  document.querySelector("#validationMessage").textContent = `Editing ${place.name}.`;
  document.querySelector("#validationMessage").classList.remove("is-invalid");
  document.querySelector("#validationMessage").classList.add("is-valid");
  document.querySelector("#modalBackdrop").hidden = false;
  document.querySelector(place.continuous ? "#descriptionInput" : "#yearInput").focus();
}

function closeModal() {
  document.querySelector("#modalBackdrop").hidden = true;
  document.querySelector("#addForm").reset();
  document.querySelector("#placeInput").disabled = false;
  document.querySelector("#continuousInput").closest("label").hidden = false;
  document.querySelector("#yearField").hidden = false;
  document.querySelector("#descriptionLabel").textContent = "Description";
  document.querySelector("#descriptionInput").placeholder = "Add a favorite memory, route, or note.";
  document.querySelector(".save-button").textContent = "Save Place";
  app.editKey = null;
  app.editItemIndex = null;
  toggleOptionalFields();
  validatePlaceInput();
}

function validatePlaceInput() {
  const input = document.querySelector("#placeInput");
  const message = document.querySelector("#validationMessage");
  const properties = findPlace(input.value);

  message.classList.remove("is-valid", "is-invalid");
  if (!input.value.trim()) {
    message.textContent = "Type a place name to verify it.";
    return null;
  }

  if (!properties) {
    message.textContent = "That does not match a country or US state.";
    message.classList.add("is-invalid");
    return null;
  }

  const type = properties.kind === "state" ? "US state" : "country";
  message.textContent = `Verified: ${properties.name} is a ${type}.`;
  message.classList.add("is-valid");
  return properties;
}

function toggleOptionalFields() {
  document.querySelector("#optionalFields").hidden = document.querySelector("#continuousInput").checked;
}

async function savePlace(event) {
  event.preventDefault();
  if (app.editKey) {
    await appendEntry(app.editKey);
    return;
  }

  const properties = validatePlaceInput();
  if (!properties) return;

  const continuous = document.querySelector("#continuousInput").checked;
  const existing = app.places.get(properties.key);
  const visits = existing ? getVisits(existing) : [];
  const highlights = existing ? getHighlights(existing) : [];
  const year = document.querySelector("#yearInput").value.trim();
  const description = document.querySelector("#descriptionInput").value.trim();
  if (!continuous) visits.push({ year, description });

  const entry = {
    key: properties.key,
    name: properties.name,
    type: properties.kind,
    continent: properties.continent,
    continuous,
    home: existing ? Boolean(existing.home) : false,
    visits: continuous ? [] : visits,
    highlights: continuous ? highlights : []
  };

  app.places.set(entry.key, entry);
  await saveEntries();
  updateRegionStyles();
  refreshPanels();
  closeModal();
}

async function appendEntry(key) {
  const place = app.places.get(key);
  if (!place) return;

  if (app.editItemIndex !== null) {
    await updateExistingEntry(place, app.editItemIndex);
    return;
  }

  if (place.continuous) {
    place.highlights = getHighlights(place);
    place.highlights.push(document.querySelector("#descriptionInput").value.trim());
  } else {
    place.visits = getVisits(place);
    place.visits.push({
      year: document.querySelector("#yearInput").value.trim(),
      description: document.querySelector("#descriptionInput").value.trim()
    });
  }

  app.places.set(key, place);
  await saveEntries();
  refreshPanels();
  showDetail(place, place.type);
  closeModal();
}

async function updateExistingEntry(place, index) {
  if (place.continuous) {
    place.highlights = getHighlights(place);
    place.highlights[index] = document.querySelector("#descriptionInput").value.trim();
  } else {
    place.visits = getVisits(place);
    place.visits[index] = {
      year: document.querySelector("#yearInput").value.trim(),
      description: document.querySelector("#descriptionInput").value.trim()
    };
  }

  app.places.set(place.key, place);
  await saveEntries();
  refreshPanels();
  showDetail(place, place.type);
  closeModal();
}

function showDetail(place, kind, clickX = window.innerWidth / 2) {
  app.detailKey = place.key;
  positionDetailSlide(clickX);
  document.querySelector("#detailType").textContent = kind === "state" ? "US State" : "Country";
  document.querySelector("#detailTitle").textContent = place.name;
  document.querySelector("#detailMeta").textContent = place.home ? "Home" : place.continuous ? "Continuous" : `Visited: ${formatYears(getVisits(place))}`;
  document.querySelector("#detailDescription").textContent = "";
  document.querySelector("#editDetail").hidden = false;
  document.querySelector("#editDetail").textContent = place.continuous ? "Add Highlight" : "Add New";
  document.querySelector("#detailVisits").innerHTML = place.continuous
    ? renderHighlights(place)
    : renderVisits(place);
  document.querySelector("#detailSlide").hidden = false;
}

function positionDetailSlide(clickX) {
  const slide = document.querySelector("#detailSlide");
  slide.classList.remove("align-left", "align-right");
  slide.classList.add(clickX < window.innerWidth / 2 ? "align-right" : "align-left");
}

function renderHighlights(place) {
  const highlights = getHighlights(place).filter((highlight) => String(highlight || "").trim());
  if (!highlights.length) return `<article class="detail-visit"><p>No highlights added yet.</p></article>`;
  return highlights.map((highlight, index) => {
    const text = highlight || "No highlight text added.";
    return `<article class="detail-visit"><button class="delete-entry-button" type="button" data-delete-index="${index}">Delete</button><button class="edit-entry-button" type="button" data-edit-index="${index}">Edit</button><p>${escapeHtml(text)}</p></article>`;
  }).join("");
}

function renderVisits(place) {
  const visits = getVisits(place);
  if (!visits.length) return `<article class="detail-visit"><p>No visits added yet.</p></article>`;
  return visits.map((visit, index) => {
    const year = visit.year || "";
    const description = visit.description || "No description added.";
    const heading = year ? `<strong>${escapeHtml(year)}</strong>` : "";
    return `<article class="detail-visit"><button class="delete-entry-button" type="button" data-delete-index="${index}">Delete</button><button class="edit-entry-button" type="button" data-edit-index="${index}">Edit</button>${heading}<p>${escapeHtml(description)}</p></article>`;
  }).join("");
}

async function deleteDetailEntry(index) {
  const place = app.places.get(app.detailKey);
  if (!place || Number.isNaN(index)) return;

  if (place.continuous) {
    place.highlights = getHighlights(place).filter((_highlight, itemIndex) => itemIndex !== index);
  } else {
    place.visits = getVisits(place).filter((_visit, itemIndex) => itemIndex !== index);
  }

  app.places.set(place.key, place);
  await saveEntries();
  refreshPanels();
  showDetail(place, place.type);
}

function editDetailEntry(index) {
  const place = app.places.get(app.detailKey);
  if (!place || Number.isNaN(index)) return;

  app.editKey = place.key;
  app.editItemIndex = index;
  document.querySelector("#addForm").reset();
  document.querySelector("#placeInput").value = place.name;
  document.querySelector("#placeInput").disabled = true;
  document.querySelector("#continuousInput").closest("label").hidden = true;
  document.querySelector("#optionalFields").hidden = false;
  document.querySelector("#modalBackdrop").hidden = false;
  document.querySelector("#validationMessage").textContent = `Editing ${place.name}.`;
  document.querySelector("#validationMessage").classList.remove("is-invalid");
  document.querySelector("#validationMessage").classList.add("is-valid");

  if (place.continuous) {
    const highlight = getHighlights(place)[index] || "";
    document.querySelector("#modalTitle").textContent = `Edit Highlight for ${place.name}`;
    document.querySelector("#yearField").hidden = true;
    document.querySelector("#descriptionLabel").textContent = "Highlight";
    document.querySelector("#descriptionInput").placeholder = "Add a highlight from this place.";
    document.querySelector("#descriptionInput").value = highlight;
    document.querySelector(".save-button").textContent = "Save Highlight";
    document.querySelector("#descriptionInput").focus();
  } else {
    const visit = getVisits(place)[index] || { year: "", description: "" };
    document.querySelector("#modalTitle").textContent = `Edit Visit for ${place.name}`;
    document.querySelector("#yearField").hidden = false;
    document.querySelector("#descriptionLabel").textContent = "Description";
    document.querySelector("#descriptionInput").placeholder = "Add a favorite memory, route, or note.";
    document.querySelector("#yearInput").value = visit.year || "";
    document.querySelector("#descriptionInput").value = visit.description || "";
    document.querySelector(".save-button").textContent = "Save Visit";
    document.querySelector("#yearInput").focus();
  }
}

function normalizeEntry(entry) {
  const visits = Array.isArray(entry.visits)
    ? entry.visits
    : entry.year || entry.description
      ? [{ year: entry.year || "", description: entry.description || "" }]
      : [];

  return {
    ...entry,
    continuous: Boolean(entry.continuous),
    home: Boolean(entry.home),
    visits,
    highlights: Array.isArray(entry.highlights) ? entry.highlights : []
  };
}

function promptForHomePlace() {
  const response = window.prompt("Where do you live?");
  if (!response) return;

  const properties = findPlace(response);
  if (!properties) {
    window.alert("That did not match a country or US state, so no home place was added.");
    return;
  }

  const existing = app.places.get(properties.key);
  app.places.set(properties.key, {
    key: properties.key,
    name: properties.name,
    type: properties.kind,
    continent: properties.continent,
    continuous: true,
    home: true,
    visits: existing ? getVisits(existing) : [],
    highlights: existing ? getHighlights(existing) : []
  });
}

async function migrateLocalProfilesToFirestore() {
  const localProfiles = getLocalProfilesForMigration();
  for (const profile of localProfiles) {
    const entries = getLocalEntriesForMigration(profile.id);
    await ensureRemoteProfile(profile, entries);
  }
}

function getLocalProfilesForMigration() {
  let profiles = null;
  try {
    profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
  } catch (error) {
    profiles = null;
  }

  if (Array.isArray(profiles) && profiles.length) {
    return profiles;
  }

  try {
    const legacyEntries = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "null");
    if (Array.isArray(legacyEntries)) {
      return [{ id: "default", name: "My Map" }];
    }
  } catch (error) {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }

  return [{ id: "default", name: "My Map" }];
}

function getLocalEntriesForMigration(profileId) {
  try {
    const perProfile = JSON.parse(localStorage.getItem(profileStorageKey(profileId)) || "null");
    if (Array.isArray(perProfile)) return perProfile;
  } catch (error) {
    localStorage.removeItem(profileStorageKey(profileId));
  }

  if (profileId === "default") {
    try {
      const legacyEntries = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "null");
      if (Array.isArray(legacyEntries)) return legacyEntries;
    } catch (error) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }

  return defaultEntries;
}

async function ensureRemoteProfile(profile, entries) {
  if (!app.db || !app.currentUser) return;
  await profileCollectionRef().doc(profile.id).set({
    name: profile.name,
    entries: entries.map(normalizeEntry),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

function profileCollectionRef() {
  return app.db.collection(USER_COLLECTION).doc(app.currentUser.uid).collection(PROFILE_COLLECTION);
}

function getVisits(place) {
  return place && Array.isArray(place.visits) ? place.visits : [];
}

function getHighlights(place) {
  return place && Array.isArray(place.highlights) ? place.highlights : [];
}

function formatYears(visits) {
  const years = visits.map((visit) => visit.year).filter(Boolean);
  if (!years.length) return "Year not added";
  return years.join(", ");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function findPlace(value) {
  const normalized = normalize(value);
  return app.lookup.get(normalized) || null;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function resolveContinent(name) {
  return continentByCountry[name] || continentAliases.get(normalize(name)) || "Other";
}

function clearHighlights() {
  d3.selectAll(".map-region").classed("is-highlighted", false);
}

function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error("Timed out")), timeoutMs);
    })
  ]);
}

async function syncRemoteState() {
  if (!app.useRemoteData || !app.db) return;

  try {
    await withTimeout(loadProfilesFromFirestore(), 6000);
    await withTimeout(loadEntriesFromFirestore(), 6000);
    refreshPanels();
    updateRegionStyles();
  } catch (error) {
    app.useRemoteData = false;
  }
}
