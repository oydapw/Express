const productService = require('../services/productService');

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const productData = req.body;
    if (!productData.name || !productData.price || productData.inProduction === undefined || !productData.productionDate || !productData.components) {
      return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
    }
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const productData = req.body;
    if (!productData.name || !productData.price || productData.inProduction === undefined || !productData.productionDate || !productData.components) {
      return res.status(400).json({ error: 'Отсутствуют обязательные поля' });
    }
    const updatedProduct = await productService.updateProduct(req.params.id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function patchProduct(req, res) {
  try {
    const productData = req.body;
    const updatedProduct = await productService.patchProduct(req.params.id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };