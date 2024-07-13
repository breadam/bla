<template>
    <div class="row no-wrap items-center q-px-sm rounded-borders q-my-sm overflow-hidden">
        <q-chip v-for="agent, index in shownAgents" :key="agent.id"
            :style="{ backgroundColor: agent.selected ? '#eee' : agent.color }" class="col-auto bla-chip"
            :label="getInitials(agent.agent_name, agent.agent_surname)" clickable @click="toggleAgent(index)">
        </q-chip>
        <q-chip class="col-auto bla-chip" :label="showAll ? '<<' : '+' + (agents.length - shownAgents.length)" clickable
            @click="toggleShowAll">
        </q-chip>
    </div>
</template>
<style scoped>
.bla-chip {
    width: 34px;
    height: 34px;
    font-size: 0.6rem;
    margin-left: -14px;
    border: 2px solid #fff;
    user-select: none;
}

.bla-chip:first-child {
    margin: 0;
}
</style>
<script setup>
import { storeToRefs } from 'pinia';
import { useAgentStore } from 'src/stores/agents';
import { useAppointmentStore } from 'src/stores/appointments';
import { getInitials } from "src/lib/string";
import { computed, ref, watch } from 'vue';
const props = defineProps(['width'])
const agentStore = useAgentStore();
const appointmentStore = useAppointmentStore();

const { items: agents } = storeToRefs(agentStore);
const { query } = storeToRefs(appointmentStore);

const shownAgents = computed(() => showAll.value ? agents.value : agents.value.slice(0, 4));
const showAll = ref(false)

watch(agents, (agents) => {

    const selected = agents.filter(a => a.selected).map(a => a.id);

    if (!selected.length) {
        query.value = null;
        return;
    }
    query.value = {
        agent_id: {
            $elemMatch: {
                $in: selected
            }
        }
    }
}, { deep: true })

function toggleShowAll() {
    showAll.value = !showAll.value;
}

function toggleAgent(index) {
    agents.value[index].selected = !agents.value[index].selected;
}

</script>