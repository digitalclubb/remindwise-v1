import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";
import {createClient,gql,cacheExchange,fetchExchange} from "@urql/svelte";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    const headers = {
        apikey: PUBLIC_SUPABASE_KEY,
        authorization: `Bearer ${PUBLIC_SUPABASE_KEY}`,
    };

    const client = createClient({
        url: PUBLIC_SUPABASE_URL,
        exchanges: [cacheExchange, fetchExchange],
        fetchOptions: function createFetchOptions() {
            return { headers };
        },
    });

    const result = client
        .query(
            gql`
            query {
                categories: categoriesCollection {
                list: edges {
                    category: node {
                        id
                        name
                        iconId
                    }
                }
                }
                reminders: remindersCollection {
                list: edges {
                    reminder: node {
                        categoryId
                        company
                        cost
                        dateOfRenewal
                        autoRenewal
                    }
                }
                }
            }
            `,
            {}
        )
        .toPromise();

    return {
        categories: (await result).data.categories.list,
        reminders: (await result).data.reminders.list,
    };
}