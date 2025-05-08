function abrirCurso(select) {
    const curso = select.value;

    if (curso === "") return;

    const confirmar = confirm("Deseja abrir informações sobre o curso de " + curso + "?");

    if (confirmar) {
      let conteudo = `
        <html>
          <head><title>${curso}</title></head>
          <body>
            <h2>Curso de ${curso}</h2>
            <p>Bem-vindo ao curso de ${curso} da Fatec Sorocaba!</p>
            <p>Mais informações em breve...</p>
          </body>
        </html>
      `;

      let novaJanela = window.open("", "_blank", "width=600,height=300");
      novaJanela.document.write(conteudo);
      novaJanela.document.close();
    }
  }