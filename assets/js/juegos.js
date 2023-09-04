function printJuegoNumeros(tables) {
  let { tablas } = tables.juego_numeros;
  console.log(tablas);
}

function printTablasLlena(tables) {
  let { tablas } = tables.tabla_llena;
  console.log(tables);
  let containerJuegoNumeros = document.querySelector("#juegoNumeros");
  containerJuegoNumeros.innerHTML = "";

  for (let tabla of tablas) {
    const divTablaLLena = document.createElement("div");
    const divCodigoLleno = document.createElement("div");
    const parrafoCodigo = document.createElement("p");
    divTablaLLena.className = "tablaLlena";
    divCodigoLleno.className = "codigoLleno";
    parrafoCodigo.innerHTML = tabla.codigo_tabla;

    const divLlenoNumeros = document.createElement("div");
    divLlenoNumeros.className = "llenoNumeros";
    const divNumerosHeader = document.createElement("div");
    divNumerosHeader.className = "numerosHeader";

    let { posiciones } = tabla;
    const numeroContent = document.createElement("div");
    numeroContent.className = "numerosContent";

    for (let key of ["B", "I", "N", "G", "O"]) {
      const divKey = document.createElement("div");
      divKey.innerHTML = key;
      divNumerosHeader.appendChild(divKey);
    }

    for (let i = 0; i < posiciones; i++) {
      console.log(posiciones[i]);
    }

    divLlenoNumeros.appendChild(divNumerosHeader);
    divLlenoNumeros.appendChild(numeroContent);
    divCodigoLleno.appendChild(parrafoCodigo);
    divTablaLLena.appendChild(divCodigoLleno);
    divTablaLLena.appendChild(divLlenoNumeros);

    containerJuegoNumeros.appendChild(divTablaLLena);
  }

  printJuegoNumeros(tables);
}

function printTables(tables) {
  let { tablas } = tables.express;
  // console.log(tables);
  //   PrintExpress
  let containerExpress = document.querySelector("#juegoExpress");
  containerExpress.innerHTML = "";
  for (let tabla of tablas) {
    const divTabla = document.createElement("div");
    divTabla.className = "tabla";
    const divTablaCodigo = document.createElement("div");
    divTablaCodigo.className = "tablaCodigo";
    const parrafoCodigo = document.createElement("p");
    parrafoCodigo.innerHTML = tabla.codigo_tabla;

    divTablaCodigo.appendChild(parrafoCodigo);
    const divTablaNumeros = document.createElement("div");
    divTablaNumeros.className = "tablaNumeros";
    for (let numero of tabla.numeros_tabla) {
      const numeroTabla = document.createElement("div");
      numeroTabla.className = "numero_tabla";
      numeroTabla.innerHTML = numero;
      divTablaNumeros.appendChild(numeroTabla);
    }

    divTabla.appendChild(divTablaCodigo);
    divTabla.appendChild(divTablaNumeros);

    containerExpress.appendChild(divTabla);
  }

  printTablasLlena(tables);
}

function fillSelectPDF(keys, juegos_pdf) {
  let selectPDFS = document.querySelector("#select_pdf");
  selectPDFS.innerHTML = "";
  for (let key of keys) {
    const option = document.createElement("option");
    option.setAttribute("value", key);
    option.innerHTML = key;
    selectPDFS.appendChild(option);
  }

  selectPDFS.addEventListener("change", (e) => {
    let { value } = e.target;
    printTables(juegos_pdf[value]);
  });
}

function filterKeys(value, dataStorage) {
  let { juego_generado_data } = dataStorage;
  let { juegos_pdf } = dataStorage[juego_generado_data].pdfs;
  let arrayKeyPDF = Object.keys(juegos_pdf);
  let arrayFiltrado = [];
  switch (value) {
    case "1_100":
      arrayFiltrado = [...arrayKeyPDF].splice(0, 100);
      fillSelectPDF(arrayFiltrado, juegos_pdf);
      break;
    case "101_200":
      arrayFiltrado = [...arrayKeyPDF].splice(100, 100);
      fillSelectPDF(arrayFiltrado, juegos_pdf);
      break;
    case "201_300":
      arrayFiltrado = [...arrayKeyPDF].splice(200, 100);
      fillSelectPDF(arrayFiltrado, juegos_pdf);
      break;
    case "301_400":
      arrayFiltrado = [...arrayKeyPDF].splice(300, 100);
      fillSelectPDF(arrayFiltrado, juegos_pdf);
      break;
  }
}

function loadListeners(dataStorage) {
  document.querySelector("#select_rango").addEventListener("change", (e) => {
    let { value } = e.target;

    filterKeys(value, dataStorage);
  });
}

function getDataLocal() {
  let dataStorage = localStorage.getItem("bingo_data");
  if (dataStorage) {
    dataStorage = JSON.parse(dataStorage);
  }

  loadListeners(dataStorage);
}

addEventListener("DOMContentLoaded", () => {
  getDataLocal();
});
