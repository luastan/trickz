export default {
  getSmartValue: (state) => (key) => state.content[`smart/${key}`],
}
