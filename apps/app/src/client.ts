import { HoudiniClient } from '$houdini';
import { error } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { AuthSession } from '@supabase/supabase-js';

export default new HoudiniClient({
	url: `${PUBLIC_SUPABASE_URL}/graphql/v1`,
	fetchParams({ session }) {
		return {
			headers: {
				apiKey: PUBLIC_SUPABASE_KEY,
				Authorization: `Bearer ${(session as AuthSession)?.access_token}`,
			},
		};
	},
	throwOnError: {
		operations: ['all'],
		error: (errors, ctx) =>
			error(
				500,
				`(${ctx.artifact.name}): ` +
					errors.map((err) => err.message).join('. ') +
					'.'
			),
	},
});
