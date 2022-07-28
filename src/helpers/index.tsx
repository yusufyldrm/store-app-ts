
export const priceParser = (price: string | number) => {
  return parseFloat(price.toString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('.')[0].replaceAll(',', '.');
};

export const getFriction = (price: string | number) => {
  return price.toString().split('.')[1] || '00';
};
