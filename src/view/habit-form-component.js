import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class HabitFormComponent extends AbstractComponent {
  constructor(onSubmit) {
    super();
    this._onSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this._handleSubmit.bind(this));
  }

  get template() {
    return `
            <div class="habit-form">
            <h2>Добавить Привычку</h2>
            <form>
            <input type="text" id="habit-name" placeholder="Название привычки" required />
            <textarea id="habit-description" placeholder="Описание привычки" rows="3"></textarea>
            <select id="habit-status" required>
                <option value="active">Активна</option>
                <option value="completed">Завершена</option>
            </select>
            <button type="submit">Добавить Привычку</button>
            </form>
        </div>
    `;
  }

  _handleSubmit(event) {
    event.preventDefault();
    const name = this.element.querySelector('#habit-name').value.trim();
    const description = this.element.querySelector('#habit-description').value.trim();
    const status = this.element.querySelector('#habit-status').value;

    if (name && status) {
      this._onSubmit({ id: Date.now(), name, description, status });
      event.target.reset();
    }
  }
}