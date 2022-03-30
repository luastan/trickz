<template>
  <div class="w-full">
    <client-only>
      <content-google-maps-js-api
        v-if="isMapShowing"
        :apikey="apikey"
      ></content-google-maps-js-api>
      <smart-input default-value="AIzaSyZ-..." :variable="variable"></smart-input>
    </client-only>
  </div>
</template>

<script>
import {debounce} from "debounce";
import smartComponents from "../../mixins/smartComponents";

export default {
  name: "WrapGoogleMapsJsApi",
  mixins: [smartComponents],
  data() {
    return {
      isMapShowing: true,
      key: this.storedSmartValue,
      reloadMap: debounce(this.showMap)
    }
  },
  methods: {
    showMap() {
      this.isMapShowing = true;
    },

  },
  computed: {
    apikey: {
      get() {
        this.isMapShowing = false;
        this.reloadMap();
        return this.storedSmartValue;
      },
    }
  }
}
</script>

<style scoped>

</style>
