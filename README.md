# me_jud_contracheques
Scripts node de conversão das planilhas do CNJ para arquivos jSon

# como usar (exemplo trivial do primeiro commit)
    git clone https://github.com/chicojfp/me_jud_contracheques.git
    cd me_jud_contracheques
	npm install
	tsc && node dist/xls2json.js

# exemplo de saída
    {"nome":"Excelência Nr: 711","bruto":34394,"Axilios":5446,"liquido":17299,"diarias":0}
    (...)
    {"nome":"Excelência Nr: 712","bruto":28948,"Axilios":0,"liquido":28948,"diarias":0}
    {"nome":"Excelência Nr: 713","bruto":30471,"Axilios":0,"liquido":14159,"diarias":0}
    {"nome":"Excelência Nr: 714","bruto":36659,"Axilios":5446,"liquido":15894,"diarias":0}
    Salário médio: R$34831.8979020979
    Maior salário: R$76446
