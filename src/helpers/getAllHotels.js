const getAllHotels = (cityName, checkIn, checkOut, rooms) => {
  const cookie = window.localStorage.getItem('cookie');
  const options = {
    method: 'post',
    headers: {
      sessionId: cookie,
    },
    body: JSON.stringify({
      cityName,
      rooms,
      checkIn,
      checkOut,
      nationality: 'IN',
    }),
  };
  console.log(cookie);
  return fetch('/checkAvailability', options)
    .then(response => response.json())
    .then(respJSON=>{
      if (respJSON.hotelResultSet)
      {
        return respJSON
      }
      else{
        return 'No city entered'
      }
    })
    .catch(()=>{return {hotelResultSet:[]}});
};


module.exports = getAllHotels;

