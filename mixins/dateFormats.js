export default {
  filters:{
    localLongDate(value) {
      if (!value) {
        return 'Never';
      }
      return value.toLocaleDateString(undefined, {day: 'numeric', weekday: 'long', month:'long', year: 'numeric'});
    },
    localShortDate(value) {
      if (!value) {
        return 'Never';
      }
      return value.toLocaleDateString(undefined, {day: 'numeric', month:'numeric', year: 'numeric'});
    },
    enShortTextDate(value) {
      if (!value) {
        return 'Never';
      }
      return value.toLocaleDateString('en', {day: 'numeric', weekday: 'short', month:'short', year: 'numeric'});
    },
  }
}
