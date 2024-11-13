import HabitsModel from './model/habits-model.js';
import HabitsBoardPresenter from './presenter/habits-board-presenter.js';
import { habits as mockHabits } from './mock/habits.js'; 
import { render, RenderPosition } from './framework/render.js';


const container = document.querySelector('main');
const formContainer = document.getElementById('form-container');
const filterContainer = document.getElementById('filter-container');
const habitListContainer = document.getElementById('habit-list-container');


const habitsModel = new HabitsModel();
mockHabits.forEach(habit => habitsModel.addHabit(habit));


const habitsBoardPresenter = new HabitsBoardPresenter(container, habitsModel);
habitsBoardPresenter.init();