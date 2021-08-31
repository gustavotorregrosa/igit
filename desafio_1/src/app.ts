import express, { Application } from 'express'
import routes from './routes'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions: swaggerJsDoc.Options = {
    swaggerDefinition: {
        info: {
            title: 'Minha API',
            description: 'API teste documentacao',
            contact: {
                name: 'Gustavo Torregrosa'
            },
            servers: ['http://localhost:5000'],
            version: '2'
        }
    },
    apis: ['app.js'],
    
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

const app: Application = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())

/**
 * 
 * @swagger
 */
app.use(routes)

app.listen(5000, () => console.log('server on'))
