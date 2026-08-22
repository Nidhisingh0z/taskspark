// TaskSpark — Day 8: production hardening (offline detection, malformed-data safety, rate-limit messaging).

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
const errorMessage = document.getElementById('errorMessage');
const taskList = document.getElementById('taskList');

const ALL_STATES = [emptyState, loadingState, resultsState, noTasksState, errorState];
const MAX_LENGTH = 5000;

const DEFAULT_ERROR_MESSAGE = 'Something went wrong extracting your tasks. Please try again.';
const OFFLINE_ERROR_MESSAGE = 'You appear to be offline. Please check your connection and try again.';
const RATE_LIMIT_ERROR_MESSAGE = 'Too many requests right now — please wait a moment and try again.';

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

  // Defensive: only render tasks with a valid, non-empty task string.
  // Malformed items are already filtered server-side, but this is a second
  // safety net so the UI never shows "undefined" or a blank card.
  const validTasks = tasks.filter(
    (t) => t && typeof t.task === 'string' && t.task.trim() !== ''
  );

  validTasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.style.animationDelay = `${index * 60}ms`;

    const taskTextEl = document.createElement('span');
    taskTextEl.className = 'task-text';
    taskTextEl.textContent = task.task;

    const hasDate = typeof task.dueDate === 'string' && task.dueDate.trim() !== '';
    const dateEl = document.createElement('span');
    dateEl.className = 'date-pill' + (hasDate ? '' : ' no-date');
    dateEl.textContent = hasDate ? `Due: ${task.dueDate}` : 'No date';

    card.appendChild(taskTextEl);
    card.appendChild(dateEl);
    taskList.appendChild(card);
  });

  return validTasks.length;
}

async function extractTasks(text) {
  const res = await fetch('/api/extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error(RATE_LIMIT_ERROR_MESSAGE);
    }
    throw new Error(data.error || DEFAULT_ERROR_MESSAGE);
  }

  return Array.isArray(data.tasks) ? data.tasks : [];
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

  // Fail fast with a clear message if the browser already knows it's offline,
  // rather than waiting for a slow network timeout.
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    errorMessage.textContent = OFFLINE_ERROR_MESSAGE;
    showState(errorState);
    return;
  }

  setLoadingButton(true);
  showState(loadingState);

  try {
    const tasks = await extractTasks(text);
    const renderedCount = renderTasks(tasks);

    if (renderedCount === 0) {
      showState(noTasksState);
    } else {
      showState(resultsState);
    }
  } catch (err) {
    console.error(err);
    errorMessage.textContent = err.message || DEFAULT_ERROR_MESSAGE;
    showState(errorState);
  } finally {
    setLoadingButton(false);
  }
});

// Start on the empty state.
showState(emptyState);
updateCharCount();