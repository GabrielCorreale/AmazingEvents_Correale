var texto = ""
var checkBoxSelector = [];
let arrayEventos = data.eventos
var id = 1
arrayEventos.map(evento => evento.id = id++)

let unArray = data.eventos
let eventos = data.fechaActual

console.log(eventos)
console.log(unArray)

let contenedorTarjetas = document.getElementById('contenedorTarjetas');
console.log(contenedorTarjetas)

var templateTarjeta = "";
function mostrarTarjetas(unArray) {

  templateTarjeta = "";
  if (unArray.length > 0) {
    for (let i = 0; i < unArray.length; i++) {
      if (unArray[i].date < data.fechaActual) {
        templateTarjeta += `
      <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem; height: 24rem;">
      <img src= "${unArray[i].image}" style="height: 8rem"  class="card-img-top" alt="Cinema">
      <div class="card-body ">
        <h5 class="card-title">${unArray[i].name}</h5>
        <p class="card-text">${unArray[i].description}</p>
      <div class="vermas d-flex justify-content-evenly">
         <p class="mb-0 m-1">Price: $${unArray[i].price}</p>
         <a href="./details.html?id=${unArray[i].id}" class="btn btn-primary">Details</a>
      </div>
      </div>
      </div>`


        contenedorTarjetas.innerHTML = templateTarjeta;
      }
    }
  }
  else {
    contenedorTarjetas.innerHTML = `<h3 id="formulario">No se ha encontrado resultado que coincida con ningun evento.</h3>`;
    console.log(contenedorTarjetas);
  }

}


//Checkbox---------------------------------


function imprimir() {
  var checks = document.getElementById("checks")
  var checkbox = data.eventos.map(eventos => eventos.category)
  var noRepetidas = new Set(checkbox);
  var categorias = [...noRepetidas]
  var imprimirCheckbox = "";
  categorias.forEach(categorias => {
    imprimirCheckbox += `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${categorias}">
    <label class="form-check-label" for="inlineCheckbox1">${categorias}</label>
  </div>`

    checks.innerHTML = imprimirCheckbox;
  })
}
imprimir()

var checkBoxSelector = [];
var checkbox = document.querySelectorAll('input[type=checkbox]');
checkbox.forEach(check => check.addEventListener("click", (event) => {
  var checked = event.target.checked
  if (checked) {
    checkBoxSelector.push(event.target.value)
    filtrador()
  } else {
    checkBoxSelector = checkBoxSelector.filter(uncheck => uncheck !== event.target.value)
  } filtrador()

}))

var buscador = document.querySelector("#search")
buscador.addEventListener("keyup", (event) => {
  texto = event.target.value
  filtrador()
  console.log(texto)
})

function filtrador() {
  var datos = [];
  if (checkBoxSelector.length > 0 && texto !== "") {
    checkBoxSelector.map(selected => {
      datos.push(...data.eventos.filter(evento => evento.name.toLowerCase().includes
        (texto.trim().toLowerCase()) && evento.category == selected))
    })
  } else if (checkBoxSelector.length > 0 && texto === "") {
    checkBoxSelector.map(selected => {
      datos.push(...data.eventos.filter(eventos => eventos.category == selected))

    })
  } else if (checkBoxSelector.length == 0 && texto !== "") {
    datos.push(...data.eventos.filter(evento => evento.name.toLowerCase().includes
      (texto.trim().toLowerCase())))
  }
  else {
    datos.push(...data.eventos)
  }
  console.log(checkBoxSelector);
  mostrarTarjetas(datos);
}
filtrador()