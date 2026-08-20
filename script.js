// TaskSpark — Day 5: wired to the real /api/extract endpoint.

const inputText = document.getElementById('inputText');
const inputWarning = document.getElementById('inputWarning');
const extractBtn = document.getElementById('extractBtn');

const emptyState = document.getElementById('emptyState');
const loadingState = document.getElementById('loadingState');
const resultsState = document.getElementById('resultsState');
const noTasksState = document.getElementById('noTasksState');
const errorState = document.getElementById('errorState');
const taskList = document.getElementById('taskList');

const ALL_STATES = [emptyState, loadingState, resultsState, noTasksState, errorState];

function showState(stateToShow) {
  ALL_STATES.forEach((state) => {
    state.classList.toggle('hidden', state !== stateToShow);
  });
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const card = document.createElement('div');
    card.className = 'task-card';

    const taskTextEl = document.createElement('span');
    taskTextEl.className = 'task-text';
    taskTextEl.textContent = task.task;

    const dateEl = document.createElement('span');
    dateEl.className = 'date-pill' + (task.dueDate ? '' : ' no-date');
    dateEl.textContent = task.dueDate ? `Due: ${task.dueDate}` : 'No date';

    card.appendChild(taskTextEl);
    card.appendChild(dateEl);
    taskList.appendChild(card);
  });
}

async function extractTasks(text) {
  const res = await fetch('/api/extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong.');
  }

  return data.tasks;
}

extractBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();

  if (!text) {
    inputWarning.classList.remove('hidden');
    return;
  }
  inputWarning.classList.add('hidden');

  extractBtn.disabled = true;
  showState(loadingState);

  try {
    const tasks = await extractTasks(text);

    if (tasks.length === 0) {
      showState(noTasksState);
    } else {
      renderTasks(tasks);
      showState(resultsState);
    }
  } catch (err) {
    console.error(err);
    showState(errorState);
  } finally {
    extractBtn.disabled = false;
  }
});

// Start on the empty state.
showState(emptyState);