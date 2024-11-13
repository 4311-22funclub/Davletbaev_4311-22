import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class HabitItemComponent extends AbstractComponent {
  constructor(habit, onDelete) {
    super();
    this.habit = habit;
    this._onDelete = onDelete;

    this.element.querySelector('.delete-btn').addEventListener('click', () => this._onDelete(this.habit.id));
  }

  get template() {
    return `
        <div class="habit-item">
          <span>${this.habit.name} - ${this.habit.description || 'Без описания'}</span>
          <span>Статус: ${this.habit.status === 'active' ? 'Активна' : 'Завершена'}</span>
          <button class="delete-btn">Удалить</button>
        </div>
    `;
  }
}