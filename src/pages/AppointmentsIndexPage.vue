<template>
    <bla-page>
        <div class="column self-stretch full-width">
            <div class="col-auto gt-sm">
                <q-toolbar class="bg-primary">
                    <div class="row items-center q-col-gutter-md justify-between full-width">
                        <div class="col-auto">
                            <bla-select-appointment-agents></bla-select-appointment-agents>
                        </div>
                        <div class="col-auto">
                            <bla-select-appointment-status></bla-select-appointment-status>
                        </div>
                        <div class="col-auto">
                            <bla-select-appointment-date></bla-select-appointment-date>
                        </div>
                        <div class="col-auto">
                            <bla-search></bla-search>
                        </div>
                    </div>
                </q-toolbar>
            </div>
            <div class="col relative-position">
                <q-scroll-area class="full-height q-px-md" v-if="!loading">
                    <div class="column justify-between">
                        <div v-for="appointment in getPage" :key="appointment.id" class="col flex flex-center ">
                            <bla-appointment-item v-bind="appointment" class="full-width"></bla-appointment-item>
                        </div>
                    </div>
                </q-scroll-area>
                <div class="fullsize flex flex-center" v-else>
                    <q-spinner></q-spinner>
                </div>
            </div>
            <div class="col-auto row justify-end">
                <bla-pagination :store="appointmentStore"></bla-pagination>
            </div>
        </div>
    </bla-page>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import BlaPage from 'src/components/BlaPage.vue';
import BlaAppointmentItem from 'src/components/BlaAppointmentItem.vue';
import BlaSelectAppointmentStatus from 'src/components/BlaSelectAppointmentStatus.vue';
import BlaSelectAppointmentAgents from 'src/components/BlaSelectAppointmentAgents.vue';
import BlaSelectAppointmentDate from 'src/components/BlaSelectAppointmentDate.vue';
import BlaSearch from 'src/components/BlaSearch.vue';
import BlaPagination from 'src/components/BlaPagination.vue';
import { useAppointmentStore } from 'src/stores/appointments'
import { useAgentStore } from 'src/stores/agents';
import { useContactStore } from 'src/stores/contacts';

const appointmentStore = useAppointmentStore();
const agentStore = useAgentStore();
const contactStore = useContactStore();

const { getPage, loading } = storeToRefs(appointmentStore);

appointmentStore.fetch();
agentStore.fetch();
contactStore.fetch();

</script>