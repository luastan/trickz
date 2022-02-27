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

import Vue from 'vue'
import Vuex from 'vuex'
import SmartInput from "../smart/Input";
import CopyCode from "../tricks/CopyCode";


const smartSpanRegex = /class="smart-([a-zA-Z\-]+)"/g;

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


      const found = {};
      const findSmartVariables = (nodes) => {
        const valid = nodes.filter(d => d.tag === 'span')
        for (const validElement of valid) {
          if (validElement.props.className.includes('token')) {
            findSmartVariables(validElement.children)
          } else {
            found[validElement.props.className[0]] = validElement.children[0].value
            console.log(validElement.children[0].value)
          }
        }
      }
      findSmartVariables(
        this.contentDoc.body.children
          .filter(d => d.type === 'element' && d.tag === 'div')
          .flatMap(d => d.children)
          .filter(d => d.type === 'element' && d.tag === 'pre')
          .flatMap(d => d.children)
          .filter(d => d.type === 'element' && d.tag === 'code')
          .flatMap(d => d.children)
          .filter(d => d.type === 'element' && d.tag === 'span')
      )
      for (const block of blocks) {


        // Smart inputs

        // Ugly code that performs literally 100000000000000x times better than well written code =(

        const blockHTML = block.innerHTML.toString()
        let regexResults = blockHTML.matchAll(smartSpanRegex);
        const inserted = {};
        for (const match of regexResults) {
          const variable = match[1];
          const defaultValue = found[`smart-${variable}`];
          if (!inserted[variable]) {
            inserted[variable] = true;
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

        // Do Not Ever Consider this thing (It is extremely slow):

        // block.querySelectorAll('span[class*="smart-"]').forEach(smartReplacement => {
        //   const variable = smartReplacement.classList[0].replace('smart-', '')
        //   found[variable] = smartReplacement.innerText;
        //   this.profile()
        // });

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
    documentPath() {
      return `/${this.$route.params.pathMatch || 'tricks'}`
    },
  }
}
</script>

<style scoped>

</style>
