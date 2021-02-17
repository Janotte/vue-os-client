import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { ErrorService } from "./services/ErrorService";

Vue.config.productionTip = false

// Handle all Vue errors
Vue.config.errorHandler = (error) => ErrorService.onError(error);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
