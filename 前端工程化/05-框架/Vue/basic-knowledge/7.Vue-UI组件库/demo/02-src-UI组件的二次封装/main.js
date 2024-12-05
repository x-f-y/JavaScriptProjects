import Vue from "vue"
import App from "./App.vue"

import { Button, Autocomplete } from "element-ui"

Vue.component(Button.name, Button)
Vue.component(Autocomplete.name, Autocomplete)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount("#app")
