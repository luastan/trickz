<template>
  <tricks-basic-article
    :title="contentDoc.title"
    :description="contentDoc.description"
    :badge="contentDoc.badge"
    :edit-link="`https://github.com/luastan/tricks-content/edit/master${documentPath}${contentDoc.extension}`"
  >
    <template>
      <NuxtContent
        id="content-container"
        ref="nuxtContentRoot"
        :document="contentDoc"/>
    </template>
    <template v-slot:sidebar>
      <tricks-toc
        class="w-full"
        v-if="contentDoc.toc"
        :toc="contentDoc.toc"
      />
    </template>
  </tricks-basic-article>
</template>

<script>

export default {
  name: "MarkdownContent",
  props: {
    "contentDoc": {
      type: Object
    }
  },
  mounted() {
    if (this.contentDoc.version) {
      localStorage.setItem(`document-${this.contentDoc.slug}-version`, this.contentDoc.version)
    }
    if (!this.$isServer) {
      document.querySelectorAll(".nuxt-content :is(h1,h2,h3,h4,h5,h6)").forEach(heading => {
        heading.onclick = ({target}) => {
          let url = new URL(window.location.href);
          url.hash = `${target.id}`
          navigator.clipboard.writeText(url.toString())
          this.$nuxt.$emit('toast-message', "Link copied !")
        }
      })
    }

    const checkElements = document.getElementsByClassName('tricks-check');
    for (let checkElement of checkElements) {
      checkElement.parentElement.parentElement.classList.add('tricks-checklist');
    }
  },
  computed: {
    documentPath() {
      return `/${this.$route.params.pathMatch || 'tricks'}`
    },
  }
}
</script>

<style scoped>

</style>
