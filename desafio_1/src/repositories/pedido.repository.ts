import { IPedido } from "../interfaces/pedido.interface"
import dados from '../misc/pedidos.json'
import {promises as fs} from 'fs'
import { PedidoDTO } from "../dto/pedido.dto"
const {readFile, writeFile} = fs
const path: string = __dirname + '/../misc/pedidos.json'

interface IDados {
    nextId: number
    pedidos: IPedido[]
}

export async function savePedido(pedido: PedidoDTO | IPedido): Promise<IPedido>{
    let pedidoCompleto: IPedido = await completaPedido(pedido)
    let pedidos: IPedido[] = (await getPedidos()).filter(p => p.id as number != pedidoCompleto.id)
    pedidos.push({...pedidoCompleto})
    let dados: IDados = await lerDados()
    dados = {
        ...dados,
        pedidos
    }
    await salvarDados(dados)
    return pedidoCompleto
}

export async function excluirPedido(id: number): Promise<IPedido>{
    const pedido: IPedido = await getPedido(id)
    const pedidos: IPedido[] = (await getPedidos()).filter(p => p.id as number != id)
    let dados: IDados = {
        ...await lerDados(),
        pedidos
    }
    await salvarDados(dados)
    return pedido
}

async function completaPedido(pedido: PedidoDTO | IPedido): Promise<IPedido>{
    let isPedidoJaCadastrado = 'id' in pedido
    if(!isPedidoJaCadastrado){
        pedido = {
            ...pedido,
            id: await pegaProxNumPedido(),
            timestamp: new Date().toString(),
            entregue: false
        } as IPedido
    }

    return pedido as IPedido    
}

export async function getPedidos(): Promise<IPedido[]>{
    let dados:IDados = await lerDados()
    return dados.pedidos as IPedido[]
}

export async function getNextID(): Promise<number>{
    let dados:IDados = await lerDados()
    return dados.nextId as number
}

export async function getPedido(num: number): Promise<IPedido>{
    let pedido: IPedido | null = null
    let todosPedidos: IPedido[] = await getPedidos()
    todosPedidos.map(p => {
        if(p.id == num){
            pedido = p
        }
    })

    if(!pedido){
        throw new Error('Pedido nao encontrado')
    }

    return pedido
}

async function lerDados(): Promise<IDados>{
    let dadosString: string = await readFile(path, 'utf-8')
    return JSON.parse(dadosString) as IDados
}

async function salvarDados(dados: IDados): Promise<IDados>{
    await writeFile(path, JSON.stringify(dados), 'utf8')
    return dados
}


async function pegaProxNumPedido(): Promise<number>{
    let dados: IDados = await lerDados()
    let nextId: number = dados.nextId as number
    let proxId: number = nextId + 1
    let novosDados: IDados = {
        ...dados,
        nextId: proxId
    }
    await salvarDados(novosDados)
    return nextId
}





