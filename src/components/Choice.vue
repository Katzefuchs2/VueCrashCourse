<script setup lang="ts">

//defineEmits(['update:active'])
const props = defineProps<{ 
    label: string, 
    points: number
    active: boolean
}>()
const emits = defineEmits(['update:active']);

const toggleCheckbox = () => {
  emits('update:active', !props.active);
};


</script>

<template>
  

<div class="Choice"
    @click="toggleCheckbox"
    :style="{
        backgroundColor: active ? '#0d165b' : '#070c33',
        color: active ? 'white' : 'grey'
    }"
>
<img src="https://pawzlove-media.s3.us-east-2.amazonaws.com/images/urlscan/21709/urlscan_image/0a52f09935dfab6d4351b339162ec47f.jpg" alt="Flowers in Chania">
    <input type="checkbox"
        :checked="active"
        
        @change="$emit('update:active', $event!.target!.checked)"
    >

    

    <label>  {{ label }}  </label>

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
