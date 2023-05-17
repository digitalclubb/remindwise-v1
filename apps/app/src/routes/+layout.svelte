<script lang="ts">
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";

  import {
    createClient,
    setContextClient,
    cacheExchange,
    fetchExchange,
  } from "@urql/svelte";

  const headers = {
    apikey: PUBLIC_SUPABASE_KEY,
    authorization: `Bearer ${PUBLIC_SUPABASE_KEY}`,
  };

  const client = createClient({
    url: PUBLIC_SUPABASE_URL,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: function createFetchOptions() {
      return { headers };
    },
  });

  setContextClient(client);

  import Navigation from "../components/navigation/Navigation.svelte";
</script>

<Navigation />

<slot />
