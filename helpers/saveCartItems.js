const saveCartItems = () => {
  // console.log(ol.innerHTML);
  const cartItemsList = Array
    .from(document.querySelector('.cart__items').children).map((element) => element.id);
  localStorage.setItem('cartItems', JSON.stringify(cartItemsList));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
