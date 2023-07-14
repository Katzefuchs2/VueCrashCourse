<script setup lang="ts">

defineProps<{ 
    points: number
    
}>()

/*function calculatePoints(): number {
  let points = 10;
  const allChoices = groups.value.flatMap(group => group.choices);
  for (let i = 0; i < allChoices.length; i++) {
    if (allChoices[i].active) {
      points += allChoices[i].points;
    }
  }
  return points;
}*/

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
    margin-top: 0.5rem; 
}
</style>
