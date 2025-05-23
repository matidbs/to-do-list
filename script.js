let listTasks = []; // Arreglo para almacenar las tareas

function addTask(event) { 
event.preventDefault(); // Evita que el formulario recargue la página

  const input = document.getElementById('nueva-tarea');
  const lista = document.getElementById('lista-tareas');
  const texto = input.value.trim();

  if (texto === '') return; // No hacer nada si está vacío

    localStorage.setItem('tarea', texto); // Guardar la tarea en localStorage

  // Crear elementos
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between bg-gray-900 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200';

  const span = document.createElement('span');
  span.className = 'truncate text-white';
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
  });
  


 /* const botonCheck = document.createElement('button');
  botonCheck.className = 'check-btn p-1 rounded hover:bg-green-600 transition';
  botonCheck.title = 'Completar';
  botonCheck.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-400 hover:text-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  `;
  botonCheck.addEventListener('click', () => {
    span.classList.toggle('line-through');
    span.classList.toggle('text-gray-400');
  });
*/
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

//let taskExists(task);

document.getElementById('formulario-tarea').addEventListener('submit', addTask);