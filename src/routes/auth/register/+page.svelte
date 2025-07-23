<script lang="ts">
  import { goto } from "$app/navigation";
  import { AUTH } from "$lib";

  let username = "";
  let password = "";
  let password2 = "";
  let disable = false;

</script>

<div class="bg-surface-800 w-full min-h-full sm:p-12 p-2 flex justify-center sm:items-center sm:pt-0 pt-16">
  <form class="variant-ghost-secondary sm:p-12 p-4 rounded-3xl w-[600px] max-w-full gap-2 sm:gap-8 flex flex-col font-mono font-extrabold sm:justify-start justify-around h-fit" on:submit={async () => {
    disable = true;
			let data = await fetch(
				"https://manager.erdemdev.tr/api/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ username, password })
				}
			).then((res) => res.json().catch(() => null)).catch(() => null);
			$AUTH.TOKEN = data?.token ?? null;
			if ($AUTH.TOKEN) localStorage.setItem("token", $AUTH.TOKEN);
			if (data) goto("/");
      disable = false;
  }}>
  <h1 class="text-3xl w-full text-center sm:text-3xl sm:text-left">Kayıt Ol</h1>
    <div class="flex flex-col gap-8">
      <label class="text-lg text-tertiary-700">
        Kullanıcı Adı
        <input type="text" class="variant-ghost-tertiary w-full p-2 rounded-lg" bind:value={username} required/>
      </label>
      <label class="text-lg text-tertiary-700">
        Şifre
        <input type="password" class="variant-ghost-tertiary w-full p-2 rounded-lg" bind:value={password} required/>
      </label>
      <label class="text-lg text-tertiary-700">
        Şifre Tekrar
        <input type="password" class="variant-ghost-tertiary w-full p-2 rounded-lg" bind:value={password2} required/>
      </label>
      <div class="flex flex-row-reverse w-full justify-between items-center text-center">
        <button class="btn variant-ghost-primary w-fit" type="submit" disabled={!((username && password) && password === password2) || disable}>Kayıt Ol</button>
        <a href="/auth/login" class="variant-outline-tertiary p-1 rounded-md">Giriş yap</a>
      </div>
    </div>
  </form>
</div>
