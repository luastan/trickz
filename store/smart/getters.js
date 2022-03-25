export default {
  getSmartValue: (state) => (key) => state.content ? state.content[`smart/${key}`]: undefined,
}
