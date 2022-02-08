export default {
  setSmartValue(state, {key, value}) {
    const newContent = {...state.content};
    newContent[`smart/${key}`] = value;
    state.content = newContent;

    this.$toStorage('smartContent', state.content);
  },

  setContent(state, content) {
    state.content = content;
  },
};
