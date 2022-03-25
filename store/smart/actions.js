export default {
  async loadFromLocalStorage({commit}) {
    const content = this.$fromStorage('smartContent');
    if (content !== null) {
      commit('setContent', content);
    }
  },
}
