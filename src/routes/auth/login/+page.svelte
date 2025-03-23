<script lang="ts">
    import { goto } from "$app/navigation";
    import { AUTH } from "$lib";
    import erdemURL from "$lib/erdem.png";

    let username = "";
    let password = "";

    let disable = false;
</script>

<img src={erdemURL} alt="" />

<div
    class="bg-surface-800 w-full min-h-full sm:p-12 p-2 flex justify-center sm:items-center sm:pt-0 pt-16"
>
    <form
        class="variant-ghost-secondary sm:p-12 p-4 rounded-3xl w-[600px] max-w-full gap-2 sm:gap-8 flex flex-col font-mono font-extrabold sm:justify-start justify-around h-fit"
        on:submit={async () => {
            disable = true;
            let data = await fetch(
                "https://api-manager.erdemg.dev/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                },
            )
                .then((res) => res.json().catch(() => null))
                .catch(() => null);

            $AUTH.TOKEN = data?.token ?? null;
            if ($AUTH.TOKEN) localStorage.setItem("token", $AUTH.TOKEN);
            if (data) goto("/");
            disable = false;
        }}
    >
        <h1 class="text-3xl w-full text-center sm:text-3xl sm:text-left">
            Giriş Yap
        </h1>
        <div class="flex flex-col gap-8">
            <label class="text-lg text-tertiary-700">
                Kullanıcı Adı
                <input
                    type="text"
                    class="variant-ghost-tertiary w-full p-2 rounded-lg"
                    bind:value={username}
                    required
                />
            </label>
            <label class="text-lg text-tertiary-700">
                Şifre
                <input
                    type="password"
                    class="variant-ghost-tertiary w-full p-2 rounded-lg"
                    bind:value={password}
                    required
                />
            </label>
            <div
                class="flex flex-row-reverse w-full justify-between items-center text-center"
            >
                <button
                    class="btn variant-ghost-primary w-fit"
                    type="submit"
                    disabled={!(username && password) || disable}>Giriş</button
                >
                <a
                    href="/auth/register"
                    class="variant-outline-tertiary p-1 rounded-md">Kayıt ol</a
                >
            </div>
        </div>
    </form>
</div>
