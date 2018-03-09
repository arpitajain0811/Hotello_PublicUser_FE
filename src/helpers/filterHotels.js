
const ToRadians = degree => (degree * (Math.PI / 180));


const CalcHaversineDistance = (lat1, lat2, long1, long2) => {
  const radiusOfEarthKm = 6378.1;
  const radianLat1 = ToRadians(lat1);
  const radianLong1 = ToRadians(long1);
  const radianLat2 = ToRadians(lat2);
  const radianLong2 = ToRadians(long2);
  const radianDistanceLat = radianLat1 - radianLat2;
  const radianDistanceLong = radianLong1 - radianLong2;
  const sinLat = Math.sin(radianDistanceLat / 2.0);
  const sinLong = Math.sin(radianDistanceLong / 2.0);
  const a = (sinLat ** 2.0) + (Math.cos(radianLat1) * Math.cos(radianLat2) * (sinLong ** 2.0));
  const distance = radiusOfEarthKm * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

  return distance;
};

const filterHotels = (center, radius, allHotels) => {
  const centerLat = center.latitude;
  const centerLon = center.longitude;
  const filtered = allHotels.filter((hotel) => {
    const hotelLat = Number(hotel.latitude);
    const hotelLon = Number(hotel.longitude);
    const distance = Math.floor(CalcHaversineDistance(centerLat, hotelLat, centerLon, hotelLon));
    if (distance <= radius) { return true; }

    return false;
  });
  return filtered;
};


module.exports = filterHotels;

