const favouriteList = document.querySelector("#favourites-list");

// Retrieve favourites from local storage or set to an empty array if it doesn't exist
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// Function to render favourites on the page
const renderFavourites = () => {
  // Clear the favouriteList container
  favouriteList.innerHTML = "";

  // Loop through all favourites and create a card for each one
  favourites.forEach((hero) => {
    const heroCard = document.createElement("div");
    heroCard.classList.add("hero-card");

    // Create an image element and set the source and alt attributes
    const heroImage = document.createElement("img");
    heroImage.src = `${hero.thumbnail.path}/portrait_fantastic.jpg`;
    heroImage.alt = hero.name;

    // Create a heading element and set the text content to the hero name
    const heroName = document.createElement("h2");
    heroName.textContent = hero.name;

    // Create a paragraph element and set the text content to the hero description, or a default message if no description exists
    const description = document.createElement("p");
    description.textContent = hero.description
      ? hero.description
      : "No description available.";

    // Create an info button element and add an info icon to it
    const heroInfoButton = document.createElement("button");
    const infoIcon = document.createElement("i");

    // Add a class to the info button element and append the info icon to it
    infoIcon.classList.add("fa", "fa-info-circle");
    infoIcon.style.color = "#00ffff";

    // Add an event listener to the info button element to add a neon glow effect on mouseenter
    heroInfoButton.classList.add("info-button");
    heroInfoButton.appendChild(infoIcon);
    heroInfoButton.addEventListener("mouseenter", () => {
      infoIcon.style.textShadow =
        "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff, 0 0 20px #00ffff"; // add neon glow on hover
    });

    // Add an event listener to the info button element to remove the neon glow effect on mouseleave
    heroInfoButton.addEventListener("mouseleave", () => {
      infoIcon.style.textShadow = "none"; // remove the neon glow on mouse leave
    });

    // Add an event listener to the info button element to save the hero object to local storage and navigate to the info.html page
    heroInfoButton.addEventListener("click", () => {
      localStorage.setItem("hero", JSON.stringify(hero));
      window.location = "info.html";
    });

    // remove button

    const heroRemoveButton = document.createElement("button");
    const heroRemoveIcon = document.createElement("i");
    heroRemoveIcon.classList.add("fas", "fa-trash-alt");
    heroRemoveIcon.style.color = "grey";

    heroRemoveButton.appendChild(heroRemoveIcon);
    heroRemoveButton.addEventListener("click", () => {
      const index = favourites.indexOf(hero);
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      renderFavourites();

      // Display an alert message when the hero is removed
      alert(`${hero.name} has been successfully removed from favourites!`);
    });

    // Add the class "neon" to the button on mouseenter
    heroRemoveButton.addEventListener("mouseenter", () => {
      heroRemoveButton.classList.add("neon");
    });

    // Remove the class "neon" from the button on mouseleave
    heroRemoveButton.addEventListener("mouseleave", () => {
      heroRemoveButton.classList.remove("neon");
    });

    // Append the hero image, name, description, and info button to the hero card element
    heroCard.appendChild(heroName);
    heroCard.appendChild(heroImage);
    heroCard.appendChild(description);
    heroCard.appendChild(heroInfoButton);
    heroCard.appendChild(heroRemoveButton);

    favouriteList.appendChild(heroCard);
  });
};

renderFavourites();
