// TaskSpark — Day 4: UI states wired with temporary fake data.
// Real Gemini extraction logic gets wired in on a later day (replaces FAKE_TASKS / simulateExtraction).

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

// Temporary fake data + fake network delay — stands in for the real /api/extract call.
// Typing "notasks" or "error" into the textarea lets us preview those states today.
function simulateExtraction(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const lower = text.toLowerCase();

      if (lower.includes('error')) {
        reject(new Error('Simulated failure'));
        return;
      }

      if (lower.includes('notasks')) {
        resolve([]);
        return;
      }

      const FAKE_TASKS = [
        { task: 'Send the deck', dueDate: 'Friday' },
        { task: 'Get budget numbers from Raj', dueDate: 'Monday (before meeting)' },
        { task: 'Call the dentist', dueDate: null },
      ];
      resolve(FAKE_TASKS);
    }, 1200);
  });
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
    const tasks = await simulateExtraction(text);

    if (tasks.length === 0) {
      showState(noTasksState);
    } else {
      renderTasks(tasks);
      showState(resultsState);
    }
  } catch (err) {
    showState(errorState);
  } finally {
    extractBtn.disabled = false;
  }
});

// Start on the empty state.
showState(emptyState);