import {Request, Response, NextFunction} from 'express'
import { EntregaPedidoDTO } from '../dto/entrega.dto'
import { PedidoDTO } from '../dto/pedido.dto'
import { IPedido } from '../interfaces/pedido.interface'
import * as PedidoService from '../services/pedido.service'

export async function listaPedidos(req: Request, res: Response, next: NextFunction){
    res.json(await PedidoService.getAll())
}

export async function atualizaStatusEntrega(req: Request, res: Response, next: NextFunction){
    const {id, entregue} =  req.body
    let pedido: EntregaPedidoDTO = {id, entregue}
    res.json(await PedidoService.atualizaStatusEntrega(pedido))
}

export async function excluirPedido(req: Request, res: Response, next: NextFunction) {
    let id: number = parseInt(req.params.id)
    res.json(await PedidoService.excluirPedido(id))
    
}

export async function salvarPedido(req: Request, res: Response, next: NextFunction){
    const {cliente, produto, valor, id, timestamp, entregue} =  req.body
    let pedido: PedidoDTO | IPedido
    pedido = {cliente, produto, valor} 
    if(req.body.id){
        pedido  = {...pedido, id, timestamp, entregue}
    }

    res.json(await PedidoService.savePedido(pedido))
}

export async function getPedido(req: Request, res: Response, next: NextFunction){
    let num: number
    try {
        num = parseInt(req.params.id)
        if(num < 0){
            throw new Error('Número negativo')
        }

        if(isNaN(num)){
            throw new Error('Número invalido')
        }
    } catch (error) {
        error as Error
        res.status(500).send(error.message)
        return
    }

    res.json(await PedidoService.getPedido(num))

}

export async function getValorPorCliente(req: Request, res: Response, next: NextFunction){
    const nomeCliente: string = req.body.nomeCliente
    res.json(await PedidoService.getValorPorCliente(nomeCliente))
}


export async function getValorPorProduto(req: Request, res: Response, next: NextFunction){
    const nomeProduto: string = req.body.nomeProduto
    res.json(await PedidoService.getValorPorProduto(nomeProduto))
}

export async function getProdutosOrdenados(req: Request, res: Response, next: NextFunction){
    res.json(await PedidoService.getProdutosOrdenados())
}



