const API_KEY =
  "9da571d1ad5b00e78f8ad0a7d0413363&hash=fdbc04b145e66fe396a87c3918e598f8";
const API_BASE_URL = `https://gateway.marvel.com/v1/public/characters`;

// Get the element that will contain the superhero information
const superheroInfo = document.querySelector("#superhero-info");

// When the page loads, get the superhero information and display it
window.addEventListener("load", getSuperheroInfo);

// Get the superhero information from the API and display it
async function getSuperheroInfo() {
  // Get the superhero object from local storage
  const hero = JSON.parse(localStorage.getItem("hero"));

  // Use the superhero's ID to get their information from the API
  const response = await fetch(
    `${API_BASE_URL}/${hero.id}?ts=1&apikey=${API_KEY}`
  );
  const data = await response.json();

  // Get the superhero object from the API response
  const superhero = data.data.results[0];

  // Create a card element to display the superhero information
  const card = createSuperheroCard(superhero);

  // Add the card element to the superheroInfo container
  superheroInfo.appendChild(card);
}

// Create a card element to display the superhero information
function createSuperheroCard(superhero) {
  // Create the card element
  const card = document.createElement("div");
  card.classList.add("card");

  // Create the image element and set its source to the superhero's thumbnail
  const image = document.createElement("img");
  image.src = `${superhero.thumbnail.path}/portrait_fantastic.jpg`;

  // Create the name element and set its text content to the superhero's name
  const name = document.createElement("h2");
  name.textContent = superhero.name;

  // Create the description element and set its text content to the superhero's description,
  // or "No description available" if there is no description
  const description = document.createElement("p");
  description.textContent = superhero.description
    ? superhero.description
    : "No description available.";

  // Create the comics list element and title element, and add each comic to the list
  const comics = document.createElement("dl");
  const comicsTitle = document.createElement("dt");
  comicsTitle.style.backgroundColor = "#4fdf6f";

  comicsTitle.textContent = "Comics:";
  comics.appendChild(comicsTitle);
  superhero.comics.items.forEach((comic) => {
    const comicsItem = document.createElement("dd");
    comicsItem.textContent = comic.name;
    comics.appendChild(comicsItem);
  });

  // Create the events list element and title element, and add each event to the list
  const events = document.createElement("dl");
  const eventsTitle = document.createElement("dt");
  eventsTitle.style.backgroundColor = "#4fdf6f";
  eventsTitle.textContent = "Events:";
  events.appendChild(eventsTitle);
  superhero.events.items.forEach((event) => {
    const eventsItem = document.createElement("dd");
    eventsItem.textContent = event.name;
    events.appendChild(eventsItem);
  });

  // Create the series list element and title element, and add each series to the list
  const series = document.createElement("dl");
  const seriesTitle = document.createElement("dt");

  seriesTitle.style.backgroundColor = "#4fdf6f";
  seriesTitle.textContent = "Series:";
  series.appendChild(seriesTitle);
  superhero.series.items.forEach((serie) => {
    const seriesItem = document.createElement("dd");
    seriesItem.textContent = serie.name;
    series.appendChild(seriesItem);
  });

  // Create the stories list element and title element, and add each story to the list
  const stories = document.createElement("dl");
  const storiesTitle = document.createElement("dt");
  storiesTitle.textContent = "Stories:";
  storiesTitle.style.backgroundColor = "#4fdf6f";
  stories.appendChild(storiesTitle);
  superhero.stories.items.forEach((story) => {
    const storiesItem = document.createElement("dd");
    storiesItem.textContent = story.name;
    stories.appendChild(storiesItem);
  });

  // Append the hero image, name, description, and info button to the hero card element
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(comics);
  card.appendChild(events);
  card.appendChild(series);
  card.appendChild(stories);

  return card;
}
