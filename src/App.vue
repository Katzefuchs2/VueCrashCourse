<script setup lang="ts">
import {ref, onMounted} from 'vue'
import PointsUI from './components/PointsUI.vue'
import MultipleChoice from './components/MultipleChoice.vue'

const startPoints = 10;
let currentPoints = startPoints;
console.log(currentPoints);

interface Choice {
  title: string;
  text: string;
  url: string;
  points: number;
  active: boolean;
}

interface Group {
  title: string;
  locked: boolean;
  choices: Choice[];
}

const groups = ref<Group[]>([]);

function calculatePoints(): number {
  let points = startPoints;
  const allChoices = groups.value.flatMap(group => group.choices);
  for (let i = 0; i < allChoices.length; i++) {
    if (allChoices[i].active) {
      points += allChoices[i].points;
    }
  }
  return points;
}

function handleMultipleChoiceChange(): void {
  currentPoints = calculatePoints();
}

onMounted(async () => {
  try {
    const response = await fetch('testData.json');
    const data = await response.json();
    
    groups.value = Object.values(data);
    console.log("Hello " + groups.value[0].title);
  } catch (error) {
    console.error('Error loading choices:', error);
  }
});

</script>

<template>
  
<MultipleChoice
  v-for="group in groups"
  :label="group.title"
  :choices="group.choices"
  :locked="group.locked"
  @change="handleMultipleChoiceChange"
/>
  <br><br>
  <PointsUI :points="calculatePoints()" />

</template>

<style scoped>

</style>
