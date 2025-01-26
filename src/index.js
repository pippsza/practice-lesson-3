import './styles/normalize.css';
import './styles/index.css';
import { productTemplate, getElementById, addProduct, deleteProduct } from './requests/products';
import { fetchAllPosts, fetchPostsByUserId, fetchPostsByKeyword } from './requests/posts';
import { fetchAllUsers, fetchUsersByName, addUser } from './requests/users';
import { createProductCardTemplate, createCardById } from './services/markupService';

const allProducts = document.querySelector('#allProducts');
const form = document.querySelector('#singleProductForm');
const singleProduct = document.querySelector('#singleProduct');
const addProductForm = document.querySelector('form'); // Знаходимо форму для додавання продукту.
const newProductSection = document.querySelector('#newProductSection'); // Місце, де будемо показувати результат додавання.
const deleteProductForm = document.querySelector('#deletionProductForm');
const allUsersList = document.querySelector('#allUsers');
const userByNameForm = document.querySelector('#userByNameForm');
const usersByName = document.querySelector('#usersByName');
const userCartsForm = document.querySelector('#userCartsForm');
const cartsList = document.querySelector('#carts');
const userPostsForm = document.querySelector('#userPostsForm');
const postsList = document.querySelector('#posts');
const addUserForm = document.querySelector('form'); // Знаходимо форму.
const newUserSection = document.querySelector('#newUserSection'); // Знаходимо секцію для результату.
const allPostsList = document.querySelector('#allPosts'); // Знаходимо список для виведення постів.


// Завдання 1: Вивести всі продукти
(async () => {
  const allProducts = document.querySelector('#allProducts');//		○ Шукає в HTML елемент із ID allProducts (це <ul>).
		//Результат пошуку зберігається у змінну allProducts.

  const { data: products } = await productTemplate(); //		○ Команда await чекає завершення запиту (apiInstance.get()) і отримує його результат.

  allProducts.innerHTML = createProductCardTemplate(products);
})();
// Завдання 2: Пошук продукту за ID
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = form.elements.id.value;

  try {
    const { data } = await getElementById(id);
    singleProduct.innerHTML = createCardById(data);
  } catch (error) {
    singleProduct.textContent = 'Продукт не знайдено!';
  }
});
// Завдання 3: Додати продукт
addProductForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Запобігаємо перезавантаженню сторінки.

  // Отримуємо дані з форми
  const formData = new FormData(addProductForm);
  const productData = {
    title: formData.get('title'), // Назва продукту
    description: formData.get('description'), // Опис продукту
    price: parseFloat(formData.get('price')), // Ціна продукту (перетворюємо в число)
  };

  try {
    // Відправляємо дані на сервер для створення нового продукту
    const { data: newProduct } = await addProduct(productData);

    // Відображаємо створений продукт у розділі "newProductSection"
    newProductSection.innerHTML = createCardById(newProduct);
  } catch (error) {
    // Якщо щось пішло не так, виводимо повідомлення
    newProductSection.textContent = 'Не вдалося додати продукт!';
  }
});
//Завдання 4: Видалити продукт
deleteProductForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми.
  const id = deleteProductForm.elements.deletionId.value; // Отримуємо ID продукту.

  try {
    await deleteProduct(id); // Надсилаємо запит на видалення продукту.
    alert(`Продукт із ID ${id} видалено!`); // Повідомлення про успіх.
  } catch (error) {
    alert('Не вдалося видалити продукт!'); // Повідомлення про помилку.
  }
});
//Завдання 5: Отримати всіх користувачів


(async () => {
  try {
    const { data: users } = await fetchAllUsers(); // Отримуємо список користувачів з сервера.
    allUsersList.innerHTML = users
      .map((user) => `<li>${user.name} (${user.email})</li>`) // Створюємо HTML для кожного користувача.Метод .map() проходить по кожному користувачу в масиві users і створює HTML-рядок для кожного з них.
      .join(''); //Перетворює масив рядків у єдиний HTML-рядок.
  } catch (error) {
    allUsersList.textContent = 'Не вдалося завантажити користувачів!';
  }
})();
//Завдання 6: Знайти користувачів за ім'ям
userByNameForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = userByNameForm.elements.name.value; // Отримуємо ім'я з форми.

  try {
    const { data: users } = await fetchUsersByName(name); // Надсилаємо запит на сервер.
    usersByName.innerHTML = users
      .map((user) => `<li>${user.name} (${user.email})</li>`) // Формуємо HTML для списку.
      .join('');
  } catch (error) {
    usersByName.textContent = 'Не вдалося знайти користувачів!';
  }
});

//Завдання 7: Отримати картки користувача


userCartsForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userId = userCartsForm.elements.userId.value; // Отримуємо ID користувача.

  try {
    const { data: carts } = await fetchUserCarts(userId); // Отримуємо картки користувача.
    cartsList.innerHTML = carts
      .map((cart) => `<li>Cart ID: ${cart.id}, Total Products: ${cart.total}</li>`)
      .join('');
  } catch (error) {
    cartsList.textContent = 'Не вдалося завантажити картки!';
  }
});
//Завдання 8: Отримати пости користувача

userPostsForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userId = userPostsForm.elements.userId.value;

  try {
    const { data: posts } = await fetchPostsByUserId(userId); // Отримуємо пости.
    postsList.innerHTML = posts
      .map((post) => `<li>${post.title}</li>`)
      .join('');
  } catch (error) {
    postsList.textContent = 'Не вдалося завантажити пости!';
  }
});
// 9 Завдання: Додати нового користувача


addUserForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми.

  // Отримуємо дані з форми
  const formData = new FormData(addUserForm); // Створюємо об'єкт FormData.
  const userData = {
    firstName: formData.get('firstName'), // Отримуємо значення поля "Ім'я".
    lastName: formData.get('lastName'), // Отримуємо значення поля "Прізвище".
    email: formData.get('email'), // Отримуємо значення поля "Email".
    password: formData.get('password'), // Отримуємо значення поля "Пароль".
  };

  try {
    // Надсилаємо POST-запит на сервер для додавання нового користувача
    const { data: newUser } = await addUser(userData);

    // Відображаємо інформацію про нового користувача
    newUserSection.innerHTML = `
      <p>Користувач <strong>${newUser.firstName} ${newUser.lastName}</strong> успішно доданий!</p>
      <p>Email: ${newUser.email}</p>
    `;
  } catch (error) {
    // Якщо сталася помилка, виводимо повідомлення
    newUserSection.textContent = 'Не вдалося додати користувача!';
  }
});
//11 завдання
(async () => {
  try {
    const { data: posts } = await fetchAllPosts(); // Отримуємо всі пости з сервера.
    allPostsList.innerHTML = posts
      .map((post) => `<li><strong>${post.title}</strong>: ${post.body}</li>`) // Формуємо HTML для кожного посту.
      .join('');
  } catch (error) {
    allPostsList.textContent = 'Не вдалося завантажити пости!'; // У разі помилки показуємо повідомлення.
  }
})();
