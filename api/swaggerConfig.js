import swaggerJsDoc from "swagger-jsdoc";

const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://todolistbackend-09c5.onrender.com"
    : "http://localhost:4000";

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
        url: serverUrl,
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
      schemas: {
        UserCoppers: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Nome de usuário único',
              example: 'john_doe'
            },
            email: {
              type: 'string',
              description: 'Email do usuário único',
              example: 'john_doe@example.com'
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              example: 'senhaSegura123'
            },
            profilePicture: {
              type: 'string',
              description: 'URL da imagem de perfil do usuário',
              example: 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do usuário',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização do usuário',
            }
          },
          required: ['username', 'email'],
        },
        Tasks: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'ID do usuário ao qual a tarefa pertence',
              example: '6140d1f495d4c5a9b1d1f9c1',
            },
            description: {
              type: 'string',
              description: 'Descrição da tarefa',
              example: 'Concluir o relatório semanal',
            },
            status: {
              type: 'string',
              description: 'Status da tarefa',
              enum: ['to-do', 'done'],
              example: 'to-do',
            },
            order: {
              type: 'integer',
              description: 'Ordem da tarefa na lista',
              example: 1,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da tarefa',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização da tarefa',
            },
          },
          required: ['userId', 'description', 'status', 'order'],
        },
        ResetToken: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token de redefinição de senha',
              example: 'abc123resetToken',
            },
            userId: {
              type: 'string',
              description: 'ID do usuário associado ao token',
              example: '6140d1f495d4c5a9b1d1f9c1',
            },
            expires: {
              type: 'string',
              format: 'date-time',
              description: 'Data de expiração do token',
              example: '2024-12-31T23:59:59.000Z',
            },
          },
          required: ['token', 'userId', 'expires'],
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
