import swaggerJSDoc from 'swagger-jsdoc';

// Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de la API',
    version: '1.0.0',
    description: 'Documentación de la API de UPTC FIT',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/pages/api/**/*.js'], // Ruta de tus endpoints
};

const swaggerSpec = swaggerJSDoc(options);

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Generar el HTML con los recursos estáticos personalizados
    const html = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/swagger/swagger-ui.css">
    <link rel="icon" type="image/png" href="/swagger/favicon-32x32.png">
    <script src="/swagger/swagger-ui-bundle.js"></script>
    <script src="/swagger/swagger-ui-standalone-preset.js"></script>
    <title>Swagger UI</title>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script>
      window.onload = function () {
        const ui = SwaggerUIBundle({
          spec: ${JSON.stringify(swaggerSpec)},
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset,
          ],
        });
      };
    </script>
  </body>
  </html>
`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
