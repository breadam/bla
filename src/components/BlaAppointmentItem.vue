<template>
    <div class="row items-center bg-grey-2 q-pa-md rounded-borders" @click="openEditModal">
        <div class="col-12 col-md-4">
            <bla-contact :name="contact_name[0]" :surname="contact_surname[0]" :email="contact_email[0]"
                :phone="contact_phone[0]" :id="contact_id[0]"></bla-contact>
        </div>
        <div class="col-12 col-md-2 overflow-hidden">{{ appointment_address }}</div>
        <div class="col-12 col-md-4">
            <bla-appointment-status :date="appointment_date" :cancelled="is_cancelled"></bla-appointment-status>
        </div>
        <div class="col-12 col-md-2 q-px-md">
            <template v-if="agents">
                <q-avatar v-for="agent in agents" :key="agent.id" size="md" :style="{ backgroundColor: agent.color }"
                    class="agent">{{
        agent.name
    }}</q-avatar>
            </template>
        </div>
    </div>
</template>
<style scoped>
.agent {
    margin-left: -12px;
    color: #fff;
}

.agent:first-child {
    margin: 0;
}
</style>
<script setup>
import { useAgentStore } from 'src/stores/agents';
import { computed, toRefs } from 'vue';
import BlaAppointmentStatus from 'src/components/BlaAppointmentStatus.vue';
import BlaContact from 'src/components/BlaContact.vue';
import { getInitials } from 'src/lib/string';
import { useQuasar } from 'quasar'
import BlaModalAppointmentForm from 'src/components/BlaModalAppointmentForm.vue';

const agentStore = useAgentStore();

const props = defineProps([
    'id',
    'appointment_id',
    'appointment_date',
    'appointment_address',
    'contact_id',
    'contact_name',
    'contact_surname',
    'contact_phone',
    'contact_email',
    'agent_id',
    'is_cancelled',
]);

const { agent_id } = toRefs(props);
const $q = useQuasar()
const agents = computed(() => {
    if (!agent_id.value) {
        return;
    }

    return agentStore.getAgents(agent_id.value).map(agent => ({
        name: getInitials(agent.agent_name, agent.agent_surname),
        color: agent.color,
        id: agent.number
    }))
});

function openEditModal() {

    $q.dialog({
        component: BlaModalAppointmentForm,
        componentProps: {
            appointment: {
                ...props,
                appointment_date:props.appointment_date.toISOString().slice(0, 19)
            }
        }
    })
}

</script>