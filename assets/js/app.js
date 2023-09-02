let codigo = "00001000";

let plantillaInformacion = {
  titulo: null,
  fecha_bingo: null,
  hora_bingo: null,
  ex_cant_cart: null,
  ex_cant_num_cart: null,
  ex_num_formas: null,
  tbl_cant_cart: null,
  tbnum_cant_cart: null,
  cantidad_juegos: null,
};

let juegos = {};

function generarCodigo() {
  let formatCodigo = Number(codigo);
  if (formatCodigo >= 1000 && formatCodigo < 10000)
    return `${"0".repeat(4)}${codigo++}`;

  if (formatCodigo >= 10000 && formatCodigo < 100000)
    return `${"0".repeat(3)}${codigo++}`;

  if (formatCodigo >= 100000 && formatCodigo < 1000000)
    return `${"0".repeat(2)}${codigo++}`;

  if (formatCodigo >= 1000000 && formatCodigo < 10000000)
    return `${"0".repeat(1)}${codigo++}`;

  return `${codigo++}`;
}

function randomNumber(maximo, minimo) {
  maximo = Math.floor(maximo);
  minimo = Math.ceil(minimo);
  return Math.floor(Math.random() * (1 + maximo - minimo) + minimo);
}

function verifyData() {
  return (
    Object.values(plantillaInformacion).some((value) => value == null) === false
  );
}

function getDataForm({ value, id }) {
  plantillaInformacion[id] = value ? value : null;
}

function generarPrimerJuego(nombre_pdf, fechaActual) {
  juegos[fechaActual].pdfs.juegos_pdf[nombre_pdf]["express"] = {
    tablas: [],
  };

  let tablasGeneradas = [];
  let { ex_cant_cart, ex_cant_num_cart } = plantillaInformacion;
  for (let cartillas = 0; cartillas < ex_cant_cart; cartillas++) {
    let arrNumeros = [];
    for (let numeros = 0; numeros < ex_cant_num_cart; numeros++) {
      let numero = randomNumber(1, 75);
      if (numero < 10) {
        numero = `0${numero}`;
      }
      numero = numero.toString();
      if (!arrNumeros.includes(numero)) {
        arrNumeros.push(numero);
      } else {
        numeros--;
      }
    }

    tablasGeneradas.push({
      codigo_tabla: generarCodigo(),
      numeros_tabla: [...arrNumeros],
    });
  }

  //   console.log(tablas);

  juegos[fechaActual].pdfs.juegos_pdf[nombre_pdf]["express"]["tablas"] = [
    ...tablasGeneradas,
  ];

  generarSegundoJuego(nombre_pdf, fechaActual);
}

function generarSegundoJuego(nombre_pdf, fechaActual) {
  juegos[fechaActual].pdfs.juegos_pdf[nombre_pdf]["tabla_llena"] = {
    tablas: [],
  };
  let { tbl_cant_cart } = plantillaInformacion;

  let tablasGeneradas = [];
  for (let cantidad = 0; cantidad < tbl_cant_cart; cantidad++) {
    let objBingo = { B: [], I: [], N: [], G: [], O: [] };
    let minimo = 1;
    let maximo = 0;
    for (let letra in objBingo) {
      let arrNumeros = new Array();
      maximo = maximo + 15;
      for (let cant_numeros = 0; cant_numeros < 5; cant_numeros++) {
        if (letra === "N" && cant_numeros === 2) {
          arrNumeros.push("00");
          continue;
        }
        let numeroRandom = randomNumber(minimo, maximo);
        if (letra == "B") {
          if (numeroRandom < 10) numeroRandom = `0${numeroRandom}`;
        }

        numeroRandom = numeroRandom.toString();
        if (!arrNumeros.includes(numeroRandom)) {
          arrNumeros.push(numeroRandom);
        } else {
          cant_numeros--;
        }
      }
      minimo = maximo + 1;
      objBingo[letra] = arrNumeros;
    }

    tablasGeneradas.push({
      codigo_tabla: generarCodigo(),
      juego_generado: { ...objBingo },
    });
  }
  juegos[fechaActual].pdfs.juegos_pdf[nombre_pdf]["tabla_llena"]["tablas"] = [
    ...tablasGeneradas,
  ];
}

function generarNombrePDF(cantidad) {
  let nombrePdf = "";
  if (cantidad < 10) nombrePdf = `pdf_${"0".repeat(5)}${cantidad}`;
  if (cantidad >= 10 && cantidad < 100)
    nombrePdf = `pdf_${"0".repeat(4)}${cantidad}`;
  if (cantidad >= 100 && cantidad < 1000)
    nombrePdf = `pdf_${"0".repeat(3)}${cantidad}`;
  if (cantidad >= 1000 && cantidad < 10000)
    nombrePdf = `pdf_${"0".repeat(2)}${cantidad}`;
  if (cantidad >= 10000 && cantidad < 100000) nombrePdf = `pdf_0${cantidad}`;
  return nombrePdf;
}

function generateGames(cantidad_juegos, fechaActual) {
  for (let cantidad = 1; cantidad <= cantidad_juegos; cantidad++) {
    let nombrePdf = generarNombrePDF(cantidad);
    juegos[fechaActual].pdfs.juegos_pdf[nombrePdf] = {};
    generarPrimerJuego(nombrePdf, fechaActual);
  }

  console.log(juegos);
}

function setInformacionGeneral(e) {
  let { titulo, fecha_bingo, hora_bingo, ex_num_formas, cantidad_juegos } =
    plantillaInformacion;
  if (verifyData()) {
    const fechaActual = new Date().getTime();
    if (!juegos.hasOwnProperty(fechaActual)) {
      juegos[fechaActual] = {
        info_general: {
          titulo,
          fecha_bingo,
          hora_bingo,
        },
        pdfs: {
          config: {
            forma_figuras_express: ex_num_formas,
            cantidad_juegos_generados: cantidad_juegos,
          },
          juegos_pdf: {},
        },
      };
      generateGames(cantidad_juegos, fechaActual);
    } else {
      alert("Cuidado ya existe un juego generado");
    }
  }
}

function loadListeners() {
  document.querySelector("#form").addEventListener("change", (e) => {
    getDataForm(e.target);
  });

  document.querySelector("#btnGenerar").addEventListener("click", (e) => {
    setInformacionGeneral(e);
  });
}

loadListeners();
