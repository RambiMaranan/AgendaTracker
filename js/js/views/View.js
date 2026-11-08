export default class View {
  _parent;
  _data;

  constructor(parentSelector) {
    this._parent = document.querySelector(parentSelector);
  }

  render(data) {
    this._data = data;
    this._clear();
    this._parent.insertAdjacentHTML('beforeend', this._generateMarkup());
  }

  _clear() {
    this._parent.innerHTML = '';
  }

  _escape(text) {
    const div = document.createElement('div');
    div.textContent = text ?? '';
    return div.innerHTML;
  }

  _generateMarkup() {
    throw new Error('Subclass must implement _generateMarkup()');
  }
}
