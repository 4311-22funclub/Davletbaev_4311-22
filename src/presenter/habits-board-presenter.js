import HabitFormComponent from '../view/habit-form-component.js';
import HabitListComponent from '../view/habit-list-component.js';
import HabitFilterComponent from '../view/habit-filter-component.js'; // Импортируем компонент фильтра
import HabitPresenter from './habit-presenter.js';
import { render } from '../framework/render.js';

export default class HabitsBoardPresenter {
  #container;
  #model;
  #habitPresenters = new Map();
  #currentFilter = 'all';

  constructor(container, model) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#onModelChange.bind(this));
  }

  init() {
    this.#renderForm();
    this.#renderFilter();
    this.#renderHabitList();
  }

  #renderForm() {
    const formComponent = new HabitFormComponent(habit => this.#model.addHabit(habit));
    render(formComponent, this.#container.querySelector('#form-container'));
  }

  #renderFilter() {
    const filterComponent = new HabitFilterComponent(status => this.#setFilter(status));
    render(filterComponent, this.#container.querySelector('#filter-container'));
  }

  #renderHabitList() {
    this.habitListComponent = new HabitListComponent();
    render(this.habitListComponent, this.#container.querySelector('#habit-list-container'));
    this.#refreshHabitList();
  }

  #setFilter(filter) {
    this.#currentFilter = filter;
    this.#refreshHabitList();
  }

  #refreshHabitList() {
    this.habitListComponent.clearList();
    this.#habitPresenters.forEach(presenter => presenter.destroy());
    this.#habitPresenters.clear();

    this.#model.habits
      .filter(habit => this.#currentFilter === 'all' || habit.status === this.#currentFilter)
      .forEach(habit => this.#renderHabit(habit));
  }

  #renderHabit(habit) {
    const habitPresenter = new HabitPresenter(this.habitListComponent.element, habit, {
      onDelete: id => this.#model.deleteHabit(id),
      onEdit: updatedHabit => this.#model.editHabit(updatedHabit),
      onToggleStatus: (id, status) => this.#model.updateHabitStatus(id, status),
    });
    habitPresenter.init();
    this.#habitPresenters.set(habit.id, habitPresenter);
  }

  #onModelChange() {
    this.#refreshHabitList();
  }
}