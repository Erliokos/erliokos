import express from 'express';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import imageRoutes from './routes/image.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes';

const app = express();

// Определение конфигурации Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop API',
      version: '1.0.0',
      description: 'API for managing shop categories and products',
    },
    servers: [
      {
        url: 'http://localhost:3001', // URL для локальной разработки
      },
    ],
  },
  apis: ['./src/controllers/*.ts'], // Путь к файлам, где находятся аннотации для Swagger
};

// Генерация документации Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const modelsDir = path.join(__dirname, '../models');


app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", // Фронтенд URL
  credentials: true,               // Разрешаем куки и авторизацию
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Все необходимые методы
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'] // Разрешенные заголовки
}));

// ✅ Обработка preflight запросов
app.options('*', cors({
  origin: "http://localhost:3000",
  credentials: true
}));



app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Подключение Swagger UI для отображения документации
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/image', express.static(path.join(__dirname, '../images')));


export default app;
