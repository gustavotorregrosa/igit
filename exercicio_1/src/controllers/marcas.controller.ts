import { Request, Response, NextFunction } from 'express'
import { IMarcaNumerada } from '../interfaces/marca-numerada.interface'
import { IMarca } from '../interfaces/marca.interface'
import * as MarcasService from '../services/marcas.service'

export async function listaMarcas(req: Request, res: Response, next: NextFunction){
    let dados: IMarca[] = await MarcasService.getAll()
    res.json(dados)
}

export async function listaMarcasNumeradas(req: Request, res: Response, next: NextFunction){
    let dados: IMarcaNumerada[] = await MarcasService.getAllWithNum()
    res.json(dados)
}

export async function listaMaxQtd(req: Request, res: Response, next: NextFunction){
    let nomes: string[] | string = await MarcasService.getMaxQuantityBrand()
    res.json(nomes)
}

export async function listaMinQtd(req: Request, res: Response, next: NextFunction){
    let nomes: string[] | string = await MarcasService.getMinQuantityBrand()
    res.json(nomes)
}

export async function listaQtdMaiores(req: Request, res: Response, next: NextFunction){
    let num: number
    try{
        num = req.params.x as unknown as number
        let nomes: string[] = await MarcasService.getXMaiores(num)
        res.json(nomes)
    }catch(e){
        res.send('impossivel converter')
    }
}


export async function listaQtdMenores(req: Request, res: Response, next: NextFunction){
    let num: number
    try{
        num = req.params.x as unknown as number
        let nomes: string[] = await MarcasService.getXMenores(num)
        res.json(nomes)
    }catch(e){
        res.send('impossivel converter')
    }
}

export async function listaModelos(req: Request, res: Response, next: NextFunction){
    const nome: string = req.body.nomeMarca
    let modelos: string[] = await MarcasService.buscaTexto(nome)
    res.json(modelos)
}



