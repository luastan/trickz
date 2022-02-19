<template>
  <aside
    class="tricks-nav fancy-scrollbar flex-grow lg:top-16 lg:sticky fixed top-0 left-0 overflow-y-auto lg:relative z-30">
    <ul class="category-list lg:sticky lg:top-0 top-0 pl-6 py-6 lg:py-8 lg:pl-0 fancy-scrollbar">
      <li
        v-for="(category, categoryIndex) in categories"
        class="category flex flex-col items-start justify-start"
        @click="emitClose(category)"
      >

        <nuxt-link class="title w-full" :to="category.path">
          {{ category.title }}
        </nuxt-link>


        <ul class="sub-category-list">
          <li
            v-for="(subCategory, subCategoryIndex) in category.children"
            class="sub-category"
            @click="emitClose(subCategory)"
          >
            <nuxt-link
              :to="subCategory.path"
              class="title cursor-pointer flex items-center justify-between block"
            >
              <span>
                {{ subCategory.title }}
              </span>

              <icons-arrow
                v-if="categoryHasChildren(subCategory)"
                arrow ml-2 mr-4
                class="stroke-gray-300 arrow ml-2 mr-4 h-5 w-5"
              />
            </nuxt-link>
            <transition mode="in-out" name="slide-up">
              <ul
                v-if="categoryHasChildren(subCategory) && $route.path.match(subCategory.path)"
                class="sub-sub-category-list"
              >
                <li
                  class="sub-sub-category"
                  v-for="(subSubCategory, subSubCategoryIndex) in subCategory.children"
                  :key="subSubCategory.path"
                  :class="{
                    'nuxt-link-exact-active': $route.path.match(subSubCategory.path),
                  }"
                  @click="emitClose(subSubCategory)"
                >
                  <nuxt-link
                    class="title"
                    :to="subSubCategory.path"
                  >
                    <span class="title">{{ subSubCategory.title }}</span>
                  </nuxt-link>
                </li>


              </ul>
            </transition>

          </li>
        </ul>
      </li>
      <li class="social flex lg:hidden items-center justify-start block w-full">

        <a class="mr-4" target="_blank" href="https://twitter.com/luastan">
          <icons-twitter class="h-6 w-6 cursor-pointer stroke-2 stroke-gray-500"/>
        </a>
        <a class="" target="_blank" href="https://github.com/luastan">
          <icons-github class="h-6 w-6 mr-4 cursor-pointer stroke-2 stroke-gray-500"/>
        </a>
        <tricks-change-color class="h-7 w-7 stroke-gray-500"/>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "TricksNav",
  props: {
    'categories': {
      type: Object,
      default: {},
    },
  },
  methods: {
    emitClose(category) {
      if (!this.categoryHasChildren(category)) {
        this.$emit('close');
      }
    },
    categoryHasChildren({children}) {
      return Object.keys(children).length > 0;
    },
  }
}
</script>

<style scoped>

.tricks-nav {
  max-height: calc(100vh - 4rem);

}

.tricks-nav.fancy-scrollbar::-webkit-scrollbar-track {


}


@media (min-width: 1024px) {

}

.category-list {

}


.category-list > .category {
  @apply mb-4 w-full
}


.category-list > .category > .title {
  @apply text-lg text-gray-500 dark:text-gray-400 font-medium w-full py-2
}

.category-list > .category > .title.nuxt-link-exact-active,
.category-list > .category > .title:hover {
  @apply text-blue-500 dark:text-gray-100
}


.category-list > .category > .sub-category-list {
  @apply w-full
}

.category-list > .category > .sub-category-list > .sub-category > .title {
  @apply w-full text-gray-500 dark:text-gray-400 transition-colors py-2 border-y border-l border-transparent pl-4
}

.category-list > .category > .sub-category-list > .sub-category > .title > .tricks-icon-arrow {
  @apply transition-transform
}


.category-list > .category > .sub-category-list > .sub-category > .title.nuxt-link-active > .tricks-icon-arrow {
  @apply rotate-90
}

.category-list > .category > .sub-category-list > .sub-category > .title.nuxt-link-exact-active {
  @apply border-gray-200 bg-gray-50 text-blue-500 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-800
}


.category-list > .category > .sub-category-list > .sub-category > .title:hover {
  @apply text-blue-500 dark:text-gray-200
}

.category-list > .category > .sub-category-list > .sub-category > .title:not(.nuxt-link-exact-active):hover > .tricks-icon-arrow {
  @apply stroke-blue-500 dark:stroke-gray-200 -translate-x-2 rotate-0
}

.category-list > .category > .sub-category-list > .sub-category > .sub-sub-category-list {
  @apply text-gray-500 dark:text-gray-400 w-full pl-4
}

.category-list > .category > .sub-category-list > .sub-category > .sub-sub-category-list > .sub-sub-category {
  @apply pl-4 w-full border-y border-l border-l-gray-200 dark:border-l-gray-800 border-y-transparent cursor-pointer
}

.category-list > .category > .sub-category-list > .sub-category > .sub-sub-category-list > .sub-sub-category > .title {
  @apply py-2 w-full block pr-2
}

.category-list > .category > .sub-category-list > .sub-category > .sub-sub-category-list > .sub-sub-category.nuxt-link-exact-active {
  @apply border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800
}


.nuxt-link-active {
  /*@apply text-blue-400*/
}

.nuxt-link-exact-active {
  @apply text-blue-500 dark:text-gray-200
}
</style>
