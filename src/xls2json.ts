import { UtilitarioArquivo } from './UtilitarioArquivo';
import { Contracheque } from './Contracheque';
import * as XLSX from "xlsx";
import { setServers } from "dns";

const workbook = XLSX.readFile('201803TJPE.xls');
const sheet_name_list = workbook.SheetNames;
let sheet = workbook.Sheets['Contracheque'];

let dados = new Contracheque().extrairDados(sheet);
UtilitarioArquivo.salvarArquivos(dados, 'TJPE', 'Contracheques');