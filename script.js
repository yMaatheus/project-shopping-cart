function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  const { target } = event;
  if (target.classList.contains('cart__item')) {
    target.remove();
  }
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function loadProducts() {
  const items = document.querySelector('.items');
  const products = await fetchProducts();
  products.forEach((product) => items.appendChild(createProductItemElement(product)));
}

async function addItemToCartItem(id) {
  const item = await fetchItem(id);
  const cart = document.querySelector('.cart__items');
  cart.appendChild(createCartItemElement(item));
}

function addItemToCartListener(event) {
  const { target } = event;
  if (target.classList.contains('item__add')) {
    const id = target.parentElement.firstElementChild.innerText;
    addItemToCartItem(id);
    saveCartItems(id);
  }
}

function loadCartItems() {
  getSavedCartItems().forEach((id) => addItemToCartItem(id));
}

window.onload = () => {
  loadProducts();

  const buttonAddToCard = document.querySelector('.items');
  buttonAddToCard.addEventListener('click', addItemToCartListener);

  const cart = document.querySelector('.cart__items');
  cart.addEventListener('click', cartItemClickListener);

  loadCartItems();
};
