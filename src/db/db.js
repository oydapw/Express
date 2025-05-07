const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'products.json');
const workersFile = path.join(__dirname, 'workers.json');

async function readProducts() {
  try {
    const data = await fs.readFile(productsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Ошибка чтения данных о продуктах');
  }
}

async function writeProducts(products) {
  try {
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
  } catch (error) {
    throw new Error('Ошибка записи данных о продуктах');
  }
}

async function readWorkers() {
  try {
    const data = await fs.readFile(workersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Ошибка чтения данных о рабочих');
  }
}

async function writeWorkers(workers) {
  try {
    await fs.writeFile(workersFile, JSON.stringify(workers, null, 2));
  } catch (error) {
    throw new Error('Ошибка записи данных о рабочих');
  }
}

module.exports = { readProducts, writeProducts, readWorkers, writeWorkers };