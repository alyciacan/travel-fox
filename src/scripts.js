// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'



let allDestinations;
let allTrips;
let allTravelers;
let currentUser;


function logIn(userID) {
  getData(userID);
  //needs to take what user puts in for username and get it into the promise.all below
};



function getData(userID) {
  Promise.all([fetchData('destinations'), fetchData('trips'), fetchData('travelers'), fetchData(`travelers/${userID}`)])
    .then(datasetArray => {
      allDestinations = datasetArray[0];
      allTrips = datasetArray[1];
      allTravelers = datasetArray[2];
      currentUser =
    })
}
