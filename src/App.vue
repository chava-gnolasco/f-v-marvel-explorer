
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useMarvelComicStore } from '@/stores/marvelComicStore';
import HeroSection from './components/HeroSection.vue';

const marvelComicStore = useMarvelComicStore();

onMounted(async () => {
  await marvelComicStore.retrieveComics();
});
</script>

<template>
  <main>
    <HeroSection />
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-4">Featured Comics</h2>
      <div v-if="marvelComicStore.comics?.code !== 200">
        Loading comics...
      </div>
      <ul v-else>
        <li
          v-for="result in marvelComicStore.comics?.data.results"
          class="py-2 px-4 border-b border-gray-200 hover:bg-gray-100 transition"
        >
          {{ result.title }}
        </li>
      </ul>
    </div>
  </main>
</template>
