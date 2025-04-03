function escolhaComputador() {
  const random = Math.random();
  if (random < 0.33) {
    return 'pedra';
  } else if (random < 0.66) {
    return 'papel';
  } else {
    return 'tesoura';
  }
}

function determinarVencedor(usuario, computador) {
  if (usuario === computador) {
    return 'Empate!';
  }

  if (
    (usuario === 'pedra' && computador === 'tesoura') ||
    (usuario === 'tesoura' && computador === 'papel') ||
    (usuario === 'papel' && computador === 'pedra')
  ) {
    return 'Você venceu!';
  } else {
    return 'Você perdeu!';
  }
}

function jogar() {
  const escolhaUsuario = document.getElementById('escolha').value.toLowerCase();

  if (!['pedra', 'papel', 'tesoura'].includes(escolhaUsuario)) {
    document.getElementById('resultado').innerHTML = 'Escolha inválida. Tente novamente.';
    return; 
  }

  const escolhaDoComputador = escolhaComputador();

  const resultado = determinarVencedor(escolhaUsuario, escolhaDoComputador);
  
  document.getElementById('resultado').innerHTML = 
   `Você escolheu: ${escolhaUsuario}<br>
    O computador escolheu: ${escolhaDoComputador}<br><br>
    ${resultado}`;
}