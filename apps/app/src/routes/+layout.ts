import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";
import {
createClient,
gql,
cacheExchange,
fetchExchange,
} from "@urql/svelte";

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

    const data = client
        .query(
            gql`
            query {
                categories: categoriesCollection {
                list: edges {
                    category: node {
                    name
                    iconId
                    }
                }
                }
                reminders: remindersCollection {
                list: edges {
                    reminder: node {
                    company
                    }
                }
                }
            }
            `,
            {}
        )
        .toPromise()
        .then((result) => {
            return {
            categories: result.data.categories.list,
            reminders: result.data.reminders.list,
            };
        });

    return {
        categories: (await data).categories,
        reminders: (await data).reminders,
    };
}