<script setup lang="ts">

import Choice from './Choice.vue'

const props = defineProps<{ 
    label: string, 
    choices: Array<{title: string, text: string, url: string, points: number[], active: boolean}>
    locked: boolean
}>()

const updateChoiceActive = (choice: { active: boolean }, newValue: boolean) => {
  choice.active = newValue;
};

const updateChoiceActiveLocked = (choice: { active: boolean }, newValue: boolean) => {
    props.choices[0].active = true;
    if (newValue) {
        // Deactivate all other choices
        for (const otherChoice of props.choices) {
            if (otherChoice !== choice) {
                otherChoice.active = false;
            }
        }
    } else if (choice === props.choices[0]) {
        newValue = true;
    }
  choice.active = newValue;

};
if (props.locked) {
    props.choices[0].active = true;
}
</script>

<template>

<div class="ChoiceGroup">
  <h2 
    style=""
  >{{ label }}</h2>
  <Choice
    v-for="c in choices"
    :key="c.title"
    :title="c.title"
    :text="c.text"
    :url="c.url"
    :points="c.points"
    :active="c.active"
    @update:active="locked ? updateChoiceActiveLocked(c, $event) : updateChoiceActive(c, $event)"
  />
</div>


</template>

<style scoped>
.ChoiceGroup {
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
