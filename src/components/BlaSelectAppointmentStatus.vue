<template>
    <q-select :options="options" v-model="selected" outlined rounded dense bg-color="white" :label="$t('status')"
        class="bla-select" emit-value></q-select>
</template>
<style scoped>
.bla-select {
    width: 96px;
}
</style>
<script setup>
import { ref, watch } from "vue"
import { useAppointmentStore } from 'src/stores/appointments';
import { storeToRefs } from "pinia";

const options = [
    {
        label: "All",
        value: "all"
    },
    {
        label: "Cancelled",
        value: "cancelled"
    },
    {
        label: "Upcoming",
        value: "upcoming"
    },
    {
        label: "Completed",
        value: "completed"
    },
]
const selected = ref(options[0]);
const appointmentStore = useAppointmentStore();
const { query } = storeToRefs(appointmentStore);

watch(selected, (selected) => {

    switch (selected) {
        case 'upcoming':
            query.value = {
                appointment_date: {
                    $gt: Date.now(),
                },
                is_cancelled: {
                    $ne: true
                }
            };
            break;
        case 'completed':
            query.value = {
                appointment_date: {
                    $lt: Date.now(),
                },
                is_cancelled: {
                    $ne: true
                }
            };
            break;
        case 'all':
            query.value = null;
            break;
        case 'cancelled':
            query.value = {
                is_cancelled: true
            };
            break;
    }

});
</script>