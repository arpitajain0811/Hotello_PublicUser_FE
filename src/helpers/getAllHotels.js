const getAllHotels = (cityName, checkIn, checkOut, rooms, sessionId) => {
  const options = {
    method: 'post',
    headers: {
      Authorization: sessionId,
    },
    body: JSON.stringify({
      cityName,
      rooms,
      checkIn,
      checkOut,
      nationality: 'IN',
    }),
  };
  console.log(sessionId);
  return fetch('/checkAvailability', options)
    .then(response => response.json());
};


module.exports = getAllHotels;

