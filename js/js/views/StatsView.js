import View from './View.js';

class StatsView extends View {
  constructor() {
    super('.stats');
  }

  _generateMarkup() {
    const { total, done, pending, overdue, percent } = this._data;
    return `
      <div class="stats-row">
        <span>Total: <b>${total}</b></span>
        <span>Done: <b>${done}</b></span>
        <span>Pending: <b>${pending}</b></span>
        <span>Overdue: <b>${overdue}</b></span>
        <span>Progress: <b>${percent}%</b></span>
      </div>
      <div class="bar"><span style="width:${percent}%"></span></div>`;
  }
}

export default new StatsView();
