<script setup lang="ts">
//defineEmits(['update:active'])
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
};

console.log("Length " +props.points.length);

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
    
    <div class="Number">
        <span v-for="point in points">
            <span
                v-if="point !== 0"
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
