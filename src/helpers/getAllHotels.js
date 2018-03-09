const getAllHotels = (cityName, checkIn, checkOut, rooms, jwtToken) => {
  const options = {
    method: 'post',
    headers: {
      authorization: jwtToken,
    },
    body: JSON.stringify({
      cityName,
      rooms,
      checkIn,
      checkOut,
      nationality: 'IN',
    }),
  };
  return fetch('/checkAvailability', options)
    .then(response => response.json());
};


module.exports = getAllHotels;

