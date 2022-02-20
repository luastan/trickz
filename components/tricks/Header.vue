<template>
  <nav
    class="tricks-navbar transition-shadow flex items-center justify-centerst fixed dark:bg-gray-900 light-bg tricks-nav top-0 z-40 w-full border-b dark:border-gray-800 "
    :class="{ 'shadow border-transparent': scrolled && allowShadow }"
  >
    <transition name="slide-up" mode="in-out">
      <div
        v-if="scrolled"
        class="fixed scroll-top-container lg:hidden pointer-events-none top-16 flex items-center justify-center w-full"
      >
        <div
          @click="scrollToTop"
          class="scroll-top-pill select-none shadow-lg cursor-pointer bg-gray-900 text-gray-100 dark:bg-gray-800 dark:text-gray-200 pointer-events-auto mt-4 py-1 px-4 rounded-l-full rounded-r-full"
        >
          Scroll to top
        </div>
      </div>
    </transition>

    <div class="container mx-auto flex-1 px-4 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="lg:w-1/5 flex items-center pr-4">
          <nuxt-link to="/" class="flex-shrink-0 flex items-center justify-start dark:text-gray-200 flex-1 font-bold text-xl">
            <icons-trickz class="stroke-gray-900 fill-gray-900 dark:fill-gray-200 dark:stroke-gray-200 h-10"/>
            <span class="ml-4 hidden lg:block">Trickz</span>
          </nuxt-link>
        </div>
        <div class="flex-1 flex justify-start w-4/6">
          <tricks-search  class="w-full"/>
        </div>
        <div class="social lg:w-1/5 flex items-center justify-end">
          <tricks-change-color class="hidden lg:block tricks-icon"/>
          <a target="_blank" class="hidden lg:block" href="https://twitter.com/luastan">
            <icons-twitter/>
          </a>
          <a class="hidden lg:block" target="_blank" href="https://github.com/luastan">
            <icons-github/>
          </a>
          <div class="flex items-center justify-center h-16 lg:hidden">
            <button type="button" @click="$emit('alternate-menu', !showMenu)">
              <icons-x v-if="showMenu"/>
              <icons-menu v-else/>
            </button>
          </div>
        </div>

      </div>
    </div>


  </nav>

</template>

<script>
export default {
  name: "TricksHeader",
  props: {
    showMenu: {
      type: Boolean,
      required: true
    },
    allowShadow: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      scrolled: 0
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0
    },
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    },

  }
}
</script>

<style scoped>

.scroll-top-container > .scroll-top-pill {
  transition-property: opacity, box-shadow, transform, padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.scroll-top-container:hover > .scroll-top-pill {
  @apply shadow-xl px-14
}


.tricks-navbar{

}

html:not(.dark) .light-bg {
  background-color: rgba(255, 255, 255, .7);
  @apply backdrop-blur
}

.social .tricks-icon {
  @apply h-5 w-5 cursor-pointer stroke-gray-600 transition-colors
}

.social > *:hover .tricks-icon {
  @apply stroke-blue-500
}

.social > *:not(:first-child) {
  @apply ml-4
}
</style>
