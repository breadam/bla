<template>
    <div class="row no-wrap q-col-gutter-sm">
        <bla-toolbar-input type="date" :label="$t('from')" v-model="fromDate" clearable></bla-toolbar-input>
        <bla-toolbar-input type="date" :label="$t('to')" v-model="toDate" clearable></bla-toolbar-input>
    </div>
</template>
<script setup>
import BlaToolbarInput from "src/components/BlaToolbarInput.vue"
import { ref, watch } from "vue"
import { useAppointmentStore } from 'src/stores/appointments';
import { storeToRefs } from "pinia";

const fromDate = ref('');
const toDate = ref('');
const appointmentStore = useAppointmentStore();
const { query } = storeToRefs(appointmentStore);

watch([fromDate, toDate], ([from, to]) => {

    const appointment_date = {};

    if (!to && !from) {
        query.value = null;
        return;
    }


    if (from) {
        appointment_date.$gte = new Date(from)
    }

    if (to) {

        if(to < from){
            alert('err');
            return;
        }

        appointment_date.$lte = new Date(to)
    }

    query.value = {
        appointment_date
    }

})

</script>