export default {
  async fetchCategories({commit, getters}) {
    // if (process.dev === false && !getters.isLoadingPending && process.client) {
    //   return
    // }
    const docs = (await this.$content('/', {deep: true})
      .only([
        'title',
        'menuTitle',
        'position',
        'category',
        'slug',
        'version',
        'to',
        'path',
      ])
      .sortBy('position', 'asc')
      .fetch())
      .map(doc => ({...doc, path: `${doc.path}`}));

    const mainCategories = {};

    // main
    docs.filter(value => (value.path.split('/').length === 2))
      .forEach(doc => {
        doc.children = {}
        mainCategories[doc.path] = doc;
      });

    // secondary
    docs.filter(value => (value.path.split('/').length === 3))
      .forEach(doc => {
        doc.children = {}
        const pathParts = doc.path.split('/');
        pathParts.pop();
        // TODO Check if it exists
        mainCategories[pathParts.join('/')].children[doc.path] = doc;
      });


    // third
    docs.filter(value => (value.path.split('/').length === 4))
      .forEach(doc => {
        doc.children = {}
        const pathParts = doc.path.split('/');
        pathParts.pop();
        const least = pathParts.join('/');
        pathParts.pop();
        // TODO Check if it exists
        mainCategories[pathParts.join('/')].children[least].children[doc.path] = doc;
      });

    commit('setCategories', mainCategories);

  },

  async loadLocalStorage({commit}) {
    const storageCounter = localStorage.getItem('counter');
    if (storageCounter !== null) {
      commit('setCounter', storageCounter);
    }
  },
}
