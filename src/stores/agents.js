import { defineStore } from "pinia";

export const useAgentStore = defineStore("agents", {
  fields: ["number", "agent_name", "agent_surname", "color"],
  state: () => ({}),
  getters: {
    getAgents(state) {
      return (ids) => this.localFindMany(ids).filter((item) => item); // fix
    },
  },
  actions: {},
});
