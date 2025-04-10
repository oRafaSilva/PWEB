function maiorNumero(a, b, c) {
    return Math.max(a, b, c);
  }
   
  function mostrarMaior() {
    const n1 = parseFloat(document.getElementById('num1').value);
    const n2 = parseFloat(document.getElementById('num2').value);
    const n3 = parseFloat(document.getElementById('num3').value);
    const maior = maiorNumero(n1, n2, n3);
    document.getElementById('resultadoMaior').innerText = `Maior número: ${maior}`;
  }
   
  function ordenarNumeros(a, b, c) {
    let numeros = [a, b, c];
    numeros.sort((x, y) => x - y);
    return numeros;
  }
   
  function mostrarOrdem() {
    const o1 = parseFloat(document.getElementById('ord1').value);
    const o2 = parseFloat(document.getElementById('ord2').value);
    const o3 = parseFloat(document.getElementById('ord3').value);
    const ordenados = ordenarNumeros(o1, o2, o3);
    document.getElementById('resultadoOrdem').innerText = `Ordem crescente: ${ordenados.join(', ')}`;
  }
   
  function ehPalindromo(texto) {
    const frase = texto.toUpperCase().replace(/\s+/g, '');
    const reverso = frase.split('').reverse().join('');
    return frase === reverso;
  }
   
  function verificarPalindromo() {
    const entrada = document.getElementById('texto').value;
    const resultado = ehPalindromo(entrada);
    if (resultado) {
      document.getElementById('resultadoPalindromo').innerText = `"${entrada}" é um palíndromo.`;
    } else {
      document.getElementById('resultadoPalindromo').innerText = `"${entrada}" não é um palíndromo.`;
    }
  }
   
  function tipoTriangulo(ladoA, ladoB, ladoC) {
    if (ladoA + ladoB > ladoC && ladoA + ladoC > ladoB && ladoB + ladoC > ladoA) {
      if (ladoA === ladoB && ladoB === ladoC) {
        return "Triângulo Equilátero";
      } else if (ladoA === ladoB || ladoA === ladoC || ladoB === ladoC) {
        return "Triângulo Isósceles";
      } else {
        return "Triângulo Escaleno";
      }
    } else {
      return "Não formam um triângulo";
    }
  }
   
  function verificarTriangulo() {
    const l1 = parseFloat(document.getElementById('lado1').value);
    const l2 = parseFloat(document.getElementById('lado2').value);
    const l3 = parseFloat(document.getElementById('lado3').value);
    const tipo = tipoTriangulo(l1, l2, l3);
    document.getElementById('resultadoTriangulo').innerText = tipo;
  }