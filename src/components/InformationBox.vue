<script setup lang="ts">

defineProps<{ 
    title: string
    text: string
}>()
</script>

<template>
  
<div class="Content">
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
</div>

</template>

<style scoped>
.Content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto; 
  background-color: #010312;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 80%;
  text-align: center;

}
</style>
