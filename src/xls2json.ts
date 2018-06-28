import { Contracheque } from './Contracheque';
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

new Contracheque().extrairDados(sheet);