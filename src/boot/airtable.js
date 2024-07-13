import { boot } from "quasar/wrappers";
import Airtable from "airtable";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY });

export default boot(({ app, store }) => {
  app.config.globalProperties.$airtable = airtable;

  store.use(() => ({ airtable }));
});

export { airtable };
