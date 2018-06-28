export class UtilitarioArquivo {
    public static salvarArquivos(dados: any[], tribunal: string, sufixo: string) {
        const fs = require('fs');
        fs.writeFile('TJPE_Contracheques.json', JSON.stringify(dados));
    }
}