import { expect } from 'chai';
import Trip from '../src/Trip.js';
import Traveler from '../src/Traveler.js';

describe ('Trip', () => {
  let ellynn;
  let tripsArray;
  let destinationsArray;
  let tripRequest;
  let ellynnsTripRequests;

  beforeEach(() => {
    ellynn = new Traveler({ id: 14, name: "Ellynn Kyne", travelerType: "history buff" });
    ellynnsTripRequests = [{
      travelers: 1,
      date: "2022/02/12",
      duration: 11,
      },
      {
      travelers: 3,
      date: "2022/09/24",
      duration: 10,
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
     tripRequest = new Trip(ellynn, destinationsArray[0], ellynnsTripRequests[0])
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be able to calculate the approximate cost of the trip', () => {
    expect(tripRequest.calculateCost(destinationsArray[0])).to.equal('$3,135');
  });

  it('should have a status of "pending" by default', () => {
    expect(tripRequest.status).to.equal('pending');
  });

  it('should be able to update its status', () => {

    tripRequest.approveTrip();

    expect(tripRequest.status).to.equal('approved');
  });

});
