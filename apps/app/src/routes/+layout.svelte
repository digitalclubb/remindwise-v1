<script lang="ts">
  import Navigation from "../components/navigation/Navigation.svelte";
</script>

<main>
  <Navigation />
  <div>
    <slot />
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: auto;
    grid-template-areas: "navigation content";
    min-height: 100vh;
  }

  div {
    grid-area: content;
  }
</style>
