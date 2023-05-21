<script lang="ts">
  import { gql, mutationStore } from "@urql/svelte";
  import { page } from "$app/stores";

  let result;

  let showForm = false;

  // how to get client?

  const updateCategories = (event) => {
    const category = event.target.category.value;
    result = mutationStore({
      client,
      query: gql`
            mutation {
                insertIntocategoriesCollection(
                    objects: [
                    {name: "${category}", isLocked:false, iconId:"lols"}
                    ]
                ) {
                    affectedCount
                    records {
                    id
                    name
                    }
                }
            }
        `,
    });
    showForm = false;
  };
</script>

<nav>
  <div class="profile">
    <h2>Gareth Clubb</h2>
    <p>someemail@domain.com</p>
  </div>

  <ul>
    <li><a href="/">Home</a></li>
    <li>Search</li>
    <li>Help</li>
    <li>Settings</li>
  </ul>
  <ul>
    {#each $page.data.categories as category}
      <li>
        <a href="/category/{category.category.name}">{category.category.name}</a
        >
      </li>
    {/each}
    {#if showForm}
      <li>
        <form on:submit={updateCategories}>
          <input type="text" name="category" required />
          <button type="submit">Add</button>
        </form>
      </li>
    {/if}
    <li>
      <button on:click={() => (showForm = true)}>Add category</button>
    </li>
  </ul>
</nav>

<style>
  li {
    text-transform: capitalize;
  }
</style>
