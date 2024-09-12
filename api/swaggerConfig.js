import swaggerJsDoc from "swagger-jsdoc";

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Define a versão do OpenAPI
    info: {
      title: "API Documentation", // Título da documentação da API
      version: "1.0.0", // Versão da API
      description: "Documentação da API Avaliação FullStack", // Descrição da API
      contact: {
        name: "Guilherme de Freitas Schwingel",
      },
    },
    servers: [
      {
        url: "/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./api/routes/*.js"], // Caminho para os arquivos onde o Swagger deve procurar pelas definições de API
};

// Gera a documentação Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configurações personalizadas para o Swagger UI
const swaggerUiOptions = {
  customSiteTitle: "Documentação da API Avaliação FullStack", // Título personalizado para a aba do navegador
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css", // URL do CSS do Swagger UI a partir de um CDN
  customCss: `
  .swagger-ui .opblock-summary-path-description-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    gap: 0px 10px;
    padding: 0px 10px; }
`,
};

// Exporta as configurações do Swagger
export { swaggerDocs, swaggerUiOptions };
