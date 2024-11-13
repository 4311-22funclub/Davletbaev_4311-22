import HabitItemComponent from '../view/habit-item-component.js';
import { render, remove } from '../framework/render.js';

export default class HabitPresenter {
  #container;
  #habit;
  #habitComponent;
  #onDelete;

  constructor(container, habit, onDelete) {
    this.#container = container;
    this.#habit = habit;
    this.#onDelete = onDelete;
  }

  init() {
    this.#habitComponent = new HabitItemComponent(this.#habit, () => this.#handleDelete());
    render(this.#habitComponent, this.#container);
  }

  #handleDelete() {
    this.#onDelete(this.#habit.id);
    this.destroy();
  }

  destroy() {
    remove(this.#habitComponent);
    this.#habitComponent = null;
  }
}