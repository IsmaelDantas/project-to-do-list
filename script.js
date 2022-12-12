const listContainer = document.getElementById('lista-tarefas');

function createTask() {
  const getTask = document.getElementById('texto-tarefa');
  const task = document.createElement('li');
  task.innerHTML = getTask.value;
  getTask.value = '';
  listContainer.appendChild(task);
}

const btnTask = document.getElementById('criar-tarefa');
btnTask.addEventListener('click', createTask);

function selectTask(task) {
  const tasksList = document.querySelectorAll('li');
  const taskSelected = task.target;
  for (let index = 0; index < tasksList.length; index += 1) {
    if (tasksList[index].className.includes('selected')) {
      tasksList[index].classList.remove('selected');
    }
  }
  if (taskSelected.id !== listContainer.id) {
    taskSelected.className += ' selected';
  }
}

listContainer.addEventListener('click', selectTask);

function completeTask(event) {
  const taskSelected = event.target;
  if (
    taskSelected !== listContainer.id && taskSelected.className.includes('completed')
  ) {
    taskSelected.classList.remove('completed');
  } else if (taskSelected !== listContainer.id) {
    taskSelected.className += ' completed';
  }
}

listContainer.addEventListener('dblclick', completeTask);

const btnClear = document.getElementById('apaga-tudo');

btnClear.addEventListener('click', () => {
  const listRemove = document.querySelectorAll('li');
  for (let index = 0; index < listRemove.length; index += 1) {
    const taskRemove = listRemove[index];
    listContainer.removeChild(taskRemove);
  }
});

const btnClearCompleted = document.getElementById('remover-finalizados');

btnClearCompleted.addEventListener('click', () => {
  const listRemove = document.querySelectorAll('li');
  for (let index = 0; index < listRemove.length; index += 1) {
    const taskRemove = listRemove[index];

    if (taskRemove.className.includes('completed')) {
      listContainer.removeChild(taskRemove);
    }
  }
});

function saveList() {
  const listSave = document.querySelectorAll('li');
  const taskSave = [];
  for (let index = 0; index < listSave.length; index += 1) {
    taskSave.push(listSave[index].outerHTML);
  }
  localStorage.setItem('taskList', JSON.stringify(taskSave));
}

window.onload = () => {
  if (localStorage.length !== 0) {
    const taskList = JSON.parse(localStorage.getItem('taskList'));
    console.log(taskList);
    for (let index = 0; index < taskList.length; index += 1) {
      const task = taskList[index];
      listContainer.innerHTML += task;
    }
  }
};

const btnSaveList = document.getElementById('salvar-tarefas');

btnSaveList.addEventListener('click', saveList);

function moveUp() {
  const selectedTask = document.querySelector('.selected');
  if (selectedTask !== null) {
    const upTask = document.querySelector('.selected').previousElementSibling;
    const switchTask = selectedTask.innerHTML;
    if (selectedTask !== listContainer.firstElementChild) {
      selectedTask.innerHTML = upTask.innerHTML;
      upTask.innerHTML = switchTask;
      upTask.classList.add('selected');
      selectedTask.classList.remove('selected');
    }
  }
}

const btnUp = document.getElementById('mover-cima');

btnUp.addEventListener('click', moveUp);

function moveDown() {
  const selectedTask = document.querySelector('.selected');
  if (selectedTask !== null) {
    const downTask = document.querySelector('.selected').nextElementSibling;
    const switchTask = selectedTask.innerHTML;
    if (selectedTask !== listContainer.lastElementChild) {
      selectedTask.innerHTML = downTask.innerHTML;
      downTask.innerHTML = switchTask;
      downTask.classList.add('selected');
      selectedTask.classList.remove('selected');
    }
  }
}

const btnDown = document.getElementById('mover-baixo');

btnDown.addEventListener('click', moveDown);

function removeSelected() {
  const selectedTask = document.querySelector('.selected');
  listContainer.removeChild(selectedTask);
}

const btnRemove = document.getElementById('remover-selecionado');

btnRemove.addEventListener('click', removeSelected);