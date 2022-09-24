
// IMPORTS:
import './css/styles.css';
import { fetchData, fetchUserData, fetchPost } from './apiCalls.js';
import Traveler from './Traveler.js';
import Trip from './Trip.js';
const dayjs = require('dayjs')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

//IMAGES:
import './images/Oregon.png';
import './images/travelfox.png';
import './images/travelfox_white_notext.svg';

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
const numTravelers = document.getElementById('num-travelers');
const startDate = document.getElementById('start-date');
const duration = document.getElementById('duration');
const responseMessage = document.getElementById('responseMessage');
const form = document.getElementById('new-trip-form');
const heading = document.getElementById('my-trips');

//GLOBAL VARIABLES:
let currentYear = dayjs().format('YYYY');
let allDestinations;
let allTrips;
let currentUser;

//EVENT LISTENERS:
window.addEventListener('load', function() {
  getData(14);
});
reviewExpensesBtn.addEventListener('click', showOrHideExpenses);
reviewExpensesBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { showOrHideExpenses() }
  });
newTripBtn.addEventListener('click', showOrHideRequestForm);
newTripBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { showOrHideRequestForm() }
  });
submitBtn.addEventListener('click', checkForm);
submitBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { checkForm() }
  });
viewTripsBtn.addEventListener('click', changeViewTripsBtn);
viewTripsBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { changeViewTripsBtn() }
  });

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
      } else {
        return 1;
      };
    })
  .forEach(destinationObj => {
    const newOption = document.createElement('option');
    newOption.value = destinationObj.destination;
    newOption.innerText = destinationObj.destination;
    destinationChooser.appendChild(newOption);
  });
};

function submitForm() {
  const date = dayjs(startDate.value).format('YYYY/MM/DD');
  const destination = allDestinations
    .find(destinationObj => destinationObj.destination === destinationChooser.value);
  const trip = new Trip(currentUser, destination, { travelers:`${numTravelers.value}`, startDate: date, duration:`${duration.value}` });
  const tripRequest = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  };
  fetchPost(tripRequest)
    .then(respondSuccess())
    .then(getData(currentUser.id))
    .catch(error => respondError(error));
  form.reset();
};

function checkForm() {
  if(!dayjs(startDate.value).isSameOrBefore(dayjs(), 'day')
    && numTravelers.value
    && destinationChooser.value
    && startDate.value) {
      submitForm();
    } else if (dayjs(startDate.value).isSameOrBefore(dayjs(), 'day')) {
      responseMessage.innerText = "Please select a date in the future!";
      unhide(responseMessage);
    } else {
      responseMessage.innerText = "Please complete all fields!";
      unhide(responseMessage);
    };
};

function respondSuccess() {
  unhide(responseMessage);
  responseMessage.innerText = "Your request was submitted!";
  setTimeout(function() {
    hide(responseMessage);
  }, 2000);
};

function respondError(error) {
  unhide(responseMessage);
  responseMessage.innerText = error;
  setTimeout(function() {
    hide(responseMessage);
  }, 2000);
};

function renderUserGreeting() {
  welcomeName.innerText = currentUser.greetUser();
};

function renderUserExpenditures() {
  userExpenses.innerText = `$${currentUser.returnYearExpenditures(allTrips, allDestinations, currentYear)}`
};

function renderUserCards() {
  myTripsSection.innerHTML = "";
  const userTrips = currentUser.filterTravelersTrips(allTrips);
  userTrips.forEach(tripObj => {
    const destinationObj = allDestinations.find(destination => destination.id === tripObj.destinationID)
    myTripsSection.appendChild(createACard(destinationObj, tripObj))
  })
};

function renderFilteredTrips(filter) {
  myTripsSection.innerHTML = "";
  const userTrips = currentUser.filterTravelersTrips(allTrips);
  if(filter === 'past') {
    userTrips.forEach(tripObj => {
      if(calculateStatus(tripObj) === 'past') {
      const destinationObj = allDestinations.find(destination => destination.id === tripObj.destinationID)
      myTripsSection.appendChild(createACard(destinationObj, tripObj))
      };
    });
  } else {
    userTrips.forEach(tripObj => {
      if(calculateStatus(tripObj) !== 'past') {
      const destinationObj = allDestinations.find(destination => destination.id === tripObj.destinationID)
      myTripsSection.appendChild(createACard(destinationObj, tripObj))
      };
    });
  };
};

function createACard(destinationObj, tripObj) {
  const newElement = document.createElement('article');
  const formattedDate = dayjs(tripObj.date).format('MM/DD/YYYY')
  const endDate = dayjs(tripObj.date).add(tripObj.duration, 'day').format('MM/DD/YYYY');
  const status = calculateStatus(tripObj);
  newElement.classList.add('box');
  newElement.innerHTML = `<img class="card-img" src=${destinationObj.image} alt=${destinationObj.alt}/>
                          <p class="status-box float">${status}</p>
                          <div class="card-content" id="card-content">
                          <p id="location">${destinationObj.destination}</p>
                          <p id="date">${formattedDate} - ${endDate}</p>
                          </div>`;
  return newElement;
};

function calculateStatus(tripObj) {
  if (!dayjs().isSameOrBefore(tripObj.date, 'day')) {
    return 'past';
  } else {
    return tripObj.status;
  };
};

function changeViewTripsBtn() {
  makeActive(viewTripsBtn);
  if(viewTripsBtn.innerText === 'view all trips') {
    heading.innerText = 'All my trips'
    viewTripsBtn.innerText = 'view upcoming trips';
    renderUserCards();
  } else if (viewTripsBtn.innerText === 'view upcoming trips') {
    heading.innerText = 'My upcoming trips'
    viewTripsBtn.innerText = 'view past trips';
    renderFilteredTrips('future');
  } else if (viewTripsBtn.innerText === 'view past trips') {
    heading.innerText = 'My past trips'
    viewTripsBtn.innerText = 'view all trips'
    renderFilteredTrips('past');
  };
};

//DISPLAY/HIDE FNs:
function showOrHideRequestForm() {
  if(newTripForm.classList.contains('hidden')) {
    unhide(newTripForm);
    makeActive(newTripBtn);
    newTripBtn.innerText = 'nevermind';
  } else {
    hide(newTripForm);
    makeInactive(newTripBtn);
    newTripBtn.innerText = 'new trip request';
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

function hideExpenses() {
  if(!userExpensesContainer.classList.contains("hidden")) {
    hide(userExpensesContainer);
    makeInactive(reviewExpensesBtn);
    reviewExpensesBtn.innerText = "review my travel expenses"
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
