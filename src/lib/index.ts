import { writable } from "svelte/store"

export const AUTH = writable({
  TOKEN: null as string | null,
  ADMIN: false,
  ID: null as any,
});

export const DATA = writable({
  LOADING: true,
});