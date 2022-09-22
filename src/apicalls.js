function fetchData(url, dataKey) { //need to be able to get travelers, single traveler, trips, destinations
  return fetch(`http://localhost:3001/api/v1/${url}`)
    .then(response => response.json())
    .then(data => data[dataKey])
};

export { fetchData }
