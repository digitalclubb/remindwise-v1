<script lang="ts">
    import { getContextClient, gql, queryStore  } from '@urql/svelte';

    const categories = queryStore({
        client: getContextClient(),
        query: gql`
        query {
            categoriesCollection {
                edges {
                    node {
                        id,
                        name
                    }
                }
            }
        }
        `,
    });
</script>

<nav>
    <div class="profile">
        <h2>Gareth Clubb</h2>
        <p>someemail@domain.com</p>
    </div>
    <ul>
        <li>Money</li>
        <li>Insurance</li>
        <li>Entertainment</li>
        <li>Health</li>
        <li>Travel</li>
        <li>Transport</li>
        <li>Utilities</li>
        <li>Misc</li>
    </ul>
    <ul>
        <li>Help</li>
        <li>Settings</li>
    </ul>
</nav>

{#if $categories.fetching}
<p>Loading...</p>
{:else if $categories.error}
<p>Oh no... {$categories.error.message}</p>
{:else}
<ul>
  {#each $categories.data.categoriesCollection.edges as category}
  <li>{category.node.name}</li>
  {/each}
</ul>
{/if}
