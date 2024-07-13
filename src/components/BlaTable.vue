<template>
    <q-table :rows="items" :columns="fields" row-key="id" :pagination="pagination" style="height:80vh"
        class="full-width" :loading="loading">
        <template v-slot:top>

        </template>
    </q-table>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const { store } = defineProps(['store', 'fields'])
const { items, loading } = storeToRefs(store)

const pagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 20
};

onMounted(() => {
    store.fetch();
});

</script>