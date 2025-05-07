const { v4: uuidv4 } = require('uuid');
const { readProducts, writeProducts } = require('../db/db');

async function getAllProducts() {
  return await readProducts();
}

async function getProductById(id) {
  const products = await readProducts();
  const product = products.find(prod => prod.id === id);
  if (!product) throw new Error('Продукт не найден');
  return product;
}

async function createProduct(productData) {
  const products = await readProducts();
  const newProduct = {
    id: uuidv4(),
    name: productData.name,
    price: productData.price,
    inProduction: productData.inProduction,
    productionDate: productData.productionDate,
    components: productData.components
  };
  products.push(newProduct);
  await writeProducts(products);
  return newProduct;
}

async function updateProduct(id, productData) {
  const products = await readProducts();
  const index = products.findIndex(prod => prod.id === id);
  if (index === -1) throw new Error('Продукт не найден');
  products[index] = { ...products[index], ...productData, id };
  await writeProducts(products);
  return products[index];
}

async function patchProduct(id, productData) {
  const products = await readProducts();
  const index = products.findIndex(prod => prod.id === id);
  if (index === -1) throw new Error('Продукт не найден');
  products[index] = { ...products[index], ...productData, id };
  await writeProducts(products);
  return products[index];
}

async function deleteProduct(id) {
  const products = await readProducts();
  const index = products.findIndex(prod => prod.id === id);
  if (index === -1) throw new Error('Продукт не найден');
  const deletedProduct = products.splice(index, 1)[0];
  await writeProducts(products);
  return deletedProduct;
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };