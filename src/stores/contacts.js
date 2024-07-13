import { defineStore } from "pinia";

export const useContactStore = defineStore("contacts", {
  fields: [
    "contact_id",
    "contact_name",
    "contact_surname",
    "contact_phone",
    "contact_email",
  ],
  state: () => ({}),
  getters: {
    getContact(state) {
      return (id) => this.localFindOne(id);
    },
  },
  actions: {},
});
