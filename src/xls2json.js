const XLSX = require('xlsx');
const fs = require('fs');
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
let nomes = {'B':'nome','I':'bruto','O':'liquido','Q':'diarias', 'G':'Axilios'};
let dados = [];

while (sheet[celula] && sheet[celula].w) {
    let obj = {};
    celulas.forEach(c => {
        obj[nomes[c]] = sheet[c + linha].v;
    })
    obj.nome = 'Excelência Nr: ' + linha;
    console.log(obj);

    dados.push(obj);
    
    salarioMedio += obj.valor;
    salarioMaximo = Math.max(salarioMaximo, obj.valor);
    linha++;
    celula = 'B' + linha;
}

fs.writeFile('TJPE.json', JSON.stringify(dados));

console.log(salarioMedio / linha);
console.log(salarioMaximo);

