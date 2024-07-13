<template>
    <bla-toolbar-input :label="$t('search')" v-model="term"></bla-toolbar-input>
</template>
<script setup>
import BlaToolbarInput from "src/components/BlaToolbarInput.vue"
import { ref, watch } from "vue"
import { useAppointmentStore } from 'src/stores/appointments';
import { storeToRefs } from 'pinia';

const term = ref('');
const appointmentStore = useAppointmentStore();

const { query } = storeToRefs(appointmentStore);

watch(term, (term) => {

    if (!term) {
        query.value = {}; // appointmentStore.resetQuery()
        return;
    }

    if(term.length < 3){
        return;
    }

    const q1 = {
        $regex: term,
        $options: "i"
    };
    const q2 = {
        $elemMatch: q1
    }

    query.value = {
        $or:[
            {
                contact_name: q2,
            },
            {
                contact_surname: q2
            },
            {
                contact_phone: q2,
            },
            {
                contact_email: q2,
            },
            {
                appointment_address: q1
            }
        ]
    }

})

</script>