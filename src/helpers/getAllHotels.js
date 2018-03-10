const getAllHotels = (cityName, checkIn, checkOut, rooms, jwtToken) => {
  const options = {
    method: 'post',
    headers: {
      Authorization: jwtToken,
    },
    body: JSON.stringify({
      cityName,
      rooms,
      checkIn,
      checkOut,
      nationality: 'IN',
    }),
  };
  console.log(jwtToken);
  return fetch('/checkAvailability', options)
    .then(response => response.json());
};


module.exports = getAllHotels;

