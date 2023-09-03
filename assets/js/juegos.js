function printTables(tables) {
  let { tablas } = tables.express;
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
