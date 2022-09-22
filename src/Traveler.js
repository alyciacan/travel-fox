class Traveler {
  constructor(travelerObj) {
    this.id = travelerObj.id,
    this.name = travelerObj.name,
    this.travelerType = travelerObj.travelerType
  }

  filterTravelersTrips(tripsArray) {
    return tripsArray.filter(tripObj => tripObj.userID === this.id)
  }

  returnYearExpenditures(tripsArray, destinationsArray, year) {
    let eachTripCosts = [];
    this.filterTravelersTrips(tripsArray).forEach(thisUsersTrip => {
      let destinationObj = destinationsArray.find(destination => destination.id === thisUsersTrip.destinationID)
      if(thisUsersTrip.date.includes(year)) {
        eachTripCosts.push((thisUsersTrip.duration * destinationObj.estimatedLodgingCostPerDay)  + (destinationObj.estimatedFlightCostPerPerson * thisUsersTrip.travelers)) //cost of EACH trip
      }
    });
    return eachTripCosts.reduce((total, curr) => {
      return total += curr
    }, 0)
  };

  greetUser() {
    return this.name.split(" ")[0]
  };

};

module.exports = Traveler;
