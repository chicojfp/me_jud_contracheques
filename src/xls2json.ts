// import {fs} from "@types/node/fs";
import * as XLSX from "xlsx";
import { setServers } from "dns";

// // const XLSX = require('xlsx');
// // const fs = require('fs');
const workbook = XLSX.readFile('201803TJPE.xls');
const sheet_name_list = workbook.SheetNames;
// console.log(sheet_name_list);
// console.log(workbook.Sheets['Contracheque']);

let sheet = workbook.Sheets['Contracheque'];
// console.log(sheet["F22"]);
let linha = 22;
let celula = 'B' + linha;
let salarioMedio = 0.0;
let salarioMaximo = 0.0;


let celulas = ['B','I','G','O','Q'];
let nomes = {B:'nome',I:'bruto',O:'liquido',Q:'diarias', G:'Axilios'};

let o = <{ [name: string]: string }> { B:'nome',I:'bruto',O:'liquido',Q:'diarias', G:'Axilios' } 
// let {B:'nome',I:'bruto',O:'liquido',Q:'diarias', G:'Axilios'}=celulas;
let dados = [];

const fs = require('fs');

while (sheet[celula] && sheet[celula].w) {
    let obj: any = {};
    celulas.forEach(c => {
        // obj[c] = sheet[c + linha].v;
        obj[o[c]] = sheet[c + linha].v;
        // [nomes[c]] = sheet[c + linha].v;
    })
    obj.nome = 'Excelência Nr: ' + linha;
    console.log(JSON.stringify(obj));

    dados.push(obj);

    salarioMedio += obj.bruto;
    salarioMaximo = Math.max(salarioMaximo, obj.bruto);
    linha++;
    celula = 'B' + linha;
}

fs.writeFile('TJPE.json', JSON.stringify(dados));

console.log('Salário médio: R$' + (salarioMedio / linha));
console.log('Maior salário: R$' + salarioMaximo);

