import * as XLSX from "xlsx";


export class Contracheque {

    public extrairDados(sheet: XLSX.WorkSheet): any {
        let linha = 22;
        let celula = 'B';
        const celulas = ['B', 'I', 'G', 'O', 'Q'];
        const propriedades = <{ [name: string]: string }>{
            B: 'nome', I: 'bruto',
            O: 'liquido', Q: 'diarias',
            G: 'Axilios'
        }

        let dados = this.mapearDados(sheet, celulas, propriedades, celula, linha);
        this.imprimirValores(dados);

        return dados;
    }

    private paraMoeda(valor: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(valor);
    }

    private imprimirValores(dados: any[]) {
        let totalPago = 0.0;
        let salarioMaximo = 0.0;

        dados.forEach(e => {
            salarioMaximo = Math.max(salarioMaximo, e.bruto);
            totalPago += e.bruto;
        });

        console.log('Maior salário: R$ ' + this.paraMoeda(salarioMaximo));
        console.log('Salário médio: R$ ' + this.paraMoeda(totalPago / dados.length));
        console.log('Total pago:    R$ ' + this.paraMoeda(totalPago));
        console.log('Nr de Excelências: ' + dados.length);

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
            // console.log(JSON.stringify(obj));

            dados.push(obj);

            indice++;
            celula = 'B' + indice;
        }

        return dados;
    }
}