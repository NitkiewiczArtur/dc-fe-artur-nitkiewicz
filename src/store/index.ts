import { createLogger, createStore } from "vuex";
// @ts-ignore
import characterModule from "./modules/character";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    characterModule
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})