const saveCartItems = (id) => {
  let array = [id];
  if (localStorage.getItem('cartItems') != null) {
    array = JSON.parse(localStorage.getItem('cartItems')).concat(array);
  }
  localStorage.setItem('cartItems', JSON.stringify(array));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
