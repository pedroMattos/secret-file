import { createStore } from 'vuex'

export default createStore({
  state: {
    refetchCloudItems: false
  },
  getters: {
    refetchCloudItems: (state) => state.refetchCloudItems
  },
  mutations: {
    refetchCloudItems: (state, payload) => {
      state.refetchCloudItems = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
