<template>
    <q-drawer behavior="mobile" bordered>
        <div class="column q-col-gutter-md q-pa-md">
            <div class="col">
                <q-scroll-area style="width:'100%';height:60px;">
                    <bla-select-appointment-agents></bla-select-appointment-agents>
                </q-scroll-area>
            </div>
            <div class="col">
                <bla-select-appointment-status></bla-select-appointment-status>
            </div>
            <div class="col">
                <bla-select-appointment-date></bla-select-appointment-date>
            </div>
            <div class="col">
                <bla-search></bla-search>
            </div>
        </div>
    </q-drawer>
</template>
<script setup>
import BlaSelectAppointmentStatus from 'src/components/BlaSelectAppointmentStatus.vue';
import BlaSelectAppointmentAgents from 'src/components/BlaSelectAppointmentAgents.vue';
import BlaSelectAppointmentDate from 'src/components/BlaSelectAppointmentDate.vue';
import BlaSearch from 'src/components/BlaSearch.vue';
</script>