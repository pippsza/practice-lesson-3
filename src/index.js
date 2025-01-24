import './styles/normalize.css';
import './styles/index.css';
import { productTemplate } from './requests/products';
import { createProductCardTemplate } from './services/markupService';

const allProducts = document.querySelector('#allProducts');

const asyncProductTemplate = async () => {
  const {
    data: { products },
  } = await productTemplate();
  allProducts.innerHTML = createProductCardTemplate(products);
};

asyncProductTemplate();
