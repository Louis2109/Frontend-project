// Definitions
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filters = document.querySelector('.filters');
const emptyState = document.getElementById('empty-state');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let todos = [];
let filter = 'all';

// ----- THEME LOGIC -----
const THEMES = {
  light: {
    icon: '🌙',
    label: 'Switch to dark mode'
  },
  dark: {
    icon: '☀️',
    label: 'Switch to light mode'
  }
};

function getSavedTheme() {
  return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  themeIcon.textContent = THEMES[theme].icon;
  themeToggle.setAttribute('title', THEMES[theme].label);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
}

themeToggle.addEventListener('click', toggleTheme);

// Set theme on load
window.addEventListener('DOMContentLoaded', () => {
  setTheme(getSavedTheme());
});

// ----- TODO LOGIC -----

// Load todos from localStorage
window.onload = function () {
  const stored = localStorage.getItem('todos');
  if (stored) todos = JSON.parse(stored);
  render();
};

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text.length === 0) return;
  todos.push({ text, completed: false, id: Date.now() });
  input.value = '';
  saveTodos();
  render();
});

filters.addEventListener('click', e => {
  if (!e.target.matches('button')) return;
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  filter = e.target.dataset.filter;
  render();
});

list.addEventListener('click', e => {
  const id = Number(e.target.closest('.todo-item')?.dataset.id);
  if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    render();
  } else if (e.target.classList.contains('todo-checkbox')) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    render();
  }
});

function render() {
  list.innerHTML = '';
  let filtered = todos;
  if (filter === 'active') filtered = todos.filter(todo => !todo.completed);
  if (filter === 'completed') filtered = todos.filter(todo => todo.completed);

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  for (const todo of filtered) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}/>
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <button class="delete-btn" title="Delete">
        <svg viewBox="0 0 20 20" fill="none">
          <rect x="7" y="8" width="1.5" height="6" rx="0.75" fill="currentColor"/>
          <rect x="11.5" y="8" width="1.5" height="6" rx="0.75" fill="currentColor"/>
          <path d="M4 6.5H16M8.5 4H11.5C11.7761 4 12 4.22386 12 4.5V5.5H8V4.5C8 4.22386 8.22386 4 8.5 4Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          <rect x="5" y="6.5" width="10" height="9" rx="2" stroke="currentColor" stroke-width="1.2"/>
        </svg>
      </button>
    `;
    list.appendChild(li);
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
