import './styles/normalize.css';
import './styles/index.css';
import { productTemplate , getElemetById} from './requests/products';
import { createProductCardTemplate , createCardById } from './services/markupService';

const allProducts = document.querySelector('#allProducts');
const form = document.querySelector('#singleProductForm');
const singleProduct = document.querySelector('#singleProduct');

const asyncProductTemplate = async () => {
  const {
    data: { products },
  } = await productTemplate();
  allProducts.innerHTML = createProductCardTemplate(products);
};

// asyncProductTemplate();


form.addEventListener('submit', async (event) =>{
  event.preventDefault();

const id = form.elements.id.value;

  

  const { data } = await getElemetById(id)
  

singleProduct.innerHTML = createCardById(data);



} )