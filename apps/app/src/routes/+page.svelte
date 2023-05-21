<script lang="ts">
  /** @type {import('./$types').LayoutData} */
  export let data;
</script>

<h1>Dashboard</h1>

<h2>Reminders</h2>
{#each data.reminders as reminders}
  <li>
    {reminders.reminder.company}
  </li>
{/each}
