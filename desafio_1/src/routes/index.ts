import { Router } from 'express'
import pedidosRouter from './pedidos.routes'

const routes = Router()
/**
 * 
 * @swagger
 */
routes.use('/pedidos', pedidosRouter)

export default routes