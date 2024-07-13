
<template>
    <div class="column">
        <div class="col">
            <bla-icon-text icon="person" :text="name + ' ' + surname"></bla-icon-text>
        </div>
        <div class="col">
            <bla-icon-text icon="mail" :text="email"></bla-icon-text>
        </div>
        <div class="col">
            <bla-icon-text icon="phone" :text="phone"></bla-icon-text>
        </div>
    </div>
</template>
<script setup>
import BlaIconText from 'src/components/BlaIconText.vue';
const props = defineProps(["name", "surname", "id", "phone", "email"])
</script>