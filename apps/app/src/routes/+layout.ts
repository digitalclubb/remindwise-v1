import { browser, dev } from '$app/environment';
import { init, trackEvent } from '@aptabase/web';

// Inject Analytics for tracking
if (!dev && browser) {
	init('A-EU-1548251116', { appVersion: '1' });
	trackEvent('app_load');
}

// Clientside mocking
if (import.meta.env.MODE !== 'production') {
	if (dev && browser) {
		const { worker } = await import('$mocks/browser');
		worker.start({ onUnhandledRequest: 'bypass' });
	}
}
