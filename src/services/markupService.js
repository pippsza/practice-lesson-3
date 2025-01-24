export const createProductCardTemplate = arrayProducts => {
  const productTemplate = arrayProducts
    .map(
      productInfo => ` <li>
        <h3>${productInfo.title}</h3>
        <p>${productInfo.brand}</p>
        <p> Rating:${productInfo.rating} and price: ${productInfo.price}</p>
        <img src="${productInfo.thumbnail}" alt="${productInfo.category}">
      </li> `
    )
    .join('');
  return productTemplate;
};

//  title rating thumbnail price brand
