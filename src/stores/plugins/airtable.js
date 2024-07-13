import { ref, toRef } from "vue";
import { capitalize } from "src/lib/string";

export default function Airtable({ store, options }) {
  const endpoint = capitalize(store.$id);
  const prepare = options.prepare;

  createStateProperty(store, "items", []);
  createStateProperty(store, "fields", options.fields);
  createStateProperty(store, "sortBy", options.sortBy);
  createStateProperty(store, "filterBy", options.filterBy);
  createStateProperty(store, "pageSize", options.pageSize);
  createStateProperty(store, "page", 0);
  createStateProperty(store, "loading", false);

  const actions = {
    _addToItems(record) {
      const item = prepareRecord(record, prepare);
      this.items.push(item);
      return item;
    },

    _removeFromItems(id) {
      const index = this.items.findIndex((item) => item.id === id);

      if (index > -1) {
        this.items.splice(index, 1);
      }
    },

    _updateItem(record) {
      const index = this.items.findIndex((i) => i.id === record.id);

      if (index > -1) {
        const item = prepareRecord(record, prepare);
        this.items[index] = item;
        return item;
      }

      return this._addToItems(record);
    },

    _base() {
      const base = this.airtable.base(process.env.AIRTABLE_BASE);
      return base(endpoint);
    },

    fetch(fields = [], filterBy, sortBy) {
      const qFields = fields ? fields : this.fields;
      const qFilterBy = filterBy ? filterBy : this.filterBy;
      const qSortBy = sortBy ? sortBy : this.sortBy;

      const query = {
        view: "Grid view",
      };

      if (qSortBy) {
        query.sort = qSortBy;
      }

      if (qFilterBy) {
        query.filterFormula = qFilterBy;
      }

      if (qFields) {
        query.fields = qFields;
      }

      this.loading = true;
      this._base()
        .select(query)
        .eachPage(
          (records, fetchNextPage) => {
            const items = records.map((record) =>
              prepareRecord(record, prepare)
            );

            this.items.push(...items);
            fetchNextPage();
          },
          (err) => {
            this.loading = false;
            if (err) {
              return;
            }
          }
        );
    },
    findOne(id) {
      return new Promise((resolve, reject) => {
        this._base().find(id, async (err, record) => {
          if (err) {
            reject(err);
            return;
          }
          const rec = this._updateItem(record);
          resolve(rec);
        });
      });
    },
    findMany(ids) {
      return Promise.all(ids.map((id) => this.findById(id)));
    },

    localFindOne(id) {
      return this.items.find((item) => item.id === id);
    },

    localFindMany(ids) {
      return ids.map((id) => this.localFindOne(id));
    },
    collectFields(fields, separate = true) {
      if (separate) {
        const ret = {};
        fields.forEach(
          (field) => (ret[field] = this.items.map((item) => item[field]))
        );
        return ret;
      }
      return this.items.map((item) => {
        const ret = {};
        fields.forEach((field) => (ret[field] = item[field]));
        return ret;
      });
    },

    createOne(data) {
      return new Promise((resolve, reject) => {
        this._base().create(
          [
            {
              fields: {
                ...data,
              },
            },
          ],
          (err, records) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(records);
          }
        );
      });
    },
    updateOne(id, data) {
      return new Promise((resolve, reject) => {
        this._base().update(
          [
            {
              id,
              fields: {
                ...data,
              },
            },
          ],
          (err, records) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(records);
          }
        );
      });
    },
  };

  if (options.selectable) {
    createStateProperty(store, "selected", null);
  }

  return actions;
}

function createStateProperty(store, propertyName, initialValue) {
  if (!Object.prototype.hasOwnProperty(store.$state, propertyName)) {
    const property = ref(initialValue);
    store.$state[propertyName] = property;
  }

  store[propertyName] = toRef(store.$state, propertyName);
}

function prepareRecord(record, prepare) {
  const json = record._rawJson;
  const fields = json.fields;
  delete json.fields;
  const obj = {
    ...json,
    ...fields,
  };
  if (prepare) {
    prepare(obj);
  }
  return obj;
}
