import { displayCartItems, selectElementsForCart } from './cart.js';
import { getLocalStorage, setLocalStorage } from './script.js';

const iconQty = document.querySelector('.header__icon--total');
const productContainer = document.querySelector('.products');
let currentCart;

function calculatePercentageOff(originalPrice, discountedPrice) {
  const percentageOff = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(percentageOff);
}

const originalPrice = 100;
const discountedPrice = 80;
const percentageOff = calculatePercentageOff(originalPrice, discountedPrice);
console.log(`${percentageOff}% off`);

function displayData(data, category) {
  const productContainer = document.querySelector('.products');
  productContainer.innerHTML = '';

  let targetCategory = category.toLowerCase();

  data.categories.forEach((categoryData) => {
    if (categoryData.category_name.toLowerCase() === targetCategory) {
      categoryData.category_products.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.id = item.id;

        const percentageOff = calculatePercentageOff(item.compare_at_price, item.price);
        const discountText = `${percentageOff}% off`;

        div.innerHTML = `
          <div class="product__${index + 1}">
          <div class="product__${index + 1}--image" style="position: relative;">
          <span class="badge-text">${item.badge_text}</span>
              <img
                class="image--${index + 1}"
                src="${item.image}"
                alt="product ${index + 1}"
                class="product-image"
              />
              <div class="product__${index + 1}">
                <div>
                  <h3 class="product__${index + 1}--title">${item.title}<ul style="list-style-type:circle;" class="product__${index + 1}--vendor">
                   
                </div>
                <ul type="circle"><li>${item.vendor}</li>
                </ul></h3>
              </div>
              <h5 class="product__1--price"> Rs. ${item.price} ${' '}<del>Rs. ${item.compare_at_price} </del>  <span class="discount-text" style="text: red;">${' '}${discountText}${' '}</span> </h5>
              <button class="btn add-cart">Add to Cart</button>
            </div>
          </div>
        `;

        productContainer.append(div);
      });
    }
  });

  loadListeners();
  loadPreviousCart();
  loadPreviousQtyCart();
}

function loadListeners() {
  const addCartBtn = document.querySelectorAll('.add-cart');

  addCartBtn.forEach((btn) => btn.addEventListener('click', handleAddProduct));
}

function loadPreviousCart() {
  const prevCart = getLocalStorage('currentCart');
  currentCart = prevCart ? prevCart : [];
  prevCart && displayCartItems(currentCart);
}

function loadPreviousQtyCart() {
  displayCartIcon('initialState');
}

function handleAddProduct(e) {
  const price = e.target.previousElementSibling.innerText.split(' ')[1]; // Adjusted to get the correct price

  displayCartIcon();
  addToCart(e, price);
}

function addToCart(e, price) {
  const productCard = e.target.closest('.product-item');
  const [image, id, title] = selectElementsForCart(productCard);
  let existingItem = false;
  if (currentCart.length !== 0) {
    currentCart = currentCart.map((el) => {
      if (el.id === id) {
        existingItem = true;
        return { ...el, qty: el.qty + 1 };
      }
      return { ...el };
    });
  }
  if (!existingItem) {
    const newArticle = {
      id,
      image,
      price,
      qty: 1,
      title,
    };
    currentCart.push(newArticle);
  }
  setLocalStorage('currentCart', currentCart);
}

function displayCartIcon(type) {
  if (type !== 'initialState') {
    const currentQty = Number(iconQty.innerText) + 1;
    iconQty.innerText = currentQty;
    setLocalStorage('qtyCart', currentQty);
  } else {
    iconQty.innerText = getLocalStorage('qtyCart') || 0;
  }
}

export { displayData, displayCartIcon };
