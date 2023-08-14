import { HoudiniClient } from '$houdini';
import { PUBLIC_SUPABASE_GRAPHQL_URL } from '$env/static/public';

export default new HoudiniClient({
	url: PUBLIC_SUPABASE_GRAPHQL_URL,
	fetchParams({ session }) {
		return {
			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
		};
	},
});
