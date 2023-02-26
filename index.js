const API_KEY = "your_api_key";
const API_BASE_URL = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=9da571d1ad5b00e78f8ad0a7d0413363&hash=fdbc04b145e66fe396a87c3918e598f8`;

// Get HTML elements
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const heroesList = document.querySelector("#heroes-list");

// Add event listeners for search input and button
searchButton.addEventListener("click", searchHeroes);
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchHeroes();
  }
});

// Function to search for heroes
async function searchHeroes() {
  // Get search term from input field and trim any whitespace
  const searchTerm = searchInput.value.trim();
  console.log(searchTerm);

  // Search for hero names with spaces
  const formattedSearchTerm = searchTerm.replace(/ /g, " ");
  console.log(formattedSearchTerm);
  const response = await fetch(
    `${API_BASE_URL}&nameStartsWith=${encodeURIComponent(formattedSearchTerm)}`
  );
  console.log(response);
  // Convert response to JSON
  const data = await response.json();
  let heroes = data.data.results;

  // If initial search returns no results, search for hero names with hyphens
  if (heroes.length === 0) {
    const hyphenatedSearchTerm = searchTerm.replace(/ /g, "-");
    console.log(hyphenatedSearchTerm);
    const hyphenatedResponse = await fetch(
      `${API_BASE_URL}&nameStartsWith=${encodeURIComponent(
        hyphenatedSearchTerm
      )}`
    );
    console.log(hyphenatedResponse);
    const hyphenatedData = await hyphenatedResponse.json();
    heroes = hyphenatedData.data.results;
  }

  // Clear previous search results
  heroesList.innerHTML = "";

  // Create and append hero cards to list for each hero in search results
  heroes.forEach((hero) => {
    const heroCard = createHeroCard(hero);
    heroesList.appendChild(heroCard);
  });
}

function createHeroCard(hero) {
  // Create a div element to hold the hero card
  const card = document.createElement("div");
  card.classList.add("hero-card");

  // Create an h2 element to display the hero's name
  const name = document.createElement("h2");
  name.textContent = hero.name;

  // Create an img element to display the hero's thumbnail image
  const image = document.createElement("img");
  image.src = `${hero.thumbnail.path}/portrait_fantastic.jpg`;

  // Create a p element to display the hero's description
  const description = document.createElement("p");
  // If the hero has a description, display it. Otherwise, display a default message.
  description.textContent = hero.description
    ? hero.description
    : "No description available.";

  const addFavouritesButton = document.createElement("button");
  const addFavouritesIcon = document.createElement("i");
  addFavouritesIcon.classList.add("fa", "fa-heart");
  addFavouritesIcon.style.color = "#ff0000"; // set icon color to red
  addFavouritesIcon.style.transition = "all 0.5s"; // set transition effect
  addFavouritesButton.style.border = "none"; // remove button border
  addFavouritesButton.style.padding = "0"; // remove button padding
  addFavouritesButton.style.background = "none"; // remove button background
  addFavouritesButton.appendChild(addFavouritesIcon);
  addFavouritesButton.addEventListener("click", () => {
    addToFavourites(hero);
    addFavouritesIcon.style.transform = "scale(1.2)"; // add spark animation
    setTimeout(() => {
      // remove spark animation after 2 seconds
      addFavouritesIcon.style.transform = "none";
    }, 2000);
  });

  const viewInfoButton = document.createElement("button");
  const viewInfoIcon = document.createElement("i");
  viewInfoIcon.classList.add("fa", "fa-info-circle");
  viewInfoIcon.style.color = "#00ffff"; // set icon color to neon
  viewInfoIcon.style.transition = "all 0.5s"; // set transition effect
  viewInfoButton.style.border = "none"; // remove button border
  viewInfoButton.style.padding = "0"; // remove button padding
  viewInfoButton.style.background = "none"; // remove button background
  viewInfoButton.appendChild(viewInfoIcon);
  viewInfoButton.addEventListener("mouseenter", () => {
    viewInfoIcon.style.textShadow =
      "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff"; // add neon glow on hover
  });
  viewInfoButton.addEventListener("mouseleave", () => {
    viewInfoIcon.style.textShadow = "none"; // remove neon glow on mouse leave
  });
  viewInfoButton.addEventListener("click", () => {
    viewHeroInfo(hero);
    viewInfoIcon.style.animation = "pulse 0.5s linear"; // add animation on click
    setTimeout(() => {
      // remove animation after 0.5 seconds
      viewInfoIcon.style.animation = "none";
    }, 500);
  });

  // Append the name, image, and description elements to the card element
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(description);
  card.appendChild(addFavouritesButton);
  card.appendChild(viewInfoButton);

  return card;
}

function addToFavourites(hero) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Check if the hero is already in favourites
  if (favourites.some((favourite) => favourite.id === hero.id)) {
    alert("This hero is already in your favourites!");
    return;
  }

  // Add the hero to favourites
  favourites.push(hero);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  // Show success message
  alert("Hero added to favourites successfully!");
}

// view the information of hero
function viewHeroInfo(hero) {
  localStorage.setItem("hero", JSON.stringify(hero));
  window.location = "info.html";
}
