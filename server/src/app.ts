import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import path from 'path';

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Erliokos Games',
      version: '1.0.0',
      description: 'API для создания игр',
    },
    servers: [
      {
        url: 'http://localhost:3001', // URL для локальной разработки
      },
    ],
  },
  apis: ['./src/controllers/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.options('*', cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)


export default app;
