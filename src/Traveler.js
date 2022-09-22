class Traveler {
  constructor(travelerObj) {
    this.id = travelerObj.id,
    this.name = travelerObj.name,
    this.travelerType = travelerObj.travelerType
  }

  filterTravelersTrips(tripsArray) {
    return tripsArray.filter(tripObj => tripObj.userID === this.id)
  }

  returnYearExpenditures(tripObj, destinationObj, date) {

  }
};

module.exports = Traveler;
