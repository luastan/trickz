export default {
  setCategories(state, categories) {
    state.categories = categories;
  },
  incrementCounter(state) {
    state.counter++;
    localStorage.setItem('counter', state.counter);
  },
  setCounter(state, counter) {
    state.counter = counter;
    localStorage.setItem('counter', counter);
  },
}
