import { Router } from 'express'
import pedidosRouter from './pedidos.routes'

const routes = Router()
routes.use('/pedidos', pedidosRouter)

export default routes