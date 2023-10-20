// Code here

document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000";
  console.log("API base URL:", baseUrl);

  // function that retrieves and presents information about beer.Obtain data about beer from an API source and then display it.
  const flatabeerData = (beerId) => {
    fetch(`${baseUrl}/beers/${beerId}`)

      .then((resp) => resp.json())
      .then((beerData) => {
        const beerName = document.getElementById("beer-name"); // A method. beer-name an id from HTML document.
        const beerDescription = document.getElementById("beer-description"); // beer-description also an id from HTML document.
        const beerImage = document.getElementById("beer-image"); // beer-image an id in the HTML document inside div class (beer-details).
        const reviewList = document.getElementById("review-list"); // review-list also an id under the h3 tag.


        // Create the text boxes and the beerImage
        beerName.textContent = beerData.name;
        beerDescription.textContent = beerData.description;
        beerImage.src = beerData.image_url;

        // Use the forEach Loop function
        reviewList.innerHTML = ""; // set the HTML reviewlist into an empty string. This clears any existing content from the element.
        beerData.reviews.forEach((review) => { // use of forEach loop to iterate over each review in the beerData.
          const li = document.createElement("li"); //For each review in the array,this code creates a new list element using document.
          reviewList.appendChild(li); // append new list item element
        });
      });
  };

  //  function to Retrieve and presents information about the beer menu details.
  const flatabeerMenuDetails = () => {
    fetch(`${baseUrl}/beers`) // fetches the base URL
    //Response
      .then((resp) => resp.json())
      .then((beers) => {
        const beerList = document.getElementById("beer-list");
        beerList.innerHTML = ""; // Clears the menu ; empty string

        //forEach Loop Function
        beers.forEach((beer) => {   //beers array contains info about different types of beer.forEach is used to iterate over each beer in the beers array.
          const li = document.createElement("li");  // create a new list item  li
          li.textContent = beer.name;
          li.addEventListener("click", () => {   //add click event listener to listen for click event.
            flatabeerData(beer.id);
          });
          beerList.appendChild(li);    // list is appended to the beer list.
        });
        
        
        // Automatically select and display the first beer when the menu is loaded.
        if (beers.length > 0) {  //check if array isnt empty, if true then call the flatabeerData function with Id of first beer.
          flatabeerData(beers[0].id);
        }
      });
  };

  //form to allow submition of reviews and display on the webpage.
  const reviewForm = document.getElementById("review-form"); //retrieve the HTML element with the ID “review-form"
  reviewForm.addEventListener("submit", (event) => { //listens for a “submit” event.
    event.preventDefault();  //prevent default behavior of the form, which is to reload the page.
    const newReview = document.getElementById("review").value; //retrieve value of input field with the ID “review”,and assign to newReview.
    const reviewList = document.getElementById("review-list"); 
    const li = document.createElement("li");
    li.textContent = newReview;
    reviewList.appendChild(li);
    document.getElementById("review").value = ""; //empty string,
  });

  // Fetch and display the beer menu when the page loads.
  flatabeerMenuDetails();
});