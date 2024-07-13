<template>

    <div class="bg-pink row q-pa-sm rounded-borders items-center">
        <div class="col bg-white rounded-borders">
            <div class="row items-center q-pa-sm">
                <div class="col">
                    <span class="">{{ status }}</span>
                </div>
                <div class="col" v-if="status === 'Upcoming'">{{ timeTo }}</div>
            </div>
        </div>
        <div class="col text-center">
            <q-icon name="alarm" color="white" size="sm"></q-icon><span style="color:#fff">{{ shownDate }}</span>
        </div>
    </div>

</template>
<style scoped></style>
<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

import { computed, ref, toRefs, watch } from "vue";

const props = defineProps(["date", "cancelled"]);

const timeTo = ref(null);
const status = ref('');
const { date, cancelled } = toRefs(props);
const shownDate = computed(() => dayjs(date.value).format('DD/MM/YYYY hh:mm'))
watch([date, cancelled], ([date, cancelled]) => {

    if (cancelled) {
        status.value = "Cancelled";
        return;
    }

    const now = new Date();
    const d = date;

    timeTo.value = dayjs(now).to(d);

    if (now > d) {
        status.value = 'Complete'
    } else if (now < d) {
        status.value = 'Upcoming'
    }

}, { immediate: true })


</script>