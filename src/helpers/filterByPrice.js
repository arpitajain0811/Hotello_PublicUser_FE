const filterByPrice = (allHotels, priceRange) => {
  const filteredHotels = allHotels.filter((hotel) => {
    const rate = ((hotel.min_rate.amount) * 65).toFixed(2);
    if (rate > priceRange[0] && rate < priceRange[1]) {
      return true;
    }

    return false;
  });
  return filteredHotels;
};

module.exports = filterByPrice;

