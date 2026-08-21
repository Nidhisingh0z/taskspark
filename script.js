// TaskSpark — Day 7: UX polish (char counter, button spinner, staggered animation, ARIA support).

const inputText = document.getElementById('inputText');
const inputWarning = document.getElementById('inputWarning');
const charCount = document.getElementById('charCount');
const extractBtn = document.getElementById('extractBtn');
const btnLabel = extractBtn.querySelector('.btn-label');
const btnSpinner = extractBtn.querySelector('.btn-spinner');

const emptyState = document.getElementById('emptyState');
const loadingState = document.getElementById('loadingState');
const resultsState = document.getElementById('resultsState');
const noTasksState = document.getElementById('noTasksState');
const errorState = document.getElementById('errorState');
const taskList = document.getElementById('taskList');

const ALL_STATES = [emptyState, loadingState, resultsState, noTasksState, errorState];
const MAX_LENGTH = 5000;

function showState(stateToShow) {
  ALL_STATES.forEach((state) => {
    state.classList.toggle('hidden', state !== stateToShow);
  });
}

function updateCharCount() {
  const len = inputText.value.length;
  charCount.textContent = `${len.toLocaleString()} / ${MAX_LENGTH.toLocaleString()}`;
  charCount.classList.toggle('near-limit', len > MAX_LENGTH * 0.9);
}

inputText.addEventListener('input', updateCharCount);

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.style.animationDelay = `${index * 60}ms`;

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

function setLoadingButton(isLoading) {
  extractBtn.disabled = isLoading;
  btnLabel.textContent = isLoading ? 'Extracting...' : 'Extract Tasks';
  btnSpinner.classList.toggle('hidden', !isLoading);
}

extractBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();

  if (!text) {
    inputWarning.classList.remove('hidden');
    inputText.focus();
    return;
  }
  inputWarning.classList.add('hidden');

  setLoadingButton(true);
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
    setLoadingButton(false);
  }
});

// Start on the empty state.
showState(emptyState);
updateCharCount();