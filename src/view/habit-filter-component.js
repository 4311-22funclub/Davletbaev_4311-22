import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class HabitFilterComponent extends AbstractComponent {
  constructor(onFilterChange) {
    super();
    this._onFilterChange = onFilterChange;
    this.element.querySelector('#status-filter').addEventListener('change', this._handleFilterChange.bind(this));
  }

  get template() {
    return `
    <div class="habit-filter">
    <h2>Фильтры</h2>
    <label for="status-filter">Фильтр по статусу:</label>
    <select id="status-filter">
      <option value="all">Все</option>
      <option value="active">Активные</option>
      <option value="completed">Завершенные</option>
    </select>
  </div>
    `;
  }

  _handleFilterChange(event) {
    const selectedStatus = event.target.value;
    this._onFilterChange(selectedStatus);
  }
}