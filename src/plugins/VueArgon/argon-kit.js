import "@/assets/VueArgon/vendor/nucleo/css/nucleo.css";
import "@/assets/VueArgon/vendor/font-awesome/css/font-awesome.css";
import "@/assets/VueArgon/scss/argon.scss";
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import VueLazyload from "vue-lazyload";

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(VueLazyload);
  }
};
