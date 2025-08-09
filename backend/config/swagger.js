const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses Management API',
            version: '1.0.0',
            description: 'API para gestión de usuarios, cursos y horarios',
            contact: {
                name: 'API Support',
                email: 'support@cursosdev.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ],
        tags: [
            {
                name: 'Authentication',
                description: 'Endpoints de autenticación'
            },
            {
                name: 'Users',
                description: 'Gestión de usuarios'
            },
            {
                name: 'Courses',
                description: 'Gestión de cursos'
            },
            {
                name: 'Schedules',
                description: 'Gestión de horarios'
            },
            {
                name: 'WebSocket',
                description: 'Endpoints relacionados con WebSocket y datos en tiempo real'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        userId: {
                            type: 'integer',
                            description: 'ID único del usuario',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del usuario',
                            example: 'Juan Pérez'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email del usuario',
                            example: 'juan@example.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña del usuario',
                            example: '123456'
                        }
                    }
                },
                Course: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        courseId: {
                            type: 'integer',
                            description: 'ID único del curso',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del curso',
                            example: 'Angular Fundamentals'
                        }
                    }
                },
                Schedule: {
                    type: 'object',
                    required: ['courseId', 'name', 'frequency', 'duration', 'resume', 'price'],
                    properties: {
                        scheduleId: {
                            type: 'integer',
                            description: 'ID único del horario',
                            example: 1
                        },
                        courseId: {
                            type: 'integer',
                            description: 'ID del curso asociado',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del horario',
                            example: 'Grupo Mañana'
                        },
                        frequency: {
                            type: 'string',
                            description: 'Frecuencia de las clases',
                            example: 'Lunes a Viernes'
                        },
                        duration: {
                            type: 'string',
                            description: 'Duración del curso',
                            example: '3 meses'
                        },
                        resume: {
                            type: 'string',
                            description: 'Resumen del horario',
                            example: 'Curso intensivo de Angular con enfoque práctico'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            description: 'Precio del curso',
                            example: 299.99
                        },
                        courseName: {
                            type: 'string',
                            description: 'Nombre del curso (solo en consultas)',
                            example: 'Angular Fundamentals'
                        }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email del usuario',
                            example: 'admin@example.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña del usuario',
                            example: 'admin123'
                        }
                    }
                },
                RefreshTokenRequest: {
                    type: 'object',
                    required: ['refreshToken'],
                    properties: {
                        refreshToken: {
                            type: 'string',
                            description: 'Token de actualización',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                        }
                    }
                },
                ApiResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Indica si la operación fue exitosa'
                        },
                        message: {
                            type: 'string',
                            description: 'Mensaje descriptivo de la operación'
                        },
                        data: {
                            description: 'Datos de respuesta'
                        }
                    }
                },
                PaginatedResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Indica si la operación fue exitosa'
                        },
                        message: {
                            type: 'string',
                            description: 'Mensaje descriptivo de la operación'
                        },
                        data: {
                            type: 'array',
                            description: 'Array de elementos'
                        },
                        pagination: {
                            type: 'object',
                            properties: {
                                currentPage: {
                                    type: 'integer',
                                    description: 'Página actual'
                                },
                                pageSize: {
                                    type: 'integer',
                                    description: 'Tamaño de página'
                                },
                                totalItems: {
                                    type: 'integer',
                                    description: 'Total de elementos'
                                },
                                totalPages: {
                                    type: 'integer',
                                    description: 'Total de páginas'
                                },
                                hasNext: {
                                    type: 'boolean',
                                    description: 'Indica si hay página siguiente'
                                },
                                hasPrevious: {
                                    type: 'boolean',
                                    description: 'Indica si hay página anterior'
                                }
                            }
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Mensaje de error'
                        },
                        data: {
                            type: 'null',
                            example: null
                        },
                        errors: {
                            type: 'array',
                            description: 'Detalles de errores de validación'
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js', './controllers/*.js'], // rutas a los archivos que contienen definiciones OpenAPI
};

const specs = swaggerJSDoc(options);

module.exports = specs;
