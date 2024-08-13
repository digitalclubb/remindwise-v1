import { browser, dev } from '$app/environment';
import { PUBLIC_ENABLE_MOCKING } from '$env/static/public';
import { init, trackEvent } from '@aptabase/web';

// Inject Analytics for tracking
if (!dev && browser) {
	init('A-EU-1548251116', { appVersion: '1' });
	trackEvent('app_load');
}

if (PUBLIC_ENABLE_MOCKING === 'true' && browser) {
	const { worker } = await import('$mocks/browser');
	worker.start({ onUnhandledRequest: 'bypass' });
}
