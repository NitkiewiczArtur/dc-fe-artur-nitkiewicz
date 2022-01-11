import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";
import _ from "lodash";

createApp(App).use(store).use(_).mount("#app");
