// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
const dayjs = require('dayjs')
import { fetchData, fetchUserData } from './apiCalls.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//GLOBAL VARIABLES:
const currentYear = dayjs().format('YYYY');


let allDestinations;
let allTrips;
// let allTravelers;
let currentUser;


//function logIn(userID) {
//  getData("14");
  //needs to take what user puts in for username and get it into the promise.all below
//};

window.addEventListener('load', function() {
  getData(14);
});

// fetchData('trips'), fetchData('travelers'), fetchData(`travelers/${userID}`)
function getData(userID) {
  Promise.all([fetchData('destinations'), fetchData('trips'), fetchUserData(`${userID}`)])
    .then(datasetArray => {
      allDestinations = datasetArray[0];
      allTrips = datasetArray[1];
      currentUser = datasetArray[2];
      generatePageLoad(currentUser);
    });
};

function generatePageLoad(user) {

  //see my trips as cards
  // have my travel expenses populate
  //be greeted at top of page
};
