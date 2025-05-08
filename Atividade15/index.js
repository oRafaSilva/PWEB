function validar(e) {
    e.preventDefault();
    const f = document.nomeform.elements;

    if (f["nome"].value.length < 10) {
        alert("Nome deve ter pelo menos 10 caracteres.");
        return;
    }

    if (f["comentario"].value.length < 20) {
        alert("Comentário deve ter pelo menos 20 caracteres.");
        return;
    }

    const pesquisa = [...document.getElementsByName("pesquisa")];
    const selecionado = pesquisa.find(p => p.checked);

    if (!selecionado) {
        alert("Que bom que você voltou a visitar esta página!");
    } else {
        alert("Volte sempre à esta página!");
    }

    document.nomeform.submit();
}