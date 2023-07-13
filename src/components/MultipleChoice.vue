<script setup lang="ts">

import Choice from './Choice.vue'

defineProps<{ 
    label: string, 
    choices: Array<{label: string, points: number, active: boolean}>
}>()

const emits = defineEmits(['update:active', 'change']);

// Function to update the active state of a choice
const updateChoiceActive = (choice: { active: boolean }, newValue: boolean) => {
  choice.active = newValue;
  emits('update:active', newValue);
  emits('change'); // Emit the "change" event
};
</script>

<template>

<div class="FreeChoiceGroup">
  <h2 
    style=""
  >{{ label }}</h2>
  <Choice
    v-for="c in choices"
    :key="c.label"
    :label="c.label"
    :points="c.points"
    :active="c.active"
    @update:active="updateChoiceActive(c, $event)"
  />
</div>


</template>

<style scoped>
.FreeChoiceGroup {
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
