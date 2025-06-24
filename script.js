let listTasks = []; 
const mensajeError = "¡Palabra muy larga! No puede tener más de 25 caracteres";
const colorError = 'red'; 

class task{
  constructor(text) {
    this.text = text;
    this.check = false; // Por defecto, la tarea no está completada 
  }
  toggleCheck() {
    this.check = !this.check; // Cambia el estado de completado
  }
  toString() {
    return this.text; // Devuelve el texto de la tarea
  }
}

function mostrarMensajeError() {
  const toast = document.getElementById('toast');
  toast.className = `fixed top-6 left-1/2 transform -translate-x-1/2 bg-${colorError}-600 max-w-md text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2`;
  toast.classList.remove('hidden');
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
    </svg>
    <span>${mensajeError}</span>
  `;


  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

function addTask(event) { 
event.preventDefault(); // Evita que el formulario recargue la página

  const input = document.getElementById('nueva-tarea');
  const lista = document.getElementById('lista-tareas');
  const texto = input.value.trim();

  if (texto === '') return; // No hacer nada si está vacío

  //Evaluo la longitud de las palabras para que no rompa todo 
  const palabrasTexto = texto.split(' ');
  for(const palabra of palabrasTexto) {
    if (palabra.length > 25){
      mostrarMensajeError();
      return;
    }
      
  }
  
  // Guardar la tarea en localStorage
  let tarea = new task(texto);
  listTasks.push(tarea);
  localStorage.setItem('tarea', JSON.stringify(listTasks));

  // Crear elementos
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between bg-gray-900 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200';

  const span = document.createElement('span');
  span.className = 'break-words text-white';
  span.textContent = texto;

  const botonEliminar = document.createElement('button');
  botonEliminar.className = 'p-1 rounded hover:bg-red-500 transition';
  botonEliminar.title = 'Eliminar';
  botonEliminar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
  `;
  botonEliminar.addEventListener('click', () => li.remove());
  botonEliminar.addEventListener('click', () => localStorage.removeItem('tarea')); // Eliminar la tarea de localStorage

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'form-checkbox h-6 w-6 accent-green-500';
  checkbox.title = 'Completar';
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      span.classList.add('line-through', 'text-gray-400');
    } else {
      span.classList.remove('line-through', 'text-gray-400');
    }
    tarea.toggleCheck(); // Cambia el estado de la tarea
    listTasks.find(t => t.text === texto).check = tarea.check; // Actualiza el estado en el arreglo
    localStorage.setItem('tarea', JSON.stringify(listTasks)); // Guardar cambios en localStorage
  });
    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'flex items-center gap-3'; // Los agrupa y les da espacio uniforme
    //contenedorBotones.appendChild(botonCheck);
    contenedorBotones.appendChild(checkbox);
    contenedorBotones.appendChild(botonEliminar);

  // Agregar elementos
  li.appendChild(span);
  li.appendChild(contenedorBotones);
  lista.appendChild(li);

  input.value = ''; // Limpiar input

}

function loadTasks() {
  const lista = document.getElementById('lista-tareas');
  const tareasGuardadas = JSON.parse(localStorage.getItem('tarea')) || [];

  if (!tareasGuardadas.length) return;

  listTasks = tareasGuardadas.map(t => Object.assign(new task(), t));

  listTasks.forEach(tarea => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between bg-gray-900 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200';

    const span = document.createElement('span');
    span.className = 'break-words text-white';
    span.textContent = tarea.text; // mostrar texto correcto

    const botonEliminar = document.createElement('button');
  botonEliminar.className = 'p-1 rounded hover:bg-red-500 transition';
  botonEliminar.title = 'Eliminar';
  botonEliminar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
  `;
    botonEliminar.addEventListener('click', () => {
      li.remove();
      const index = listTasks.indexOf(tarea);
      if (index !== -1) {
        listTasks.splice(index, 1);
        localStorage.setItem('tarea', JSON.stringify(listTasks));
      }
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-checkbox h-6 w-6 accent-green-500';
    checkbox.title = 'Completar';

    // Marcar checkbox si la tarea está completada
    checkbox.checked = tarea.check;
    if (checkbox.checked) {
      span.classList.add('line-through', 'text-gray-400');
    }

    checkbox.addEventListener('click', () => {
      tarea.toggleCheck(); // Cambiar estado en el objeto
      if (checkbox.checked) {
        span.classList.add('line-through', 'text-gray-400');
      } else {
        span.classList.remove('line-through', 'text-gray-400');
      }
      // Guardar cambios en localStorage
      localStorage.setItem('tarea', JSON.stringify(listTasks));
    });

    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'flex items-center gap-3';
    contenedorBotones.appendChild(checkbox);
    contenedorBotones.appendChild(botonEliminar);

    li.appendChild(span);
    li.appendChild(contenedorBotones);
    lista.appendChild(li);
  });
}

window.addEventListener('load', loadTasks); // Cargar tareas al iniciar
document.getElementById('formulario-tarea').addEventListener('submit', addTask);