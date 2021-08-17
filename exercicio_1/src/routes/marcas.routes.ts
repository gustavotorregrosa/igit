import { Request, Response, Router } from 'express'
import * as MarcasController from '../controllers/marcas.controller'

const marcasRouter = Router()

marcasRouter.get('/', MarcasController.listaMarcas)

marcasRouter.get('/numeradas', MarcasController.listaMarcasNumeradas)

marcasRouter.get('/maisModelos', MarcasController.listaMaxQtd)

marcasRouter.get('/menosModelos', MarcasController.listaMinQtd)

marcasRouter.get('/listaMaisModelos/:x', MarcasController.listaQtdMaiores)

marcasRouter.get('/listaMenosModelos/:x', MarcasController.listaQtdMenores)

marcasRouter.post('/listaModelos', MarcasController.listaModelos)

export default marcasRouter