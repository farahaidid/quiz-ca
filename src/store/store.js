import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import modules from "./modules"

// Plugins
import createPersistedState from "vuex-persistedstate"

// Using vuex
Vue.use(Vuex)

// Export
export default new Vuex.Store({
   modules,
   plugins: [createPersistedState()]
})