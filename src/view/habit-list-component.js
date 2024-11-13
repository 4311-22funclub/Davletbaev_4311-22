import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class HabitListComponent extends AbstractComponent {
  get template() {
    return `<div class="habit-list">
    <h2>Список Привычек</h2>
    <div id="habit-list-content"></div>
    </div>`;
  }

  addHabit(habitComponent) {
    const content = this.element.querySelector('#habit-list-content');
    content.appendChild(habitComponent.element);
  }

  clearList() {
    this.element.querySelector('#habit-list-content').innerHTML = '';
  }
}