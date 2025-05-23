// Abrir e fechar o modal (janela sobreposta)
function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// Fecha o modal ao clicar fora
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    fecharModal();
  }
}


// Botões de rolagem
const carrossel = document.getElementById('carrossel');

function scrollEsquerda() {
  carrossel.scrollBy({ left: -320, behavior: 'smooth' });
}

function scrollDireita() {
  carrossel.scrollBy({ left: 320, behavior: 'smooth' });
}