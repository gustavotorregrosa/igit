import { EntregaPedidoDTO } from '../dto/entrega.dto'
import { PedidoDTO } from '../dto/pedido.dto'
import { IPedido}  from '../interfaces/pedido.interface'
import * as PedidoRepository from '../repositories/pedido.repository'

export async function getAll(): Promise<IPedido[]> {
    return await PedidoRepository.getPedidos() as IPedido[]
}

export async function getPedido(num: number): Promise<IPedido> {
    return await PedidoRepository.getPedido(num) as IPedido
}

export async function getValorPorCliente(nomeCliente: string): Promise<number>{
    return somaValor(await getPedidosPorCliente(nomeCliente))
}

export async function getValorPorProduto(nomeProduto: string): Promise<number>{
    return somaValor(await getPedidosPorProduto(nomeProduto))
}

export async function excluirPedido (id: number): Promise<IPedido> {
    return await PedidoRepository.excluirPedido(id)
}

export async function getProdutosOrdenados():Promise<string[]>{
    let arrayProdutos: { 
        produto: string
        qtd: number
    }[] = await getArrayOcorrenciaProdutos()
    arrayProdutos.sort((b, a) => {
        if(a.qtd < b.qtd){
            return -1
        }

        if(a.qtd > b.qtd){
            return 1
        }

        return 0
    })

    let produtos: string[] = []
    arrayProdutos.map(p => produtos.push(p.produto + " - " + p.qtd))
    return produtos
}

export async function savePedido(pedido: PedidoDTO | IPedido): Promise<IPedido>{
    return await PedidoRepository.savePedido(pedido)
}

export async function atualizaStatusEntrega(pedidoEntrega: EntregaPedidoDTO): Promise<IPedido>{
    let pedido: IPedido = await PedidoRepository.getPedido(pedidoEntrega.id)
    pedido.entregue = pedidoEntrega.entregue
    return await savePedido(pedido)

}

async function getArrayOcorrenciaProdutos(): Promise<{
    produto: string
    qtd: number
}[]>{
    
    let arrayProdutosOcorrencia: {
        produto: string
        qtd: number
    }[] = []

    const todosPedidos: IPedido[] = await getAll()
    todosPedidos.map(pedido => {
        let produtoJaOcorrido = false
        let qtd: number = 0
        arrayProdutosOcorrencia.map(ocorrencia => {
            if(pedido.produto == ocorrencia.produto){
                produtoJaOcorrido = true
                qtd = ocorrencia.qtd
            }
        })

        let novoArrayOcorrencia: {
            produto: string
            qtd: number
        }[] 

        if(produtoJaOcorrido){
            qtd++
            const novoObjeto: {
                produto: string
                qtd: number
            } = {
                produto: pedido.produto,
                qtd
            }

            novoArrayOcorrencia = arrayProdutosOcorrencia.filter(ocorrencia => pedido.produto != ocorrencia.produto)
            novoArrayOcorrencia.push({...novoObjeto})

        }else{
            novoArrayOcorrencia = [...arrayProdutosOcorrencia]
            novoArrayOcorrencia.push({
                produto: pedido.produto,
                qtd: 1
            })
        }

        arrayProdutosOcorrencia = [...novoArrayOcorrencia]

    })


    return arrayProdutosOcorrencia

}


async function getPedidosPorCliente(nomeCliente: string): Promise<IPedido[]> {
    const todosPedidos: IPedido[] = await getAll()
    const pedidosConsiderados: IPedido[] = todosPedidos.filter(pedido => pedido.cliente == nomeCliente && pedido.entregue)
    return pedidosConsiderados
}

async function getPedidosPorProduto(nomeProduto: string): Promise<IPedido[]> {
    const todosPedidos: IPedido[] = await getAll()
    const pedidosConsiderados: IPedido[] = todosPedidos.filter(pedido => pedido.produto == nomeProduto && pedido.entregue)
    return pedidosConsiderados
}

async function somaValor(pedidos: IPedido[]): Promise<number>{
    let valor: number = 0
    pedidos.map(pedido => valor += pedido.valor)
    return valor
}



