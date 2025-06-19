const apiKey = "6c40d8fae3f27f2dabb6fc78edd4d510";

let filmesNoCarrossel = []; 

// --- Funções de Controle do Modal ---
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        fecharModal();
    }
};

// --- Funções de Rolagem do Carrossel ---

let carrosselElement; 

function scrollEsquerda() {
    if (!carrosselElement) { 
        carrosselElement = document.getElementById('carrossel');
    }
    if (carrosselElement) {
        carrosselElement.scrollBy({ left: -320, behavior: 'smooth' });
    } else {
        console.warn("Elemento 'carrossel' não encontrado para rolagem.");
    }
}

function scrollDireita() {
    if (!carrosselElement) { 
        carrosselElement = document.getElementById('carrossel');
    }
    if (carrosselElement) {
        carrosselElement.scrollBy({ left: 320, behavior: 'smooth' });
    } else {
        console.warn("Elemento 'carrossel' não encontrado para rolagem.");
    }
}

// --- Funções de Busca de Filmes (TMDB) ---
function buscarFilme() {
    const termo = document.getElementById("buscaInput").value.trim();
    if (!termo) {
        alert("Digite o nome de um filme.");
        return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(termo)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => mostrarResultadosBusca(data.results))
        .catch(error => {
            console.error("Erro na busca da API:", error);
            alert("Erro ao buscar filmes na API.");
        });
}

function mostrarResultadosBusca(filmes) {
    const container = document.getElementById("resultadosBusca");
    if (!container) {
        console.error("Elemento 'resultadosBusca' não encontrado.");
        return;
    }

    container.innerHTML = "";

    if (filmes.length === 0) {
        container.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    filmes.slice(0, 5).forEach(filme => {
        const div = document.createElement("div");
        div.classList.add("resultado-filme");

        const posterUrl = filme.poster_path ? `https://image.tmdb.org/t/p/w200${filme.poster_path}` : "https://via.placeholder.com/200x300?text=Sem+Poster";

        div.innerHTML =
            `<img src="${posterUrl}" alt="${filme.title}">
            <div>
                <h3>${filme.title}</h3>
                <p>${filme.overview || "Sem sinopse."}</p>
                <label>Nota (0 a 10): <input type="number" id="nota-${filme.id}" min="0" max="10" step="0.1"></label>
                <button onclick="adicionarAoCarrossel(${filme.id}, '${filme.title.replace(/'/g, "\\'")}', '${posterUrl}')">Adicionar</button>
            </div>`;
        container.appendChild(div);
    });
}

// --- Função para Adicionar ao Carrossel Pessoal ---

function adicionarAoCarrossel(id, titulo, imagemUrl) {
    const notaInput = document.getElementById(`nota-${id}`);
    const nota = parseFloat(notaInput.value);

    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("Digite uma nota válida entre 0 e 10.");
        return;
    }

    // Cria o objeto filme para salvar
    const filmeParaSalvar = {
        id: id,
        titulo: titulo,
        imagemUrl: imagemUrl,
        notaUsuario: nota
    };

    const filmeExistente = filmesNoCarrossel.find(f => f.id === id);
    if (filmeExistente) {
        filmeExistente.notaUsuario = nota;
        alert(`Nota do filme "${titulo}" atualizada para ${nota.toFixed(1)}!`);
    } else {
        filmesNoCarrossel.push(filmeParaSalvar);
        alert(`Filme "${titulo}" adicionado com sucesso ao seu carrossel!`);
    }

    salvarCarrosselNoLocalStorage();
    renderizarCarrosselPessoal();


    // Redirecionar para a aba "Meus Assistidos"
    abrirAba('aba-assistidos'); 

    // Limpar/resetar a aba de buscar filme
    const buscaInput = document.getElementById("buscaInput");
    if (buscaInput) {
        buscaInput.value = ""; 
    }
    const resultadosBuscaContainer = document.getElementById("resultadosBusca");
    if (resultadosBuscaContainer) {
        resultadosBuscaContainer.innerHTML = ""; 
    }
    fecharModal(); 
}

// --- Funções de Persistência com LocalStorage ---

function salvarCarrosselNoLocalStorage() {
    localStorage.setItem('meusFilmesCarrossel', JSON.stringify(filmesNoCarrossel));
}

function carregarCarrosselDoLocalStorage() {
    const filmesSalvos = localStorage.getItem('meusFilmesCarrossel');
    if (filmesSalvos) {
        filmesNoCarrossel = JSON.parse(filmesSalvos);
    } else {
        filmesNoCarrossel = [];
    }
    renderizarCarrosselPessoal();
}

// --- Função para Renderizar o Carrossel Pessoal (HTML) ---
function renderizarCarrosselPessoal() {
    const carrosselPessoalContainer = document.getElementById('carrossel');
    if (!carrosselPessoalContainer) {
        console.error("Elemento 'carrossel' não encontrado para renderizar o carrossel pessoal.");
        return;
    }

    carrosselPessoalContainer.innerHTML = "";

    if (filmesNoCarrossel.length === 0) {
        carrosselPessoalContainer.innerHTML = "<p style='color: #ccc; text-align: center; width: 100%;'>Nenhum filme adicionado ainda.</p>";
        return;
    }

    filmesNoCarrossel.forEach(filme => {
        const novoFilmeElement = document.createElement("div");
        novoFilmeElement.classList.add("carousel-item");
        novoFilmeElement.setAttribute('data-movie-id', filme.id);

        novoFilmeElement.innerHTML = 
            `<img src="${filme.imagemUrl}" alt="${filme.titulo}">
            <p>${filme.titulo}</p>
            <p class="user-note">Minha Nota: ${filme.notaUsuario.toFixed(1)} ⭐</p>
            <button onclick="mostrarInformacoes(${filme.id})">Detalhes</button>
            <button onclick="removerFilmeDoCarrossel(${filme.id})">Remover</button>
            <button><a href="http://google.com/search?q=${encodeURIComponent(filme.titulo + ' trailer youtube')}" target="_blank">▶ Trailer</a></button>`;
        carrosselPessoalContainer.appendChild(novoFilmeElement);
    });
}

// --- Função para Remover Filme do Carrossel ---
function removerFilmeDoCarrossel(id) {
    filmesNoCarrossel = filmesNoCarrossel.filter(filme => filme.id !== id);
    salvarCarrosselNoLocalStorage();
    renderizarCarrosselPessoal();
    alert("Filme removido do carrossel.");
}


// --- Função de Busca no Carrossel Pessoal ---
function buscarFilmeNoCarrossel() {
    const termoBuscaCarrossel = document.getElementById("buscaCarrosselInput").value.trim().toLowerCase();
    const carrosselPessoalContainer = document.getElementById('carrossel');
    if (!carrosselPessoalContainer) {
        console.error("Elemento 'carrossel' não encontrado para busca no carrossel.");
        return;
    }

    carrosselPessoalContainer.innerHTML = "";

    const resultadosFiltrados = filmesNoCarrossel.filter(filme =>
        filme.titulo.toLowerCase().includes(termoBuscaCarrossel)
    );

    if (resultadosFiltrados.length === 0) {
        carrosselPessoalContainer.innerHTML = `<p style='color: #ccc; text-align: center; width: 100%;'>Nenhum filme encontrado no seu carrossel com o termo "${termoBuscaCarrossel}".</p>`;
        return;
    }

    resultadosFiltrados.forEach(filme => {
        const novoFilmeElement = document.createElement("div");
        novoFilmeElement.classList.add("carousel-item");
        novoFilmeElement.setAttribute('data-movie-id', filme.id);

        novoFilmeElement.innerHTML = 
            `<img src="${filme.imagemUrl}" alt="${filme.titulo}">
            <p>${filme.titulo}</p>
            <p class="user-note">Minha Nota: ${filme.notaUsuario.toFixed(1)} ⭐</p>
            <button onclick="mostrarInformacoes(${filme.id})">Detalhes</button>
            <button onclick="removerFilmeDoCarrossel(${filme.id})">Remover</button>
            <button><a href="http://google.com/search?q=${encodeURIComponent(filme.titulo + ' trailer youtube')}" target="_blank">▶ Trailer</a></button>`;
        carrosselPessoalContainer.appendChild(novoFilmeElement);
    });
}


// --- Funções para Detalhes do Filme no Modal de Informações ---
function mostrarInformacoes(id) {
    Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`).then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        }),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=pt-BR`).then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        }),
        fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`).then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
    ])
        .then(([filme, creditos, provedores]) => {
            preencherModal(filme, creditos, provedores);
            abrirModal();
        })
        .catch(error => {
            console.error('Erro ao buscar dados do filme para o modal:', error);
            alert('Não foi possível carregar as informações detalhadas do filme.');
        });
}

function preencherModal(filme, creditos, provedores) {
    const modal = document.getElementById('modal');
    if (!modal) {
        console.error("Elemento com id 'modal' não encontrado.");
        return;
    }

    const diretores = creditos.crew
        .filter(p => p.job === 'Director')
        .map(p => p.name)
        .join(', ') || 'Desconhecido';

    const elenco = creditos.cast
        .slice(0, 3)
        .map(p => p.name)
        .join(', ') || 'Desconhecido';

    const plataformas = (provedores.results?.BR?.flatrate) || [];

    const plataformasHTML = plataformas.map(p =>
        `<img src="https://image.tmdb.org/t/p/w200${p.logo_path}" alt="${p.provider_name}" style="height:40px; margin-right:10px;">`
    ).join('');

    const modalImage = modal.querySelector('.modal-image img');
    if (modalImage) {
        modalImage.src = filme.poster_path ? `https://image.tmdb.org/t/p/w200${filme.poster_path}` : "https://via.placeholder.com/200x300?text=Sem+Poster";
        modalImage.alt = filme.title;
    }

    const modalTitle = modal.querySelector('.modal-info h2');
    if (modalTitle) {
        modalTitle.innerText = filme.title;
    }

    const infoContainer = modal.querySelector('.modal-info .info');
    if (infoContainer) {
        infoContainer.innerHTML = 
            `<p><strong>Adicionado em:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Ano:</strong> ${filme.release_date ? filme.release_date.slice(0, 4) : 'N/D'}</p>
            <p><strong>Duração:</strong> ${filme.runtime ? Math.floor(filme.runtime / 60) + 'h ' + (filme.runtime % 60) + 'min' : 'N/D'}</p>
            <p><strong>Gêneros:</strong> ${filme.genres.map(g => g.name).join(', ')}</p>
            <p><strong>Classificação:</strong> ${filme.adult ? '18+' : 'Livre'}</p>
            <p><strong>Nota:</strong> ⭐ ${filme.vote_average?.toFixed(1)}</p>
            <br>
            <p>${filme.overview || 'Sem sinopse disponível.'}</p>
            <br>
            <p><strong>Direção:</strong> ${diretores}</p>
            <p><strong>Elenco:</strong> ${elenco}</p>
            <br>
            <p><strong>Disponível em:</strong></p>
            <div style="display: flex; align-items: center; flex-wrap: wrap;">${plataformasHTML || 'Nenhum serviço disponível.'}</div>`;
    }
}

// --- Funções de Controle de Abas e Event Listeners (já existentes) ---

function abrirAba(id) {
    document.querySelectorAll(".aba-conteudo").forEach(sec => sec.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");

    document.querySelectorAll('.abasButton').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`abrirAba('${id}')`)) {
            btn.classList.add('ativo');
        } else {
            btn.classList.remove('ativo');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carrosselElement = document.getElementById('carrossel');

    carregarCarrosselDoLocalStorage();

    const botoesAbas = document.querySelectorAll('.abasButton');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesAbas.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');
        });
    });

    const buscarFilmeBtn = document.getElementById('buscarFilmeBtn');
    if (buscarFilmeBtn) {
        buscarFilmeBtn.addEventListener('click', buscarFilme);
    }
    const buscaInput = document.getElementById('buscaInput');
    if (buscaInput) {
        buscaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarFilme();
            }
        });
    }

    const buscarCarrosselBtn = document.getElementById('buscarCarrosselBtn');
    if (buscarCarrosselBtn) {
        buscarCarrosselBtn.addEventListener('click', buscarFilmeNoCarrossel);
    }
    const buscaCarrosselInput = document.getElementById('buscaCarrosselInput');
    if (buscaCarrosselInput) {
        buscaCarrosselInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarFilmeNoCarrossel();
            }
        });
    }

    const scrollEsquerdaBtn = document.getElementById('btn-left');
    const scrollDireitaBtn = document.getElementById('btn-right');
    if (scrollEsquerdaBtn) {
        scrollEsquerdaBtn.addEventListener('click', scrollEsquerda);
    }
    if (scrollDireitaBtn) {
        scrollDireitaBtn.addEventListener('click', scrollDireita);
    }
});