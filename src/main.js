import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'

Vue.use(VModal)

Vue.use (VueAxios, axios)


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')