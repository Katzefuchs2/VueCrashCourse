<script setup lang="ts">

defineProps<{ 
    points: number
}>()

</script>

<template>

<div class="PUI">
    <p>{{ points }}</p>
</div>


</template>

<style scoped>
.PUI {
    display: flex;
    justify-content: space-around;
    background-color: #070c33;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    font-weight: 1000;
}
</style>
