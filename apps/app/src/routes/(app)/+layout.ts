import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import { load_x } from '$houdini';

export const load: LayoutLoad = async (event) => {
	event.depends('supabase:auth');

	const { session: sessionServer } = event.data;
	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_KEY,
		event: { fetch: event.fetch },
		serverSession: sessionServer,
	});

	const {
		data: { session },
	} = await supabase.auth.getSession();
	return {
		supabase,
		session,
		...(await load_x({
			event,
		})),
	};
};
