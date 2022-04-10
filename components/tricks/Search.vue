<template>
  <div>
    <div class="w-full relative flex flex-col justify-between">
      <div
        class="w-full relative"
        @keydown.down="increment"
        @keydown.up="decrement"
        @keydown.enter="go"
      >
        <label for="search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <icons-search class="h-5 w-5 text-gray-500 dark:text-neutral-500"/>
          </div>
          <input
            id="search"
            ref="search"
            v-model="q"
            class="block w-full pl-10 pr-3 py-2 truncate leading-5 placeholder-gray-500 dark:placeholder-neutral-400 border border-transparent text-gray-700 dark:text-neutral-200 dark-focus:text-neutral-100 focus:border-neutral-300 dark:focus:border-neutral-700 rounded-md focus:outline-none focus:bg-white dark:focus:bg-neutral-900 bg-gray-200 dark:bg-neutral-800"
            :class="{ 'rounded-b-none': focus && (searching || results.length) }"
            placeholder="Search (Ctrl + E)"
            type="search"
            autocomplete="off"
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>
      </div>
      <ul
        v-show="focus && (searching || results.length)"
        class="z-10 absolute w-full flex-1 top-0 bg-white dark:bg-neutral-800 dark:text-neutral-200 rounded-md border border-gray-300 dark:border-neutral-700 overflow-hidden"
        :class="{ 'rounded-t-none': focus && (searching || results.length) }"
        style="margin-top: 37px;"
      >
        <li v-if="searching && !results.length" class="px-4 py-2">Searching...</li>
        <li
          v-for="(result, index) of resultsWithCategory"
          :key="result.slug"
          @mouseenter="focusIndex = index"
          @mousedown="go"
        >
          <NuxtLink
            :to="result.path"
            class="flex px-4 py-2 items-center leading-5 transition ease-in-out duration-150"
            :class="{
            'text-primary-400 bg-gray-100 dark:bg-neutral-700': focusIndex === index
          }"
            @click="focus = false"
          >
            <span v-if="result.category" class="font-semibold hidden md:inline">{{ result.category.title }}</span>
            <icons-arrow v-if="result.category" class="w-3 h-3 mx-1 md:inline hidden"/>
            <span v-if="result.subcategory" class="font-semibold">{{ result.subcategory.title }}</span>
            <icons-arrow v-if="result.subcategory" class="w-3 h-3 mx-1"/>
            {{ result.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Search",
  data() {
    return {
      q: '',
      focus: false,
      focusIndex: -1,
      open: false,
      searching: false,
      results: [],
    }
  },
  watch: {
    async q(q) {
      this.focusIndex = -1
      if (!q) {
        this.searching = false
        this.results = []
        return
      }
      this.searching = true
      this.results = await this.$content('/', {deep: true})
        .sortBy('position', 'asc')
        .only(['title', 'slug', 'path'])
        .limit(12)
        .search(q)
        .fetch();
      this.searching = false
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown)
  },
  methods: {
    onFocus() {
      this.focus = true
      this.$emit('focus', true)
    },
    onBlur() {
      this.focus = false
      this.$emit('focus', false)
    },
    keydown(e) {
      if (e.key === 'e' && e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        this.$refs.search.focus();
      }
    },
    increment() {
      if (this.focusIndex < this.results.length - 1) {
        this.focusIndex++
      }
    },
    decrement() {
      if (this.focusIndex >= 0) {
        this.focusIndex--
      }
    },
    go() {
      if (this.results.length === 0) {
        return
      }
      const result = this.focusIndex === -1 ? this.results[0] : this.results[this.focusIndex]
      this.$router.push(result.path)
      // Unfocus the input and reset the query.
      this.$refs.search.blur()
      this.q = ''
    },
  },
  computed: {
    ...mapGetters({
      categories: 'content/getCategories',
    }),
    resultsWithCategory() {
      return this.results.map(r => {
        let pathParts = r.path.split('/');
        while (pathParts.length > 3) {
          pathParts.pop()
        }

        let subcategory = null;
        let subcategoryPath = null;
        if (r.path.split('/').length === 4) {
          subcategoryPath = pathParts.join('/');
        }
        while (pathParts.length > 2) {
          pathParts.pop()
        }

        const category = this.categories[pathParts.join('/')];
        if (!!subcategoryPath) {
          subcategory = category.children[subcategoryPath];
        }

        return {...r, category, subcategory}
      })
    },
  }
}
</script>

<style scoped>

</style>
