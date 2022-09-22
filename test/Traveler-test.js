import { expect } from 'chai';
import Traveler from '../src/Traveler.js';
const dayjs = require('dayjs');


describe ('Traveler', () => {
  let ellynn;
  let tripsArray;
  let destinationsArray;

  beforeEach(() => {
    ellynn = new Traveler({ id: 14, name: "Ellynn Kyne", travelerType: "history buff" });
    tripsArray = [{
      id: 13,
      userID: 14,
      destinationID: 12,
      travelers: 1,
      date: "2022/02/12",
      duration: 11,
      status: "approved",
      suggestedActivities: [ ]
      },
      {
      id: 14,
      userID: 19,
      destinationID: 35,
      travelers: 1,
      date: "2022/09/24",
      duration: 10,
      status: "approved",
      suggestedActivities: [ ]
      },
      {
      id: 23,
      userID: 14,
      destinationID: 24,
      travelers: 6,
      date: "2022/01/02",
      duration: 18,
      status: "approved",
      suggestedActivities: [ ]
      },
      {
      id: 85,
      userID: 14,
      destinationID: 32,
      travelers: 2,
      date: "2020/02/21",
      duration: 5,
      status: "approved",
      suggestedActivities: [ ]
      }
    ];
    destinationsArray = [
      {
      id: 12,
      destination: "Wellington, New Zealand",
      estimatedLodgingCostPerDay: 150,
      estimatedFlightCostPerPerson: 1200,
      image: "https://images.unsplash.com/photo-1442483221814-59f7d8b22739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "overview of city with buildings, water and trees"
      },
      {
      id: 24,
      destination: "Vilnius, Lithuania",
      estimatedLodgingCostPerDay: 65,
      estimatedFlightCostPerPerson: 1100,
      image: "https://images.unsplash.com/photo-1549891472-991e6bc75d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
      alt: "overhead view of a city with a hot air balloon"
      },
      {
      id: 32,
      destination: "Kathmandu, Nepal",
      estimatedLodgingCostPerDay: 45,
      estimatedFlightCostPerPerson: 1200,
      image: "https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      alt: "temple with buntings during daytime"
      },
      {
      id: 35,
      destination: "Anchorage, Alaska",
      estimatedLodgingCostPerDay: 200,
      estimatedFlightCostPerPerson: 100,
      image: "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "man riding on kayak surrounded by mountains"
      }
     ];
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be able to return a list of only the traveler\'s trips', () => {
    expect(ellynn.filterTravelersTrips(tripsArray)).to.deep.equal([tripsArray[0], tripsArray[2], tripsArray[3]])
  });

  it('should be able to return the amount the traveler has spent on trips this year', () => {
    expect(ellynn.returnYearExpenditures(tripsArray, destinationsArray, '2022')).to.equal(10620);
  })

});
