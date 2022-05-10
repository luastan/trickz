<template>
  <tricks-basic-article
    :title="contentDoc.title"
    :description="contentDoc.description"
    :badge="contentDoc.badge"
    :edit-link="contentDoc.editURL"
  >
    <template>
      <NuxtContent
        id="content-container"
        ref="nuxtContentRoot"
        :document="contentDoc"/>
      <tricks-github-info
        class="mt-6"
        v-if="contentDoc.editURL"
        :last-update="new Date(Date.parse(contentDoc.lastCommittedDate || contentDoc.updatedAt))"
        :contributors="contentDoc.contributors || []"
        :edit-link="contentDoc.editURL"
      />
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

    // In-line codeblocks
    const vm = this;
    document.querySelectorAll(":not(pre) > code")
      .forEach(el => {
        el.classList.add('copy-me');
        el.onclick = ({target}) => {
          navigator.clipboard.writeText(target.textContent)
          vm.$nuxt.$emit('toast-message', "Text copied to clipboard !");
        };
      });

    const checkElements = document.getElementsByClassName('tricks-check');
    for (let checkElement of checkElements) {
      checkElement.parentElement.parentElement.classList.add('tricks-checklist');
    }
  },
}
</script>

<style scoped>

#content-container {
  @apply mb-10
}

</style>
