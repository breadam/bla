<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleDrawer" class="lt-md" />

        <q-toolbar-title>
          Bla Real Estate
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn @click="modalOpen = !modalOpen" icon="add" flat>Create Appointment</q-btn>
      </q-toolbar>
    </q-header>

    <bla-drawer v-model="drawerOpen"></bla-drawer>

    <q-page-container>
      <router-view />
      <bla-modal-appointment-form v-model="modalOpen"></bla-modal-appointment-form>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import BlaDrawer from 'src/components/BlaDrawer.vue'
import BlaModalAppointmentForm from 'src/components/BlaModalAppointmentForm.vue'

defineOptions({
  name: 'MainLayout'
})

const drawerOpen = ref(false);
const modalOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value
}
</script>
