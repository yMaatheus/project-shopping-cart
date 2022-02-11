const fetchProducts = async (search) => {
  try {
    const promise = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
    const { results } = await promise.json();
    return results;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
