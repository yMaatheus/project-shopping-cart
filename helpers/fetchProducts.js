const fetchProducts = async () => {
  const promise = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const { results } = await promise.json();
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
