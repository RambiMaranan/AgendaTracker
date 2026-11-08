import View from './View.js';

class FormView extends View {
  constructor() {
    super('.agenda-form');
  }

  _generateMarkup() {
    const { values, editingId, error } = this._data;
    const options = ['high', 'medium', 'low']
      .map(p => `<option value="${p}" ${values.priority === p ? 'selected' : ''}>${p}</option>`)
      .join('');
    return `
      <form>
        <input name="title" placeholder="Agenda title" value="${this._escape(values.title)}">
        <input name="date" type="date" value="${this._escape(values.date)}">
        <select name="priority">${options}</select>
        ${error ? `<p class="error">${this._escape(error)}</p>` : ''}
        <div>
          <button class="primary" type="submit">${editingId ? 'Save changes' : 'Add agenda'}</button>
          ${editingId ? '<button type="button" data-cancel>Cancel</button>' : ''}
        </div>
      </form>`;
  }

  addHandlerSubmit(handler) {
    this._parent.addEventListener('submit', e => {
      e.preventDefault();
      handler(Object.fromEntries(new FormData(e.target)));
    });
  }

  addHandlerCancel(handler) {
    this._parent.addEventListener('click', e => {
      if (e.target.closest('[data-cancel]')) handler();
    });
  }
}

export default new FormView();
