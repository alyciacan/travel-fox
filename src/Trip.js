class Trip {
  constructor(user, destination, tripObj) {
    this.id = tripObj.id || Date.now(),
    this.userID = user.id,
    this.destinationID = destination.id,
    this.travelers = tripObj.travelers,
    this.date = tripObj.date,
    this.duration = tripObj.duration,
    this.status = 'pending',
    this.suggestedActivities = [];
  };

  calculateCost(destinationObj) {
    const costWithoutFee = (this.travelers * destinationObj.estimatedFlightCostPerPerson)
     + (this.duration * destinationObj.estimatedLodgingCostPerDay);
    const fee = costWithoutFee * .1;
    return `$${parseInt(costWithoutFee + fee).toLocaleString()}`;
  };

  approveTrip() {
    this.status = 'approved';
  };
};

module.exports = Trip;
