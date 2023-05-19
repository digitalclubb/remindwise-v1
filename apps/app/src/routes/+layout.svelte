<script lang="ts">
  export let data;

  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const categories = writable();
  $: categories.set(data.categories);
  setContext("categories", categories);

  import Navigation from "../components/navigation/Navigation.svelte";
</script>

<Navigation />

<slot />
