<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
            <q-header class="bg-primary">
                <q-toolbar>
                    <q-toolbar-title>{{ appointment ? 'Edit' : 'New' }} Appointment</q-toolbar-title>
                    <q-btn flat round dense icon="close" @click="onDialogCancel" />
                </q-toolbar>
            </q-header>

            <q-footer class="bg-white">
                <q-toolbar>
                    <q-btn color="primary" @click="save">Save</q-btn>
                    <q-space></q-space>
                    <q-btn color="black" @click="onDialogCancel">Cancel</q-btn>
                </q-toolbar>
            </q-footer>

            <q-page-container>
                <q-page padding>
                    <div class="column q-col-gutter-md">
                        <div class="col">
                            <q-select label="Search Contacts" outlined rounded v-model="selectedContact"
                                :options="contactOptions" option-label="contact_name" option-value="contact_id"
                                use-input @filter="filterFn" v-if="!selectedContact"></q-select>
                            <q-field v-else outlined rounded>
                                <div class="q-pa-md">
                                    <bla-contact :name="selectedContact.contact_name"
                                        :surname="selectedContact.contact_surname"
                                        :email="selectedContact.contact_email" :phone="selectedContact.contact_phone"
                                        :id="selectedContact.contact_id"></bla-contact>
                                </div>
                                <q-btn flat icon="delete" circular class="absolute-top-right"
                                    @click="clearContact"></q-btn>
                            </q-field>
                        </div>
                        <div class="col">
                            <q-input label="Address" v-model="data.appointment_address" outlined rounded></q-input>
                        </div>
                        <div class="col">
                            <q-select label="Agent" outlined rounded v-model="selectedAgent" :options="agents"
                                option-label="agent_name" option-value="number" multiple emit-value
                                map-options></q-select>
                        </div>
                        <div class="col">
                            <q-input label="Date" v-model="data.appointment_date" type="datetime-local" outlined
                                rounded></q-input>
                        </div>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { storeToRefs } from 'pinia';
import { useContactStore } from 'src/stores/contacts';
import { reactive, ref, toRefs, watch } from 'vue';
import { useAgentStore } from 'src/stores/agents';
import BlaContact from 'src/components/BlaContact.vue';
import { useAppointmentStore } from 'src/stores/appointments';

const props = defineProps(['appointment']);
defineEmits([
    ...useDialogPluginComponent.emits
])
const $q = useQuasar();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const { appointment } = toRefs(props);
const selectedContact = ref(null);
const selectedAgent = ref(null);
const appointmentStore = useAppointmentStore();
const contactStore = useContactStore();
const agentStore = useAgentStore();
const { items: contacts } = storeToRefs(contactStore);
const { items: agents } = storeToRefs(agentStore);
const contactOptions = ref(null);

const data = reactive({});

watch(appointment, (appointment) => {
    if (!appointment) {
        Object.assign(data, {});
        return;
    }

    const { appointment_date, appointment_address, contact_id, agent_id } = appointment;

    selectedContact.value = contactStore.localFindOne(contact_id[0]);
    if (agent_id) {
        selectedAgent.value = agentStore.localFindMany(agent_id);
    } else {
        selectedAgent.value = [];
    }

    Object.assign(data, {
        appointment_date,
        appointment_address
    })

}, { immediate: true })

function filterFn(val, update) {
    if (val === '') {
        update(() => {
            contactOptions.value = contacts.value
        })
        return
    }

    update(() => {
        const needle = val.toLowerCase()
        contactOptions.value = contacts.value.filter(v => v.contact_name.toLowerCase().indexOf(needle) > -1)
    })
}

function clearContact() {
    selectedContact.value = null;
}

async function save() {
    const contact = selectedContact.value;
    const payload = {
        ...data,
        //agent_id: selectedAgent.value,
        contact_id: contact.contact_id,
        contact_name: contact.contact_name,
        contact_surname: contact.contact_surname,
        contact_email: contact.contact_email,
        contact_phone: contact.contact_phone,
    }

    try {
        if (appointment.value) {
            ret = await appointmentStore.updateOne(appointment.value.appointment_id, payload)
        } else {
            ret = await appointmentStore.createOne(payload)
        }
        onDialogOK();
    } catch (err) {
        // wrap this inside a global utility function
        $q.notify({
            message: err.toString(),
            position: 'top',
            color: 'black'
        })
    }
}
</script>