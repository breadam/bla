<template>
    <div class="row q-col-gutter-md items-center q-pa-md">
        <div class="col-auto">
            <div class="text-body2">{{ $t("total") }} {{ count }}</div>
        </div>
        <div class="col-auto">
            <q-pagination v-model="page" :max="pageCount" direction-links flat color="grey" active-color="primary"
                boundry-numbers :max-pages="5" />
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";

const props = defineProps(['store'])
const { pageSize, count, page } = storeToRefs(props.store);
const pageCount = computed(() => count.value ? Math.floor(count.value / pageSize.value) : 0);

</script>