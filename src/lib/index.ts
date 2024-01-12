import { writable } from "svelte/store"

// place files you want to import through the `$lib` alias in this folder.
export const AUTH = writable({
  TOKEN: null as string | null,
  ADMIN: false,
  ID: null as any,
});

export const DATA = writable({
  LOADING: true,
});