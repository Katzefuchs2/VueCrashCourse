<script setup lang="ts">
import {ref} from 'vue'
import MultipleChoiceLocked from './components/MultipleChoiceLocked.vue';
import PointsUI from './components/PointsUI.vue'
import MultipleChoice from './components/MultipleChoice.vue'

const startPoints = 10;
let currentPoints = startPoints;

const choices = ref([
  {
    label: "Choice 1",
    points: -1,
    active: false
  },
  {
    label: "Choice 2 efsfsdfsdfsd",
    points: 2,
    active: false
  },
  {
    label: "Choice 3",
    points: 0,
    active: false
  }
])

const choicesLocked = ref([
  {
    label: "Bad",
    points: 0,
    active: false
  },
  {
    label: "Worse",
    points: -1,
    active: false
  },
  {
    label: "Worst",
    points: -2,
    active: false
  }
])

/*const checkPoints = computed(() => {
  currentPoints = startPoints;
  for (let i = 0; i < choices.value.length; i++) {
    if (choices.value[i].active) {
      currentPoints += choices.value[i].points;
    }
  }
})*/

function calculatePoints(): number {
  let points = startPoints;
  const allChoices = [...choices.value, ...choicesLocked.value]
  console.log(allChoices);
  for (let i = 0; i < allChoices.length; i++) {
    if (allChoices[i].active) {
      points += allChoices[i].points;
    }
  }
  return points;
}

function handleMultipleChoiceChange(): void {
  console.log("handleMultipleChoiceChange")
  currentPoints = calculatePoints();
}

</script>

<template>

  <MultipleChoice 
    label="Free Group" 
    :choices="choices" 
    @change="handleMultipleChoiceChange"
  />

  <MultipleChoiceLocked 
    label="Locked Group" 
    :choices="choicesLocked" 
    @change="handleMultipleChoiceChange"
  />

  <PointsUI :points="calculatePoints()" />

  <button @click="console.log(choices[0].active)">DEBUG</button>
  
</template>

<style scoped>

</style>
