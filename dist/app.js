const tasks = [];
let nextId = 1;
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#tasks');
const feedback = document.querySelector('#feedback');

function render() {
  list.replaceChildren();
  for (const task of tasks) {
    const li = document.createElement('li');
    li.classList.toggle('done', task.done);
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => { task.done = checkbox.checked; render(); document.querySelector(`[data-task="${task.id}"] input`).focus(); });
    const text = document.createElement('span');
    text.textContent = task.text;
    label.append(checkbox, text);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'delete';
    button.textContent = 'Delete';
    button.setAttribute('aria-label', `Delete task: ${task.text}`);
    button.addEventListener('click', () => { tasks.splice(tasks.indexOf(task), 1); render(); feedback.textContent = 'Task deleted.'; input.focus(); });
    li.dataset.task = task.id;
    li.append(label, button);
    list.append(li);
  }
  document.querySelector('#empty').hidden = tasks.length > 0;
  const remaining = tasks.filter(t => !t.done).length;
  document.querySelector('#count').textContent = `${remaining} remaining`;
}
function addTask(text) {
  if (typeof text !== 'string' || !text.trim() || text.trim().length > 160) throw new Error('Enter a task between 1 and 160 characters.');
  const task = { id: nextId++, text: text.trim(), done: false };
  tasks.push(task); render(); feedback.textContent = 'Task added.';
  return { ...task };
}
form.addEventListener('submit', event => {
  event.preventDefault();
  try { addTask(input.value); input.value = ''; input.focus(); } catch (error) { feedback.textContent = error.message; }
});
render();
if (document.modelContext?.registerTool) {
  try { Promise.resolve(document.modelContext.registerTool({ name: 'add_task', description: 'Add a task to the visible task list for this page session.', inputSchema: { type: 'object', properties: { text: { type: 'string', minLength: 1, maxLength: 160 } }, required: ['text'], additionalProperties: false }, annotations: { readOnlyHint: false }, execute: data => addTask(data.text) })).catch(() => {}); } catch {}
}
