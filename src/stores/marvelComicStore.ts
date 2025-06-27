import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

import type { MarvelComicsResponse } from '@/types/comics';
import { getComics } from '@/services/marvelComicService';


/**
 * Pinia store for managing and retrieving Marvel comics data.
 *
 * This store provides methods to asynchronously load and retrieve a list of Marvel comics,
 * caching the result in a reactive variable. If the comics data is not loaded or the response
 * is invalid, it will automatically fetch the data before returning it.
 *
 * @returns An object containing methods for retrieving Marvel comics.
 *
 * @example
 * const marvelComicStore = useMarvelComicStore();
 * const comicsRef = await marvelComicStore.retrieveComics();
 */
export const useMarvelComicStore = defineStore('marvelComicStore', () => {

    const comics: Ref<MarvelComicsResponse | undefined> = ref();

    /**
     * Asynchronously loads the list of comics and updates the `comics` reactive variable.
     * Fetches the comics data using the `getComics` function and assigns the result to `comics.value`.
     *
     * @returns {Promise<void>} A promise that resolves when the comics have been loaded.
     */
    const loadComics = async () => {
        comics.value = await getComics();
    };

    /**
     * Retrieves the list of Marvel comics.
     *
     * If the comics have not been loaded or the response code is not 200,
     * it triggers the loading of comics data. Returns a ref containing the
     * MarvelComicsResponse or undefined.
     *
     * @returns {Promise<Ref<MarvelComicsResponse | undefined>>} A promise that resolves to a ref holding the comics response or undefined.
     */
    const retrieveComics = async (): Promise<Ref<MarvelComicsResponse | undefined>> => {
        if (comics.value?.code !== 200) {
            await loadComics();
        }

        return comics;
    };

    return {
        comics,
        retrieveComics,
    };
});
