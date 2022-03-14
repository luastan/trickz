<template>
  <div class="w-full border-t border-gray-200 dark:border-gray-800 pt-4 not-prose">
<!--    <div class="mb-4 text-lg font-semibold">-->
<!--      Contributors:-->
<!--    </div>-->
    <div class="flex items-center justify-between mb-4 text-sm text-gray-400 dark:text-gray-500">
      <a :href="editLink" target="_blank" class="hover:underline flex items-center justify-start">
        <icons-pencil class="mr-1 h-4 fill-gray-400"/><span>Edit this page on GitHub</span>
      </a>
      <div>
        Updated at {{ lastUpdate | enShortTextDate }}
      </div>

    </div>
    <ul
      class="list-none pl-0 flex items-center justify-start flex-wrap"
    >
      <li
        class="border-gray-200 dark:border-gray-800 dark:bg-gray-700 mr-2 mb-2 rounded overflow-clip not-prose flex items-center justify-start border"
        v-for="contributor in contributors"
      >
        <img
          class="h-8 w-8"
          alt="profile pic"
          :src="contributor.user.avatarUrl"
        >
        <a
          target="_blank"
          :href="contributor.user.url"
          class="block px-3 h-8 flex items-center justify-start font-medium"
        >
          {{contributor.user.name}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import dateFormats from "../../mixins/dateFormats";

export default {
  name: "GithubInfo",
  mixins: [
    dateFormats,
  ],
  props: {
    contributors: {
      type: Array,
      required: true,
    },
    lastUpdate: {
      type: Date,
      required: true,
    },
    editLink: {
      type: String,
      required: true,
    },
  }
}
</script>

<style scoped>

</style>
