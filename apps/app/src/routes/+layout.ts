import { browser, building, dev } from '$app/environment';
import { init, trackEvent } from '@aptabase/web';
import type { LayoutLoad, PageLoad } from './(app)/$types';

// Inject Analytics for tracking
if (!dev && browser) {
	init('A-EU-1548251116', { appVersion: '1' });
	trackEvent('app_load');
}

const prepare = async () => {
	// 	console.log('prepare');

	// Clientside mocking
	if (import.meta.env.MODE === 'dev' && !building) {
		console.log('here');
		if (browser && import.meta.env.VITE_MOCKS === 'true') {
			console.log('here3');

			const { worker } = await import('$mocks/browser');
			worker.start({ onUnhandledRequest: 'bypass' });

			// const { start } = serverImport('$mocks/startWorker');
			// await start();
		}
	}
};

export const load = async (event) => {
	// 	// Clientside mocking
	// 	console.log('Layout loaded');
	// 	console.log('oi', import.meta.env.MODE);
	// 	console.log('oi', import.meta.env.VITE_MOCKS);
	// 	console.log('oi', building);
	// 	console.log('oi', dev);
	// 	console.log('oi', browser);
	// 	// if (import.meta.env.MODE === 'dev' && !building) {
	// 	// 	console.log('here');
	// 	// 	if (dev && browser && import.meta.env.VITE_MOCKS === 'true') {
	await prepare();
	// 	// }
	// 	// }
};
