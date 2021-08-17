import { IMarcaNumerada } from '../interfaces/marca-numerada.interface'
import { IMarca } from '../interfaces/marca.interface'
import dados from '../misc/car-list.json'

function esperar(t: number){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, t)
    })
}

export async function getAll(): Promise<IMarca[]>{
    // await esperar(3000)
    return dados
}

export async function getAllWithNum(): Promise<IMarcaNumerada[]> {
    // await esperar(3000)
    let marcasNumeradas: IMarcaNumerada[] = []
    Array.from(dados).map(m => {
        marcasNumeradas.push({
            ...m,
            qtd: m.models.length
        })
    })

    marcasNumeradas.sort((a: IMarcaNumerada, b: IMarcaNumerada) => {
        if(a.qtd < b.qtd){
            return -1
        }

        if(a.qtd > b.qtd){
            return 1
        }

        return 0
    })
    return marcasNumeradas
}

export async function getMaxQuantityBrand(): Promise<string | string[]>{
    let brandsWithNum: IMarcaNumerada[] = await getAllWithNum()
    let maxNum: number = brandsWithNum[brandsWithNum.length -1].qtd
    return await getBrandsPerQtd(maxNum)

}

export async function getMinQuantityBrand(): Promise<string | string[]>{
    let brandsWithNum: IMarcaNumerada[] = await getAllWithNum()
    let minNum: number = brandsWithNum[0].qtd
    return await getBrandsPerQtd(minNum)

}

async function getBrandsPerQtd(qtd: number): Promise<string | string[]>{
    let names: string[] = []
    let brandsWithNum: IMarcaNumerada[] = await getAllWithNum()
    brandsWithNum.map(brand => {
        if(brand.qtd == qtd){
            names.push(brand.brand)
        }
    })

    if(names.length == 1){
        return names[0]
    }

    return names
}

async function getX(num: number, maiores: boolean = true): Promise<string[]> {
    let brandsWithNum: IMarcaNumerada[] = await getAllWithNum()

    if(maiores){
        brandsWithNum.sort((a: IMarcaNumerada, b: IMarcaNumerada) => {
            if(a.qtd < b.qtd){
                return 1
            }
    
            if(a.qtd > b.qtd){
                return -1
            }
    
            return 0
        })
    }


    let brands: string[] = []
    for(let i: number = 0; i < num; i++){
        let s: string = brandsWithNum[i].brand + " - " + brandsWithNum[i].qtd
        brands.push(s)
    }

    return brands
}

export async function getXMaiores(num: number): Promise<string[]> {
    return await getX(num, true)
}

export async function getXMenores(num: number): Promise<string[]> {
    return await getX(num, false)
}

export async function buscaTexto(nome: string): Promise<string[]> {
    let brandsWithNum: IMarcaNumerada[] = await getAllWithNum()
    let modelos: string[] = []

    brandsWithNum.map(b => {
        if(nome.toLowerCase() == b.brand.toLowerCase()){
            modelos = [
                ...b.models
            ]
        }
    })

    return modelos
}