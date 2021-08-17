import { Router } from "express"
import * as PedidosController from '../controllers/pedido.controller'

const pedidosRouter = Router()

pedidosRouter.get('/maisvendidos', PedidosController.getProdutosOrdenados)
pedidosRouter.get('/', PedidosController.listaPedidos)
pedidosRouter.get('/:id', PedidosController.getPedido)
pedidosRouter.post('/busca-cliente', PedidosController.getValorPorCliente)
pedidosRouter.post('/busca-produto', PedidosController.getValorPorProduto)
pedidosRouter.post('/', PedidosController.salvarPedido)
pedidosRouter.post('/entrega', PedidosController.atualizaStatusEntrega)
pedidosRouter.delete('/:id', PedidosController.excluirPedido)

export default pedidosRouter