import View from './View.js';

class AgendaListView extends View {
  constructor() {
    super('.agenda-list');
  }

  _generateMarkup() {
    if (!this._data.length) return '<li class="empty">No agenda items here yet.</li>';
    return this._data.map(item => this._generateItem(item)).join('');
  }

  _generateItem({ id, title, date, priority, done, overdue }) {
    return `
      <li class="${priority} ${done ? 'done' : ''} ${overdue ? 'overdue' : ''}">
        <input type="checkbox" data-action="toggle" data-id="${id}" ${done ? 'checked' : ''}>
        <div class="info">
          <div class="title">${this._escape(title)}</div>
          <div class="meta">${date} · ${priority}${overdue ? ' · OVERDUE' : ''}</div>
        </div>
        <button data-action="edit" data-id="${id}">Edit</button>
        <button data-action="delete" data-id="${id}">Delete</button>
      </li>`;
  }

  _addHandler(action, handler, event = 'click') {
    this._parent.addEventListener(event, e => {
      const el = e.target.closest(`[data-action="${action}"]`);
      if (el) handler(el.dataset.id);
    });
  }

  addHandlerToggle(handler) { this._addHandler('toggle', handler, 'change'); }
  addHandlerEdit(handler) { this._addHandler('edit', handler); }
  addHandlerDelete(handler) { this._addHandler('delete', handler); }
}

export default new AgendaListView();
