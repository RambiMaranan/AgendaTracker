import View from './View.js';

class FilterView extends View {
  constructor() {
    super('.filters');
  }

  _generateMarkup() {
    return ['all', 'pending', 'done']
      .map(f => `<button data-filter="${f}" class="${this._data === f ? 'active' : ''}">${f}</button>`)
      .join('');
  }

  addHandlerFilter(handler) {
    this._parent.addEventListener('click', e => {
      const btn = e.target.closest('[data-filter]');
      if (btn) handler(btn.dataset.filter);
    });
  }
}

export default new FilterView();
