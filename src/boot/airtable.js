import { boot } from "quasar/wrappers";
import Airtable from "airtable";

export default boot(({ app, store }) => {
  const airtable = new Airtable({
    apiKey:
      "patUhNydCJvMx5xTn.79e28f721b94a3959af7e8c61f70106e90a9ddc7c13f55078dc6dc3fc24cbf24",
  });
  store.use(() => ({ airtable }));
});
