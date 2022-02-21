<template class="fancy-scrollbar">
  <div
    class="flex flex-wrap-reverse"
  >
    <div
      class="w-full py-4 lg:w-3/4 lg:pt-8 lg:pb-4 dark:border-gray-800"
      :class="{
        '': !contentDoc.fullscreen,
        'lg:border-r': settings.layout !== 'single'
      }"
    >
      <article class="prose dark:prose-invert max-w-none lg:px-8">
        <header class="w-full border-b border-gray-200 dark:border-gray-800 mb-4">
          <h1 class="flex items-center justify-between" v-if="contentDoc.title">
            {{ contentDoc.title }}
            <tricks-badge v-if="contentDoc.badge">{{ contentDoc.badge }}</tricks-badge>
          </h1>

          <div v-if="contentDoc.description" class="mt-4">
            <p class="text-gray-600 dark:text-gray-400">{{ contentDoc.description }}</p>
          </div>
        </header>

        <NuxtContent
          id="content-container"
          ref="nuxtContentRoot"
          :document="contentDoc"/>
      </article>
      <!--      <AppPageBottom :document="doc" />-->
      <!--      <AppPrevNext :prev="prev" :next="next" />-->
    </div>

    <tricks-toc :edit-link="`https://github.com/luastan/tricks-content/edit/master${documentPath}.md`" :toc="doc.toc"/>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import SmartInput from "@/components/smart/Input";
import CopyCode from "@/components/tricks/CopyCode";

const findTplRegex = /{{ ?([a-zA-Z\-]+) ([^}]+) ?}}/g;

export default {
  data() {
    return {
      settings: {
        layout: ''
      },

    }
  },
  head() {
    const meta = [
      {hid: 'og:title', property: 'og:title', content: this.doc.title},
      {hid: 'twitter:title', name: 'twitter:title', content: this.doc.title},
    ];
    if (this.doc.description !== undefined) {
      meta.push(
        {hid: 'description', name: 'description', content: this.doc.description},
        {hid: 'og:description', property: 'og:description', content: this.doc.description},
        {hid: 'twitter:description', name: 'twitter:description', content: this.doc.description},
      );
    }

    return {
      title: this.doc.title,
      meta,
    };
  },
  mounted() {
    if (this.doc.version) {
      localStorage.setItem(`document-${this.doc.slug}-version`, this.doc.version)
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
      setTimeout(this.enhanceCodeBlocks,);
    }

    const checkElements = document.getElementsByClassName('tricks-check');
    for (let checkElement of checkElements) {
      checkElement.parentElement.parentElement.classList.add('tricks-checklist');
    }

  },
  methods: {
    enhanceCodeBlocks() {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      const CopyButton = Vue.extend(CopyCode)

      const SmartInputConstructor = Vue.extend(SmartInput)
      Vue.use(Vuex);
      for (const block of blocks) {
        block.childNodes.forEach(node => node.classList.add('fancy-scrollbar'));
        const regexResults = block.textContent.matchAll(findTplRegex);
        const lastMatch = {
          variable: "",
          defaultValue: "",
        };
        const found = {};
        for (const match of regexResults) {
          const variable = match[1];
          const defaultValue = match[2].trim();
          block.innerHTML = block.innerHTML.replaceAll(
            findTplRegex,
            '<span class="smart-$1">$2</span>'
          );
          if (found[variable] === undefined) {
            found[variable] = true;
            const smartInputComponent = new SmartInputConstructor({
              propsData: {
                variable,
                defaultValue,
                store: this.$store,
              }
            }).$mount();
            block.insertAdjacentElement('afterend', smartInputComponent.$el);
          }
        }
        const component = new CopyButton().$mount();
        block.appendChild(component.$el);
        block.classList.add('relative');
        // const smartinput = new SmartInput({});
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
    },
    replaceCheckLists(node) {
      // const component = new this.CheckComponent({
      //   propsData: {
      //     value: true,
      //     tag: 'span',
      //   },
      //
      // });

      // const mountedComponent = component.$mount();
      // mountedComponent.$slots
      // const text = node.textContent;
      // check.replaceChildren(mountedComponent.$el)
    },
  },
  computed: {
    contentDoc() {
      return this.doc;
    },
    documentPath() {
      return `/${this.$route.params.pathMatch || 'tricks'}`
    },
  },
  async asyncData({$content, store, app, params, error}) {

    const path = `/${params.pathMatch || 'tricks'}`;

    const [document] = await $content({deep: true}).where({path}).fetch()
    if (!document) {
      return error({statusCode: 404, message: 'Page not found'})
    }
    const [prev, next] = await $content('/', {deep: true})
      .only(['title', 'path', 'to'])
      .sortBy('position', 'asc')
      .surround(document.path, {before: 1, after: 1})
      .fetch()
    return {
      doc: document,
      prev,
      next
    }
  },
}
</script>

<style>
/*ul.tricks-checklist {*/
/*  list-style: none;*/
/*}*/

#content-container {
  @apply static
}
</style>
