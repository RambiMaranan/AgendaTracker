import * as model from './model.js';
import formView from './views/FormView.js';
import agendaListView from './views/AgendaListView.js';
import statsView from './views/StatsView.js';
import filterView from './views/FilterView.js';

let editingId = null;

const emptyValues = () => ({ title: '', date: '', priority: 'medium' });

const renderForm = (values = emptyValues(), error = '') =>
  formView.render({ values, editingId, error });

const refresh = () => {
  agendaListView.render(model.getVisibleItems());
  statsView.render(model.getStats());
  filterView.render(model.state.filter);
};

const controlSubmit = data => {
  const error = model.validate(data);
  if (error) return renderForm(data, error);

  if (editingId) model.updateItem(editingId, data);
  else model.addItem(data);

  editingId = null;
  renderForm();
  refresh();
};

const controlEdit = id => {
  editingId = id;
  renderForm(model.getItem(id));
};

const controlCancel = () => {
  editingId = null;
  renderForm();
};

const controlToggle = id => {
  model.toggleDone(id);
  refresh();
};

const controlDelete = id => {
  if (editingId === id) editingId = null;
  model.deleteItem(id);
  renderForm();
  refresh();
};

const controlFilter = filter => {
  model.setFilter(filter);
  refresh();
};

const init = () => {
  model.loadState();
  renderForm();
  refresh();
  formView.addHandlerSubmit(controlSubmit);
  formView.addHandlerCancel(controlCancel);
  agendaListView.addHandlerToggle(controlToggle);
  agendaListView.addHandlerEdit(controlEdit);
  agendaListView.addHandlerDelete(controlDelete);
  filterView.addHandlerFilter(controlFilter);
};

init();
