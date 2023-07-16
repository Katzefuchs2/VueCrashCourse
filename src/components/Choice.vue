<script setup lang="ts">
//defineEmits(['update:active'])
import { onMounted, ref} from 'vue';
import { useStore } from '../store';
interface Point {
    name: string
    start: number
    hide: boolean
    color: string
}
const store = useStore();
const pointData = ref<Point[]>([]);

const props = defineProps<{ 
    title: string
    text: string
    url: string
    points: Array<number>
    active: boolean
}>()
const emits = defineEmits(['update:active']);

const toggleCheckbox = () => {
    emits('update:active', !props.active);
    
    let sum = [];
    for(var i = 0; i < store.points.length; i++){
        if (props.active) {
            sum.push(store.points[i] + props.points[i]);
        } else {
            sum.push(store.points[i] - props.points[i]);
        }
        
    }
    
    s
    store.points = sum;
};

//console.log("Length " +props.points.length);

onMounted(async () => {
  try {
    const response = await fetch('points.json');
    const data = await response.json();
    pointData.value = Object.values(data);

    console.log("Length " + pointData.value.length);
  } catch (error) {
    console.error('Error loading points:', error);
  }
});

</script>

<template>
  

<div class="Container"
    @click="toggleCheckbox"
    :style="{
        backgroundColor: active ? '#0d165b' : '#070c33',
        color: active ? 'white' : 'grey'
    }"
>
    <img :src=props.url alt="IMAGE" class="Image">

    <!-- @change="$emit('update:active', $event!.target!.checked)" -->
    <div class="Content">
        <input type="checkbox"
        :checked="active"
        
        @change="$emit('update:active', ($event.target as HTMLInputElement).checked)"

    >

        <h3>{{ title }}</h3>
        <p>{{ text }}</p>
    </div>
    
    <div class="Number" v-if="pointData.length > 0">
        <span v-for="(point, index) in points">
            <span
                v-if="point !== 0 && pointData[index].hide !== true"
                :style="{ color: pointData[index].color }"
            >
                [{{ point }}]
            </span>
        </span>
        
    </div>

    
</div>


</template>

<style scoped>

input[type=checkbox] {
    transform: scale(1.5);
    margin-right: 10px;
    display: none;
}

.Container {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.Image {
    width: 150px;
    height: 150px;
    border-radius: 5%;
    margin-right: 10px;
}

.Content {
    text-align: left;
    margin-left: 10px;
}

h3 {
    margin: 0;
}

.Number {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px;
    font-weight: 1000;
    
}
</style>
