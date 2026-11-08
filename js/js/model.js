const STORAGE_KEY = 'agenda-tracker-items';

export const state = {
  items: [],
  filter: 'all',
};

const today = () => new Date().toLocaleDateString('en-CA');

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));

export const loadState = () => {
  try {
    state.items = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    state.items = [];
  }
};

export const validate = ({ title, date }) => {
  if (!title?.trim()) return 'Please enter an agenda title.';
  if (title.trim().length > 60) return 'Title must be 60 characters or fewer.';
  if (!date) return 'Please pick a date.';
  return '';
};

export const addItem = ({ title, date, priority }) => {
  state.items.push({ id: String(Date.now()), title: title.trim(), date, priority, done: false });
  save();
};

export const updateItem = (id, { title, date, priority }) => {
  const item = state.items.find(i => i.id === id);
  Object.assign(item, { title: title.trim(), date, priority });
  save();
};

export const toggleDone = id => {
  const item = state.items.find(i => i.id === id);
  item.done = !item.done;
  save();
};

export const deleteItem = id => {
  state.items = state.items.filter(i => i.id !== id);
  save();
};

export const getItem = id => state.items.find(i => i.id === id);

export const setFilter = filter => {
  state.filter = filter;
};

export const getVisibleItems = () =>
  state.items
    .filter(i => state.filter === 'all' || (state.filter === 'done') === i.done)
    .map(i => ({ ...i, overdue: !i.done && i.date < today() }))
    .sort((a, b) => a.date.localeCompare(b.date));

export const getStats = () => {
  const total = state.items.length;
  const done = state.items.filter(i => i.done).length;
  const overdue = state.items.filter(i => !i.done && i.date < today()).length;
  return {
    total,
    done,
    pending: total - done,
    overdue,
    percent: total ? Math.round((done / total) * 100) : 0,
  };
};
