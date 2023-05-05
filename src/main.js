import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/components/index";
import IconComponent from "@/assets/icons/IconComponent.vue";
import TextComponent from "@/ui/TextComponent";
import { db } from "./Dexie";
import '@/FirebaseSdk/index';

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(store)
  .use(db, {})
  .use(router)
  .component("SIcon", IconComponent)
  .component("SText", TextComponent)
  .mount("#app");
