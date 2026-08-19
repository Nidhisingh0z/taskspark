document.getElementById('testBtn').addEventListener('click', async () => {
  const text = document.getElementById('inputText').value;
  const resultEl = document.getElementById('result');
  resultEl.textContent = 'Loading...';

  try {
    const res = await fetch('/api/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    resultEl.textContent = data.message || data.error;
  } catch (err) {
    resultEl.textContent = 'Something went wrong.';
  }
});