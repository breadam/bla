import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
