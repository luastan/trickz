/*
*
* Luastan's Tricks initialization
*
* Main purpose of this to build an index from the markdown content, save it on
* the state and then be able to build the sidebar and navbar easily
*
* */


export default async function ({store}) {

  // When SSR load always
  if (process.server) {
    await store.dispatch('content/fetchCategories');
  }

  // In SPA mode, load if there is no categories already
  if (store.getters['content/isLoadingPending']) {
    await store.dispatch('content/fetchCategories');
  }

  if (process.client) {
    await store.dispatch('content/loadLocalStorage');
    await store.dispatch('smart/loadFromLocalStorage');
  }

  // Development Hot reload
  if (process.client && process.dev) {
    window.onNuxtReady(() => {
      window.$nuxt.$on('content:update', async () => {
        await store.dispatch('content/fetchCategories');
      });
    });
  }

};
