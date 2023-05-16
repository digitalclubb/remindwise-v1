<script lang="ts">
    import { getContextClient, gql, queryStore, mutationStore  } from '@urql/svelte';

    let client = getContextClient();
    let result;

    const categories = queryStore({
        client,
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

    let showForm = false;

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
    };
</script>

<nav>
    <div class="profile">
        <h2>Gareth Clubb</h2>
        <p>someemail@domain.com</p>
    </div>

    {#if $categories.fetching}
        <p>Loading...</p>
    {:else if $categories.error}
        <p>Oh no... {$categories.error.message}</p>
    {:else}
        <ul>
            {#each $categories.data.categoriesCollection.edges as category}
                <li>{category.node.name}</li>
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
                <button on:click={() => showForm = true}>Add category</button>
            </li>
        </ul>
    {/if}
    <ul>
        <li>Help</li>
        <li>Settings</li>
    </ul>
</nav>

<style>
    li {text-transform: capitalize;}
</style>
