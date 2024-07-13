import { defineStore } from "pinia";
import sift from "sift";

export const useAppointmentStore = defineStore("appointments", {
  fields: [
    "appointment_id",
    "appointment_address",
    "appointment_date",
    "contact_id",
    "contact_name",
    "contact_surname",
    "contact_email",
    "contact_phone",
    "agent_id",
  ],
  pageSize: 10,
  prepare: (record) => {
    record.appointment_date = new Date(record.appointment_date);
  },
  sortBy: [
    {
      field: "appointment_date",
      direction: "desc",
    },
  ],
  state: () => ({
    query: null,
    count: 0,
  }),
  getters: {
    getPage() {
      let items = this.items;

      if (this.query) {
        this.page = 0;
        items = this.items.filter(sift(this.query));
      }
      const start = this.pageSize * this.page;
      const end = start + this.pageSize;
      const filtered = items.slice(start, end);
      this.count = items.length; // side effect
      return filtered;
    },
  },
  actions: {
    
  },
});
