const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => {
      if(!response.ok) {
        throw new Error("Sorry, we were unable to retrieve necessary data. Please try again.");
      };
      return response.json();
    })
  .then(data => data[dataType])
};

const fetchUserData = (userID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(response => {
      if(!response.ok) {
        throw new Error("Sorry, we were unable to retrieve your account information. Please try again.");
      };
      return response.json();
    })
    // .then(data => data)
};

const fetchPost = (newTripObj) => {
  return fetch('http://localhost:3001/api/v1/trips', newTripObj)
    .then(response => {
      if(!response.ok) {
        throw new Error("Sorry, your request was not submitted. Please try again.");
      };
      return response.json();
    });
};

export { fetchData, fetchUserData, fetchPost }
