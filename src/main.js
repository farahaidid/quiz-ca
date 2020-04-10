import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

// Global components
import "vue-spinners/dist/vue-spinners.css";
import { TileSpinner } from "vue-spinners";

Vue.component('tile-spinner', TileSpinner)

// Vue Argon
import Argon from "./plugins/VueArgon/argon-kit";
Vue.use(Argon);

Vue.config.productionTip = false


new Vue({
   router, store,
   render: h => h(App)
}).$mount('#app')
