const fetchProducts = async (search) => {
  if (search == null) {
    throw new Error('You must provide an url');
  }
  const promise = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
  const { results } = await promise.json();
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
