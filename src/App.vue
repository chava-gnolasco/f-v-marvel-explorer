<template>
  <h1>App.vue</h1>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import { retrieveComics } from './services/marvelComicService';

onMounted(async () => {
  const comics = await retrieveComics();
  console.log(comics);
});
</script>

