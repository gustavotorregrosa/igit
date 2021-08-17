"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscaTexto = exports.getXMenores = exports.getXMaiores = exports.getMinQuantityBrand = exports.getMaxQuantityBrand = exports.getAllWithNum = exports.getAll = void 0;
const car_list_json_1 = __importDefault(require("../misc/car-list.json"));
function esperar(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, t);
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        // await esperar(3000)
        return car_list_json_1.default;
    });
}
exports.getAll = getAll;
function getAllWithNum() {
    return __awaiter(this, void 0, void 0, function* () {
        // await esperar(3000)
        let marcasNumeradas = [];
        Array.from(car_list_json_1.default).map(m => {
            marcasNumeradas.push(Object.assign(Object.assign({}, m), { qtd: m.models.length }));
        });
        marcasNumeradas.sort((a, b) => {
            if (a.qtd < b.qtd) {
                return -1;
            }
            if (a.qtd > b.qtd) {
                return 1;
            }
            return 0;
        });
        return marcasNumeradas;
    });
}
exports.getAllWithNum = getAllWithNum;
function getMaxQuantityBrand() {
    return __awaiter(this, void 0, void 0, function* () {
        let brandsWithNum = yield getAllWithNum();
        let maxNum = brandsWithNum[brandsWithNum.length - 1].qtd;
        return yield getBrandsPerQtd(maxNum);
    });
}
exports.getMaxQuantityBrand = getMaxQuantityBrand;
function getMinQuantityBrand() {
    return __awaiter(this, void 0, void 0, function* () {
        let brandsWithNum = yield getAllWithNum();
        let minNum = brandsWithNum[0].qtd;
        return yield getBrandsPerQtd(minNum);
    });
}
exports.getMinQuantityBrand = getMinQuantityBrand;
function getBrandsPerQtd(qtd) {
    return __awaiter(this, void 0, void 0, function* () {
        let names = [];
        let brandsWithNum = yield getAllWithNum();
        brandsWithNum.map(brand => {
            if (brand.qtd == qtd) {
                names.push(brand.brand);
            }
        });
        if (names.length == 1) {
            return names[0];
        }
        return names;
    });
}
function getX(num, maiores = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let brandsWithNum = yield getAllWithNum();
        if (maiores) {
            brandsWithNum.sort((a, b) => {
                if (a.qtd < b.qtd) {
                    return 1;
                }
                if (a.qtd > b.qtd) {
                    return -1;
                }
                return 0;
            });
        }
        let brands = [];
        for (let i = 0; i < num; i++) {
            let s = brandsWithNum[i].brand + " - " + brandsWithNum[i].qtd;
            brands.push(s);
        }
        return brands;
    });
}
function getXMaiores(num) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getX(num, true);
    });
}
exports.getXMaiores = getXMaiores;
function getXMenores(num) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getX(num, false);
    });
}
exports.getXMenores = getXMenores;
function buscaTexto(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        let brandsWithNum = yield getAllWithNum();
        let modelos = [];
        brandsWithNum.map(b => {
            if (nome.toLowerCase() == b.brand.toLowerCase()) {
                modelos = [
                    ...b.models
                ];
            }
        });
        return modelos;
    });
}
exports.buscaTexto = buscaTexto;
