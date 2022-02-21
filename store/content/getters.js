export default {
  getCategories(state) {
    return state.categories || {};
  },
  isLoadingPending(state) {
    return state.categories === null;
  },
  getCounter(state) {
    return state.counter;
  },
}
