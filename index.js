const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

app.get('/', (req, res) => {
  res.send('Hye ,  i am listing for the request.');
});

function addNewItem(productId, name, price, quantity) {
  let newItem = { productId, name, price, quantity };
  cart.push(newItem);
  return { cartItems: cart };
}

app.get('/cart/add', (req, res) => {
  let productId = req.query.productId;
  let name = req.query.name;
  let price = req.query.price;
  let quantity = req.query.quantity;

  let results = addNewItem(productId, name, price, quantity);
  res.status(200).json(results);
});
function editQuantity(cart, productId, quantity) {
  let editCartItems = cart.map((item) => {
    if (item.productId === productId) {
      item.quantity = quantity;
    }
    return item;
  });
  return { cartItems: editCartItems };
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let results = editQuantity(cart, productId, quantity);
  res.status(200).json(results);
});

function deleteItem(productId, cart) {
  cart = cart.filter((item) => item.productId !== productId);
  return { cartItems: cart };
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let results = deleteItem(productId, cart);
  res.status(200).json(results);
});
function allItemsOfCart(cart) {
  return { cartItems: cart };
}
app.get('/cart', (req, res) => {
  let results = allItemsOfCart(cart);
  res.status(200).json(results);
});

function getTotalQuantity(cart) {
  let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return { totalQuantity };
}

app.get('/cart/total-quantity', (req, res) => {
  let results = getTotalQuantity(cart);
  res.status(200).json(results);
});

function getTotalPrice(cart) {
  let totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  return { totalPrice };
}

app.get('/cart/total-price', (req, res) => {
  let results = getTotalPrice(cart);
  res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
