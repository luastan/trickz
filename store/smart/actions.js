export default {
  async loadFromLocalStorage({commit}) {
    const content = this.$fromStorage('smartContent');
    commit('setContent', content);
  },
}
