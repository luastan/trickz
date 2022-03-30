<template>
  <div class="w-full">
    <script>
      function initMap() {
        let map = new google.maps.Map(document.getElementById(`map`), {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
      }
    </script>
    <script
      :src="`https://maps.googleapis.com/maps/api/js?key=${apikey}&callback=initMap&v=weekly`"
      async
    ></script>
    <div id="map" class="not-prose" style="height: 32rem"></div>
  </div>
</template>

<script>
export default {
  name: "GoogleMapsJsApi",
  props: {
    apikey: {
      type: String,
    },
  },
}
</script>

<style scoped>


</style>
