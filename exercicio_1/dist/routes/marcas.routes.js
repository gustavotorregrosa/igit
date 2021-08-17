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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MarcasController = __importStar(require("../controllers/marcas.controller"));
const marcasRouter = express_1.Router();
marcasRouter.get('/', MarcasController.listaMarcas);
marcasRouter.get('/numeradas', MarcasController.listaMarcasNumeradas);
marcasRouter.get('/maisModelos', MarcasController.listaMaxQtd);
marcasRouter.get('/menosModelos', MarcasController.listaMinQtd);
marcasRouter.get('/listaMaisModelos/:x', MarcasController.listaQtdMaiores);
marcasRouter.get('/listaMenosModelos/:x', MarcasController.listaQtdMenores);
marcasRouter.post('/listaModelos', MarcasController.listaModelos);
exports.default = marcasRouter;
