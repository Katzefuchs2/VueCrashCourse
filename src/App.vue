<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Points from './components/Points.vue'
/*import MultipleChoice from './components/MultipleChoice.vue'
import InformationBox from './components/InformationBox.vue'
import ImageComponent from './components/ImageComponent.vue'*/
import Node from './components/Node.vue'

const startPoints = 10;
let currentPoints = startPoints;
console.log(currentPoints);


interface Choice {
  title: string;
  text: string;
  url: string;
  points: number[];
  active: boolean;
}

interface Group {
  title: string;
  locked: boolean;
  choices: Choice[];
}

interface Node {
  key: string;
}

const groups = ref<Group[]>([]);
const nodes = ref<Node[]>([]);

function calculatePoints(): number {
  let points = startPoints;
  const allChoices = groups.value.flatMap(group => group.choices);
  for (let i = 0; i < allChoices.length; i++) {
    if (allChoices[i].active) {
      points += allChoices[i].points[0];
    }
  }
  return points;
}

/*function handleMultipleChoiceChange(): void {
  currentPoints = calculatePoints();
}*/

onMounted(async () => {
  try {
    const response = await fetch('groups.json');
    const data = await response.json();
    groups.value = Object.values(data);

    const nodesResponse = await fetch('nodes.json');
    const nodesData = await nodesResponse.json();
    nodes.value = Object.values(nodesData);
    


    /*console.log(Object.keys(data)[0]);
    console.log(data.find((group: { title: string; }) => group.title === "Group1"));
    */
    console.log(nodes.value[0].key);
  } catch (error) {
    console.error('Error loading choices:', error);
  }
});

</script>

<template>
<!-- <InformationBox 
  title="Title"
  text="Text"
/>
<ImageComponent />
<MultipleChoice
  v-for="group in groups"
  :label="group.title"
  :choices="group.choices"
  :locked="group.locked"
  @change="handleMultipleChoiceChange"
/>
<InformationBox 
  v-if="calculatePoints() >= 13"
  title="You Win!"
  text=""
/> -->

<Node 
  v-for= "node in nodes"
  :myKey="node.key"
/>
<button class="EndGame">END GAME</button>
<br><br><br><br>
<Points 
  :points="calculatePoints()" 
/>

</template>

<style scoped>

.EndGame {
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
  font-weight: 1000;
}

</style>
