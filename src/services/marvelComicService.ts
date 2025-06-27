import type { MarvelComicsResponse } from '@/types/comics';
import axios from 'axios';
import md5 from 'md5';

const publicKey = import.meta.env.VITE_APP_MARVEL_PUBLIC_API_KEY;
const privateKey = import.meta.env.VITE_APP_MARVEL_PRIVATE_API_KEY;
const MARVEL_API = 'https://gateway.marvel.com/v1/public';

/**
 * Axios HTTP client instance pre-configured for the Marvel API.
 *
 * @remarks
 * This client sets the `baseURL` to the Marvel API endpoint and configures
 * default headers for JSON content type and acceptance.
 *
 * @see {@link https://axios-http.com/docs/instance}
 */
const axiosClient = axios.create({
    baseURL: MARVEL_API,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

/**
 * Retrieves a list of Marvel comics from the API.
 *
 * Sends a GET request to the `/comics` endpoint using authentication parameters
 * (timestamp, public key, and hash). Returns the response data as a `MarvelComicsResponse`
 * object if successful.
 *
 * @returns A promise that resolves to a `MarvelComicsResponse` object containing the comics data,
 * or `undefined` if the request fails.
 * @throws Throws an error if the request fails.
 */
export const retrieveComics = async (): Promise<MarvelComicsResponse | undefined> => {
    const ts = Date.now().toString();
    return axiosClient.get('/comics', {
        params: {
            ts,
            apikey: publicKey,
            hash: md5(ts + privateKey + publicKey),
        },
    }).then(response => {
        return response.data as MarvelComicsResponse;
    }).catch( error => {
        if (axios.isAxiosError(error)) {
            console.log(error.message);
        }
        throw error;
    })
};
