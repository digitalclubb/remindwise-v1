import { load_getSettings, load_getCategories } from '$houdini';

import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import {
	createBrowserClient,
	createServerClient,
	isBrowser,
} from '@supabase/ssr';

export const load = (async (event) => {
	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	event.depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
				global: {
					fetch: event.fetch,
				},
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
				global: {
					fetch,
				},
				cookies: {
					get() {
						return JSON.stringify(event.data.session);
					},
				},
			});
	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return {
		supabase,
		session,
		user,
		...(await load_getCategories({
			event,
		})),
		...(await load_getSettings({
			event,
		})),
	};
}) satisfies LayoutLoad;
