<script lang="ts">
  /** @type {import('./$types').LayoutData} */
  export let data;
</script>

<h1>Dashboard</h1>

<h2>Upcoming reminders</h2>

<table>
  <thead>
    <tr>
      <th>Company</th>
      <th>Category</th>
      <th>Due date</th>
      <th>Auto renewal?</th>
    </tr>
  </thead>
  <tbody>
    {#each data.reminders as reminders}
      <tr>
        <td>{reminders.reminder.company}</td>
        <td>{reminders.reminder.categoryId}</td>
        <td>{reminders.reminder.dateOfRenewal}</td>
        <td>{reminders.reminder.autoRenewal}</td>
      </tr>
    {/each}
  </tbody>
</table>
