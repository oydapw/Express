require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/productRoutes');
const workerRoutes = require('./src/routes/workerRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Добро пожаловать в API завода!',
    endpoints: {
      products: '/api/v1/products',
      workers: '/api/v1/workers'
    }
  });
});

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/workers', workerRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});