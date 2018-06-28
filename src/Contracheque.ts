import * as XLSX from "xlsx";


export class Contracheque {

    public extrairDados(sheet: XLSX.WorkSheet) {
        let linha = 22;
        let celula = 'B';

        const celulas = ['B', 'I', 'G', 'O', 'Q'];
        const propriedades = <{ [name: string]: string }>{ 
            B: 'nome', I: 'bruto', 
            O: 'liquido', Q: 'diarias', 
            G: 'Axilios' 
        }
        let dados = this.mapearDados(sheet, celulas, propriedades, celula, linha);
        
        const fs = require('fs');
        fs.writeFile('TJPE_Contracheques.json', JSON.stringify(dados));

        let salarioMedio = 0.0;
        let salarioMaximo = 0.0;

        dados.forEach(e => {
            salarioMaximo = Math.max(salarioMaximo, e.bruto);
            salarioMedio += e.bruto;
        });

        console.log('Salário médio: R$' + (salarioMedio / dados.length));
        console.log('Maior salário: R$' + salarioMaximo);

    }

    private mapearDados(sheet: XLSX.WorkSheet, celulas: string[], 
            propriedades: { [name: string]: string }, celulaInicial: string, 
            indice: number): any[] {

        const dados = [];
        let celula = celulaInicial + indice;
        while (sheet[celula] && sheet[celula].w) {
            let obj: any = {};
            
            celulas.forEach(c => {
                obj[propriedades[c]] = sheet[c + indice].v;
            });
            obj.nome = 'Excelência Nr: ' + indice;
            console.log(JSON.stringify(obj));
            
            dados.push(obj);
            
            // salarioMedio += obj.bruto;
            // salarioMaximo = Math.max(salarioMaximo, obj.bruto);
            indice++;
            celula = 'B' + indice;
        }

        return dados;
    }
}