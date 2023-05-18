<script lang="ts">
  export let data;
  import Navigation from "../components/navigation/Navigation.svelte";
</script>

<Navigation {data} />

<slot />
