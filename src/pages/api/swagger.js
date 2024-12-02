// pages/api/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Configuración básica de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de API', // Título de tu API
    version: '1.0.0', // Versión de la API
    description: 'API de ejemplo documentada con Swagger', // Descripción
  },
  servers: [
    {
      url: BASE_URL + '/api', // Cambia esta URL según tu configuración
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./pages/api/**/*.js'], // Ruta a tus endpoints para documentar
};

const swaggerSpec = swaggerJSDoc(options);

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerSpec);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
