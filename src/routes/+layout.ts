import type { LayoutLoad, LayoutLoadEvent } from "./$types";
import { redirect } from '@sveltejs/kit';

// export async function load() {
  
// } satisfies LayoutLoadEvent;

// export const load: LayoutLoad = async function load({
//   fetch,
//   url
// }) {
//   let auth: any = await fetch('https://api-manager.erdemg.dev/auth', {
//     credentials: 'include',
//     cache: 'no-cache',
//   }).then(r => r?.json().catch(() => null));

//   if (!url.pathname.startsWith('/auth')) {
//     if (!auth?.user) {
//       throw redirect(307, '/auth/login');
//     }
//   } else {
//     if (auth?.user) {
//       throw redirect(307, '/');
//     }
//   }

//   return {
//     auth
//   }
// }