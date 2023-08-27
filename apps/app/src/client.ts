import { HoudiniClient } from '$houdini';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

export default new HoudiniClient({
	url: `${PUBLIC_SUPABASE_URL}/graphql/v1?apikey=${PUBLIC_SUPABASE_KEY}`,
	fetchParams({ session }) {
		return {
			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
		};
	},
});
