import { writable } from 'svelte/store';

export const userId = writable('');
export const language = writable('it');
export const isMenuOpen = writable(false);
export const translations = writable([]);
export const navbar = writable({});
export const footer = writable({});