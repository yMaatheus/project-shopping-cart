const cartItems = document.querySelector('.cart__items');
let sum = 0;

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

function updatePrice(operation, value) {
  if (operation === 'sum') {
    sum += value; 
  } else if (operation === 'sub') {
    sum -= value;
  }
  document.querySelector('.total-price').innerHTML = `${sum}`;
}

function cartItemClickListener(event) {
  const { target } = event;
  if (target.classList.contains('cart__item')) {
    target.remove();
    saveCartItems();
    const price = Number(target.innerText.split('$')[1]);
    updatePrice('sub', price);
  }
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.id = sku;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  updatePrice('sum', salePrice);
  return li;
}

async function addItemToCartItem(id, callback) {
  const item = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(item));
  if (typeof callback === 'function') {
    callback();
  }
}

function addItemToCartListener(event) {
  const { target } = event;
  if (target.classList.contains('item__add')) {
    const id = target.parentElement.firstElementChild.innerText;
    addItemToCartItem(id, saveCartItems);
  }
}

async function loadCartItems() {
  const savedCartItems = await getSavedCartItems();
  if (savedCartItems != null) {
    savedCartItems.forEach((id) => addItemToCartItem(id));
  }
}

window.onload = async () => {
  // Load Products
  const items = document.querySelector('.items');
  const products = await fetchProducts();
  products.forEach((product) => items.appendChild(createProductItemElement(product)));

  // Create Listeners
  const addToCartButton = document.querySelector('.items');
  addToCartButton.addEventListener('click', addItemToCartListener);

  cartItems.addEventListener('click', cartItemClickListener);

  // Load Cart
  loadCartItems();
};
