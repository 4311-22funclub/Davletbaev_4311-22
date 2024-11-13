import { habits as mockHabits } from '../mock/habits.js';

export default class HabitsModel {
    #habits = [];
    #observers = [];
  
    get habits() {
      return this.#habits;
    }
  
    addHabit(habit) {
      this.#habits.push(habit);
      this._notifyObservers();
    }
  
    deleteHabit(habitId) {
      this.#habits = this.#habits.filter(habit => habit.id !== habitId);
      this._notifyObservers();
    }
  
    addObserver(observer) {
      this.#observers.push(observer);
    }
  
    _notifyObservers() {
      this.#observers.forEach(observer => observer());
    }
  }