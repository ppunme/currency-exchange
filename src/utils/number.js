export const formatNumber = (number, decimals) => {
  if (decimals) {
    return Number(number)
      .toFixed(decimals)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return Number(number).toLocaleString();
  }
};
