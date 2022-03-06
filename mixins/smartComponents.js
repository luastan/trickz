/*
*
*
* Scoped store access from Smart components
* The Idea is that these components can access
* a designated part of the vuex store
*
* */
import {mapGetters, mapMutations} from "vuex";

export default {
  props: {
    variable: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      getSmartValue: "smart/getSmartValue",
    }),
    storedSmartValue: {
      get() {
        return this.getSmartValue(this.variable);
      },
    }
  },
  methods: {
    ...mapMutations({
      storeSmartValue: 'smart/setSmartValue',
    }),
    setSmartValue(key, value) {
      this.storeSmartValue({key, value});
    },
  }
};
