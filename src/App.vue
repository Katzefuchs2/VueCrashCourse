<script setup lang="ts">
import {ref, onMounted} from 'vue'
import MultipleChoiceLocked from './components/MultipleChoiceLocked.vue';
import PointsUI from './components/PointsUI.vue'
import MultipleChoice from './components/MultipleChoice.vue'

const startPoints = 10;
let currentPoints = startPoints;

/*
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
*/

const choices = ref<Array<{ label: string, points: number, active: boolean }>>([]);
const choicesLocked = ref<Array<{ label: string, points: number, active: boolean }>>([]);

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
    // Fetch choices from JSON file
    const response = await fetch('data.json');
    const data = await response.json();
    //console.log("Hello " + data.name);
    // Assign fetched choices to the ref variables
    choices.value = data.choices;
    choicesLocked.value = data.choicesLocked;
  } catch (error) {
    console.error('Error loading choices:', error);
  }
});

</script>

<template>

  <MultipleChoice 
    v-if = "choices.length > 0"
    label="Free Group" 
    :choices="choices" 
    @change="handleMultipleChoiceChange"
  />

  <MultipleChoiceLocked 
    v-if = "choices.length > 0"
    label="Locked Group" 
    :choices="choicesLocked" 
    @change="handleMultipleChoiceChange"
  />

  <PointsUI :points="calculatePoints()" />
  
</template>

<style scoped>

</style>
