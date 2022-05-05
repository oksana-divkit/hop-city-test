import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

const onlineStore: Writable<boolean> = writable(navigator.onLine);

const handleStatus = (): void => {
    onlineStore.set(navigator.onLine);
};

window.addEventListener('online', handleStatus);
window.addEventListener('offline', handleStatus);

export default {
    subscribe: onlineStore.subscribe,
}
