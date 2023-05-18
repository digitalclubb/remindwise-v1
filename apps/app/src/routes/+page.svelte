<script lang="ts">
  export let data;
  const reminders = data.reminders.list;
</script>

<h1>Dashboard</h1>

<h2>Reminders</h2>
{#each reminders as object}
  <li>
    {object.reminder.company}
  </li>
{/each}
