
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
const dayjs = require('dayjs')
import { fetchData, fetchUserData } from './apiCalls.js';
import Traveler from './Traveler.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//QUERY SELECTORS:
const welcomeName = document.getElementById('header__welcome-message-name');
const userExpenses = document.getElementById('total-expenses');
const reviewExpensesBtn = document.getElementById('nav-bar__my-expenses');
const userExpensesContainer = document.getElementById('total-expenses-container');
const myTripsSection = document.getElementById('card-container');
const newTripBtn = document.getElementById('nav-bar__new-trip');
const newTripForm = document.getElementById('form-container');
const viewTripsBtn = document.getElementById('nav-bar__my-trips');
const buttonArray = [newTripBtn, reviewExpensesBtn, viewTripsBtn];
const submitBtn = document.getElementById('submit-btn');
const destinationChooser = document.getElementById('destinations');

//GLOBAL VARIABLES:
let currentYear = dayjs().format('YYYY');
let allDestinations;
let allTrips;
// let allTravelers;
let currentUser;


//function logIn(userID) {
//  getData("14");
  //needs to take what user puts in for username and get it into the promise.all below
//};

//EVENT LISTENERS:
window.addEventListener('load', function() {
  getData(14);
});

reviewExpensesBtn.addEventListener('click', showOrHideExpenses);
newTripBtn.addEventListener('click', showOrHideRequestForm);
buttonArray.forEach(button => {
  button.addEventListener('click', deactivateAllButtons);
})

// fetchData('trips'), fetchData('travelers'), fetchData(`travelers/${userID}`)
function getData(userID) {
  Promise.all([fetchData('destinations'), fetchData('trips'), fetchUserData(`${userID}`)])
    .then(datasetArray => {
      allDestinations = datasetArray[0];
      allTrips = datasetArray[1];
      currentUser = new Traveler(datasetArray[2]);
      generatePageLoad(currentUser);
    });
};

function generatePageLoad(user) {
  renderUserGreeting();
  renderUserExpenditures();
  renderUserCards();
  fillDestinationOptions();
};

function fillDestinationOptions() {
  allDestinations
  .sort((a, b) => {
      if(a.destination < b.destination) {
        return -1;
      };
      if(a.destination > b.destination) {
        return 1;
      }
    })
  .forEach(destinationObj => {
    const newOption = document.createElement('option');
    newOption.value = destinationObj.destination;
    newOption.innerText = destinationObj.destination;
    destinationChooser.appendChild(newOption);
  });
}

function renderUserGreeting() {
  welcomeName.innerText = currentUser.greetUser();
};

function renderUserExpenditures() {
  userExpenses.innerText = `$${currentUser.returnYearExpenditures(allTrips, allDestinations, currentYear)}`
};

function renderUserCards() {
  const userTrips = currentUser.filterTravelersTrips(allTrips);
  userTrips.forEach(tripObj => {
    const destinationObj = allDestinations.find(destination => destination.id === tripObj.destinationID)
    myTripsSection.appendChild(createACard(destinationObj, tripObj))
  })
}

function createACard(destinationObj, tripObj) {
  const newElement = document.createElement('article');
  const formattedDate = dayjs(tripObj.date).format('MM/DD/YYYY')
  const endDate = dayjs(tripObj.date).add(tripObj.duration, 'day').format('MM/DD/YYYY');
  newElement.classList.add('box');
  newElement.innerHTML = `<img class="card-img" src=${destinationObj.image} alt=${destinationObj.alt}/>
            <p class="status-box float">${tripObj.status}</p>
            <div class="card-content" id="card-content">
              <p id="location">${destinationObj.destination}</p>
              <p id="date">${formattedDate} - ${endDate}</p>
            </div>`;
return newElement;
};

function showOrHideRequestForm() {
  if(newTripForm.classList.contains('hidden')) {
    unhide(newTripForm);
    makeActive(newTripBtn);
  } else {
    hide(newTripForm);
    makeInactive(newTripBtn);
  }
};

function hideExpenses() {
  if(!userExpensesContainer.classList.contains("hidden")) {
    hide(userExpensesContainer);
    makeInactive(reviewExpensesBtn);
    reviewExpensesBtn.innerText = "review my travel expenses"
  }
};


function showOrHideExpenses() {
  if(userExpensesContainer.classList.contains("hidden")) {
    unhide(userExpensesContainer);
    makeActive(reviewExpensesBtn);
    reviewExpensesBtn.innerText = "hide my travel expenses";
  } else {
    hideExpenses();
  }
};

function makeActive(element) {
  element.classList.add('active');
};

function makeInactive(element) {
  element.classList.remove('active');
};

function unhide(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};
