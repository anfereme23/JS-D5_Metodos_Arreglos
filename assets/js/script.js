const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const cuentaTareasT = document.querySelector("#total")
const cuentaTareasR = document.querySelector("#realizadas")
const listaTareas = document.querySelector("#tableBody")
let id = 40

const tareas = [
  { id: 10, descripcion: "Estudiar JavaScript", estado: false },
  { id: 20, descripcion: "Estudiar Python", estado: false },
  { id: 30, descripcion: "Ir al Gym", estado: false },
  { id: 40, descripcion: "Jugar Futbol", estado: false },
]

function contarRealizadas() {
  let contador = 0
  tareas.forEach((tarea) => {
    if (tarea.estado === true) {
      contador += 1
    }
  })
  cuentaTareasR.textContent = contador
}

renderTareas()

/* Actualizamos la información en el HTML */
function renderTareas() {
  let html = ""
  for (let tarea of tareas) {
    if (tarea.estado === false) {
      html += `
<tr>
<td>${tarea.id}</td>
<td>${tarea.descripcion}</td>
<td><button class="btn btn-secondary" onclick="modificar(${tarea.id})"> Cambiar </button></td>
<td><button class="btn btn-danger" onclick="borrar(${tarea.id})"> X </button></td>
</tr>`
    } else {
      html += `
    <tr>
    <td>${tarea.id}</td>
    <td style="text-decoration: line-through">${tarea.descripcion}</td>
    <td><button class="btn btn-secondary" onclick="modificar(${tarea.id})"> Completado </button></td>
    <td><button class="btn btn-danger" onclick="borrar(${tarea.id})"> X </button></td>
    </tr>`
    }
  }
  listaTareas.innerHTML = html
  cuentaTareasT.textContent = `${tareas.length}`
  contarRealizadas()
}

/* Agregar una tarea */
btnAgregar.addEventListener("click", () => {
  id += 10
  const nuevaTarea = { id: id, descripcion: tareaInput.value, estado: false }
  tareas.push(nuevaTarea)
  tareaInput.value = "" /* Vaciamos el input */
  renderTareas()
})

/* Borrar una tarea */
function borrar(id) {
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas.splice(index, 1)
  renderTareas()
}

/* modfiicar el estado de una tarea */
function modificar(id) {
  const index = tareas.findIndex((ele) => ele.id == id)
  if (tareas[index].estado === false) {
    tareas.splice(index, 1, {
      id: tareas[index].id,
      descripcion: tareas[index].descripcion,
      estado: true,
    });
  } else {
    tareas.splice(index, 1, {
      id: tareas[index].id,
      descripcion: tareas[index].descripcion,
      estado: false,
    })
  }
  renderTareas()
}
