import { displayCartItems } from './cart.js';
import { displayData } from './products.js';

document.getElementById('menButton').addEventListener('click', () => fetchData('Men'));
document.getElementById('womenButton').addEventListener('click', () => fetchData('Women'));
document.getElementById('kidsButton').addEventListener('click', () => fetchData('Kids'));

const iconQtyAction = document.querySelector('.header__icon');

function fetchData(catagory) {
  const cat=catagory
  fetch('../products.json')
    .then((data) => data.json())
    .then((response) => {console.log(response);displayData(response,cat)})
    .catch((err) => console.error(err.message));
}

function getLocalStorage(description) {
  return localStorage.getItem(description)
    ? JSON.parse(localStorage.getItem(description))
    : undefined;
}

function setLocalStorage(description, article) {
  localStorage.setItem(description, JSON.stringify(article));
  if (description === 'currentCart') displayCartItems(article);
}

iconQtyAction.addEventListener('click', handlePageView);

function handlePageView() {
  const allProductsApp = document.querySelector('.allProductsApp');
  const shoppingCartApp = document.querySelector('.shoppingCartApp');
  allProductsApp.style.display = 'none';
  shoppingCartApp.style.display = 'block';
}

fetchData('Men');

export { getLocalStorage, setLocalStorage };
