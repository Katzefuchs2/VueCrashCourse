<script setup lang="ts">

//defineEmits(['update:active'])
const props = defineProps<{ 
    title: string
    text: string
    url: string
    points: number
    active: boolean
}>()
const emits = defineEmits(['update:active']);

const toggleCheckbox = () => {
  emits('update:active', !props.active);
};

console.log(props.url);
</script>

<template>
  

<div class="Choice"
    @click="toggleCheckbox"
    :style="{
        backgroundColor: active ? '#0d165b' : '#070c33',
        color: active ? 'white' : 'grey'
    }"
>
    <img :src=props.url alt="IMAGE">

    <div>
        <input type="checkbox"
        :checked="active"
        
        @change="$emit('update:active', $event!.target!.checked)"
    >

    <h3>{{ title }}</h3>

    
    
    <br>
    <label>{{ text }}</label>
    </div>
    
    <label class="Cost"
    :style="{
            color: 
                points == 0 ? 'grey' :
                points < 0 ? 'red' : 'lime'
        }"
    > {{ points }} </label>
</div>


</template>

<style scoped>
.Choice {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
   
    background-color: #070c33;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width : 100%;
    text-align: left;
}

.Cost {
    position: relative;
    font-weight: 1000;
    text-align: right;
}

input[type=checkbox] {
    transform: scale(1.5);
    margin-right: 10px;
    display: none;
}

img {
    width: 150px;
    height: 150px;
    border-radius: 5%;
    margin-right: 10px;
}
    
</style>
