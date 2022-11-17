import Vue from "vue";
import { ValidationObserver, extend } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";



Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);