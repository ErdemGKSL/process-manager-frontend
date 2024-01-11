import { writable } from "svelte/store"

// place files you want to import through the `$lib` alias in this folder.
export const AUTH = {
  TOKEN: null as string | null,
  ADMIN: false
}

export const DATA = writable({
  LOADING: true,
})