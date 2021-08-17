"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaModelos = exports.listaQtdMenores = exports.listaQtdMaiores = exports.listaMinQtd = exports.listaMaxQtd = exports.listaMarcasNumeradas = exports.listaMarcas = void 0;
const MarcasService = __importStar(require("../services/marcas.service"));
function listaMarcas(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let dados = yield MarcasService.getAll();
        res.json(dados);
    });
}
exports.listaMarcas = listaMarcas;
function listaMarcasNumeradas(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let dados = yield MarcasService.getAllWithNum();
        res.json(dados);
    });
}
exports.listaMarcasNumeradas = listaMarcasNumeradas;
function listaMaxQtd(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let nomes = yield MarcasService.getMaxQuantityBrand();
        res.json(nomes);
    });
}
exports.listaMaxQtd = listaMaxQtd;
function listaMinQtd(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let nomes = yield MarcasService.getMinQuantityBrand();
        res.json(nomes);
    });
}
exports.listaMinQtd = listaMinQtd;
function listaQtdMaiores(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let num;
        try {
            num = req.params.x;
            let nomes = yield MarcasService.getXMaiores(num);
            res.json(nomes);
        }
        catch (e) {
            res.send('impossivel converter');
        }
    });
}
exports.listaQtdMaiores = listaQtdMaiores;
function listaQtdMenores(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let num;
        try {
            num = req.params.x;
            let nomes = yield MarcasService.getXMenores(num);
            res.json(nomes);
        }
        catch (e) {
            res.send('impossivel converter');
        }
    });
}
exports.listaQtdMenores = listaQtdMenores;
function listaModelos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const nome = req.body.nomeMarca;
        let modelos = yield MarcasService.buscaTexto(nome);
        res.json(modelos);
    });
}
exports.listaModelos = listaModelos;
