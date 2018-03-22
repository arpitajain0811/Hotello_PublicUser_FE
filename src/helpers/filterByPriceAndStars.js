const filterByPriceAndStars = (allHotels, priceRange, stars) => {
  const filteredHotels = allHotels.filter((hotel) => {
    const rate = ((hotel.min_rate.amount) * 65).toFixed(2);
    if (rate > priceRange[0] && rate < priceRange[1]) {
      if (stars[Number(hotel.stars)]) {
        return true;
      }

      return false;
    }

    return false;
  });
  return filteredHotels;
};

module.exports = filterByPriceAndStars;

