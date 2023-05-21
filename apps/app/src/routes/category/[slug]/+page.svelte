<script>
  import { page } from "$app/stores";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>{$page.params.slug}</h1>
