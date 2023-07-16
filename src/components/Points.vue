<script setup lang="ts">
import { useStore } from '../store';
import { ref, onMounted, computed } from 'vue';


interface Point {
    name: string
    start: number
    hide: boolean
    color: string
}
const pData = ref<Point[]>([]);

const store = useStore();
const points = ref(store.points);


onMounted(async () => {
  try {

    const pointsResponse = await fetch('points.json');
    const pointsJSON = await pointsResponse.json();
    pData.value = Object.values(pointsJSON);
    
    for (let i = 0; i < pData.value.length; i++) {
        points.value.push(pData.value[i].start);
    }
    store.points = points.value;
  } catch (error) {
    console.error('Error loading choices:', error);
  }
});

const computedPoints = computed(() => {
    return store.points;
});
</script>

<template>

<div class="PUI">
    <span
    v-for="v in computedPoints"
    >{{ v }}</span>
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
