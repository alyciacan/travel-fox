const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => response.json())
    .then(data => data[dataType])
};

const  fetchUserData = (userID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(response => response.json())
    .then(data => data)
};

const fetchPost = (newTripObj) => {
  return fetch('http://localhost:3001/api/v1/trips', newTripObj)
  .then(response => response.json())
  .then(response => console.log(response))
};

export { fetchData, fetchUserData }
