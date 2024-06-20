import { browser, dev } from '$app/environment';
import { init, trackEvent } from '@aptabase/web';

// Inject Analytics for tracking
if (!dev && browser) {
	init('A-EU-1548251116', { appVersion: '1' });
	trackEvent('app_load');
}

// Inject MSW for mocking
if (dev && browser) {
	import('$mocks').then((res) => res.inject());
}
