<template>
    <div>
        <q-icon :name="icon"></q-icon>
        {{ text }}
    </div>
</template>
<script setup>
const props = defineProps(['text', 'icon'])
</script>