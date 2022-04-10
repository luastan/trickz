<template>
  <div class="pt-16 dark:bg-neutral-900 min-h-screen flex flex-grow w-full flex-col items-center ">
    <tricks-header
      :allow-shadow="!showMobileMenu"
      :show-menu="showMobileMenu"
      @alternate-menu="showMobileMenu = !showMobileMenu"
    />

    <main class="container flex flex-col flex-grow flex-1 h-full mx-auto px-4 lg:px-8">
      <div class="flex flex-wrap relative flex-grow flex-1 h-full w-full">
        <tricks-sidebar
          class="layout-nav-tricks z-30 w-1/5 hidden lg:block bg-white"
          :categories="categories"
        />
        <Nuxt class="w-full lg:w-4/5"/>
        <transition name="fade">
          <div
            v-if="showMobileMenu"
            class="w-full cursor-pointer dark:hidden h-full lg:hidden z-30 fixed"
            style="background-color: rgba(255,255,255, 0.8)"
            @click.prevent="showMobileMenu = !showMobileMenu"
          >
          </div>
        </transition>
        <transition name="slide-left">
          <tricks-sidebar
            @close="showMobileMenu = false"
            :categories="categories"
            v-if="showMobileMenu"
            class="layout-nav-tricks mobile dark:bg-neutral-800 bg-white h-full flex-1 flex-grow w-full z-30 sm:w-7/12 md:w-5/12 fixed lg:hidden shadow-lg backdrop-blur"
          />
        </transition>


      </div>
    </main>
    <tricks-footer class="w-full border-t border-gray-200 dark:border-neutral-800"/>
    <transition mode="out-in" name="fade">
      <div v-if="toast.show" class="fixed pointer-events-none bottom-0 container flex items-center justify-center w-full pb-4">
        <tricks-toast @close="closeToast" class="max-w-2xl pointer-events-auto cursor-pointer">{{ notification }}</tricks-toast>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "default",
  data() {
    return {
      showMobileMenu: false,
      toast: {
        show: false,
        message: "Text copied !",
        interval: null
      }
    }
  },
  created() {
    this.$nuxt.$on('toast-message', ($event) => this.notification = $event);
  },
  methods: {
    closeToast() {
      this.toast.show = false
      clearInterval(this.toast.interval)
    },
  },
  computed: {
    notification: {
      get() {
        return this.toast.message;
      },
      set(val) {
        this.toast.message = val;
        this.toast.show = true;
        if (this.toast.interval) {
          clearInterval(this.toast.interval);
        }
        this.toast.interval = setInterval(this.closeToast, 2000);
      },
    },
    ...mapGetters({
      'categories': 'content/getCategories'
    })
  },
}
</script>

<style scoped>

@screen sm {
  html:not(.dark) .mobile {
    background-color: rgba(255, 255, 255, 0.8);
  }
}


html:not(.dark) .mobile {
  background-color: rgba(255, 255, 255, 0.95);
}

.layout-nav-tricks {
  @apply border-r border-gray-200 dark:border-neutral-800 dark:bg-neutral-900 lg:pt-0 lg:w-1/5  mt-16 lg:mt-0
}
</style>
