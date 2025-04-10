let dados = [];
const totalRespostas = 3; //3 para teste, 45 para atividade

function registrar() {
    const idade = parseInt(document.getElementById('inputIdade').value);
    const sexo = document.getElementById('inputSexo').value;
    const opiniao = parseInt(document.getElementById('inputOpiniao').value);

    if (isNaN(idade) || !sexo || isNaN(opiniao)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    dados.push({ idade, sexo, opiniao });

    document.getElementById('inputIdade').value = '';
    document.getElementById('inputSexo').value = '';
    document.getElementById('inputOpiniao').value = '';

    atualizarStatus();

    if (dados.length === totalRespostas) {
        gerarRelatorio();
        document.getElementById('formulario').style.display = 'none';
        document.getElementById('reiniciar').style.display = 'block';
    }
}

function atualizarStatus() {
    document.getElementById('status').innerText = `Respostas: ${dados.length} de ${totalRespostas}`;
}

function gerarRelatorio() {
    let somaIdade = 0;
    let maisVelho = dados[0].idade;
    let maisNovo = dados[0].idade;
    let pessimos = 0;
    let otimosBons = 0;
    let contF = 0, contM = 0, contO = 0;

    for (let i = 0; i < dados.length; i++) {
        somaIdade += dados[i].idade;
        if (dados[i].idade > maisVelho) maisVelho = dados[i].idade;
        if (dados[i].idade < maisNovo) maisNovo = dados[i].idade;

        if (dados[i].opiniao === 1) pessimos++;
        if (dados[i].opiniao === 4 || dados[i].opiniao === 3) otimosBons++;

        if (dados[i].sexo === 'F') contF++;
        else if (dados[i].sexo === 'M') contM++;
        else contO++;
    }

    const media = (somaIdade / dados.length).toFixed(2);
    const percentualOtimoBom = ((otimosBons / dados.length) * 100).toFixed(2);

    document.getElementById('relatorio').innerHTML = `
<p>Média de idade: ${media}</p>
<p>Maior idade: ${maisVelho}</p>
<p>Menor idade: ${maisNovo}</p>
<p>Total de avaliações "Péssimo": ${pessimos}</p>
<p>Percentual de "Ótimo" e "Bom": ${percentualOtimoBom}%</p>
<p>Quantidade de Mulheres: ${contF}</p>
<p>Quantidade de Homens: ${contM}</p>
<p>Quantidade de Outros: ${contO}</p>
  `;
}

function resetar() {
    dados = [];
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('reiniciar').style.display = 'none';
    document.getElementById('relatorio').innerHTML = '';
    document.getElementById('status').innerText = '';
}