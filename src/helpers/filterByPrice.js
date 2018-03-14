const filterByPrice = (allHotels, priceRange) => {
  const min = 1000;
  const max = 20000;
  const minBound = min + ((priceRange[0] / 100) * (max - min));
  const maxBound = min + ((priceRange[1] / 100) * (max - min));
  const filteredHotels = allHotels.filter((hotel) => {
    const rate = ((hotel.min_rate.amount) * 65).toFixed(2);
    if (rate > minBound && rate < maxBound) {
      return true;
    }

    return false;
  });
  return filteredHotels;
};

module.exports = filterByPrice;

