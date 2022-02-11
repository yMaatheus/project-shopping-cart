const fetchItem = async (id) => {
  try {
    const promise = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await promise.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
