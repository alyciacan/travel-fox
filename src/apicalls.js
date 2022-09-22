const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => response.json())
    //.then(data => console.log(data[dataType]))
    .then(data => data[dataType])
};

const  fetchUserData = (userID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(response => response.json())
    .then(data => data)
};

export { fetchData, fetchUserData }
