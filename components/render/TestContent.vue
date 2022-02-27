<template>
  <tricks-basic-article
    :title="contentDoc.title"
    :description="contentDoc.description"
    :badge="contentDoc.badge"
    :edit-link="`https://github.com/luastan/tricks-content/edit/master${contentDoc.path}${contentDoc.extension}`"
  >
    <template>
      <transition name="fade" mode="out-in">
        <practice-test
          v-if="practicePage === 'test'"
          @open-page="handlePageChange"
          :test-state="contentDoc"
        />
        <practice-landing
          v-else
          @open-page="handlePageChange"
        />
      </transition>
    </template>
    <template v-slot:sidebar>

    </template>
  </tricks-basic-article>
</template>

<script>
export default {
  name: "TestContent",
  data() {
    return {
      practicePage: 'landing',

    }
  },
  props: {
    "contentDoc": {
      type: Object
    }
  },
  computed: {

  },
  methods: {
    handlePageChange(page) {
      this.practicePage = page;
    },
  }
}
</script>

<style scoped>

</style>
