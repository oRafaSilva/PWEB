const nome = prompt("Insira seu nome:");
const notas = [];

for (let i = 1; i <= 4; i++) {
    notas.push(parseFloat(prompt(`Digite a nota ${i}:`)));
}

const media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;

alert(`${nome}, sua média é: ${media.toFixed(2)}`);