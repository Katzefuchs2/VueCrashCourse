<script setup lang="ts">
import {ref, onMounted} from 'vue'
import MultipleChoice from './MultipleChoice.vue'
import InformationBox from './InformationBox.vue'
import ImageComponent from './ImageComponent.vue'

const props = defineProps<{ 
    myKey: string
}>()

let type = 0;
let index = 0;

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

interface Information {
    title: string;
    text: string;
}

interface Img {
    url: string;
}

const groups = ref<Group[]>([]);
const information = ref<Information[]>([]);
const images = ref<Img[]>([]);

onMounted(async () => {
  try {
    const responseGroups = await fetch('groups.json');
    const responseInformation = await fetch('information.json');
    const responseImages = await fetch('images.json');

    const dataGroups = await responseGroups.json();
    const dataInformation = await responseInformation.json();
    const dataImages = await responseImages.json();

    groups.value = Object.values(dataGroups);
    information.value = Object.values(dataInformation);
    images.value = Object.values(dataImages);
    
    if (dataInformation.hasOwnProperty(props.myKey)) {
        type = 1;
        index = Object.keys(dataInformation).indexOf(props.myKey);
    } else if (dataImages.hasOwnProperty(props.myKey)) {
        type = 2;
        index = Object.keys(dataImages).indexOf(props.myKey);
    } else if (dataGroups.hasOwnProperty(props.myKey)) {
        type = 0;
        index = Object.keys(dataGroups).indexOf(props.myKey);
    } else {
        console.error('Error: '+ props.myKey +' not found');
    }

    
    
  } catch (error) {
    console.error('Error loading choices:', error);
  }
});


</script>

<template>

    <MultipleChoice
        v-if="groups.length > 0 && type === 0"
        :label="groups[index].title"
        :choices="groups[index].choices"
        :locked="groups[index].locked"
    />
    <InformationBox
        v-if="type === 1"
        :title="information[index].title"
        :text="information[index].text"
    />
    <ImageComponent
        v-if="type === 2"
        :url="images[index].url"
    />
</template>

<style scoped>

</style>
