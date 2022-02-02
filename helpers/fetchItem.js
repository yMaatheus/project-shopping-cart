const fetchItem = async (id) => {
  const promise = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const resolve = await promise.json();
  return resolve;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
