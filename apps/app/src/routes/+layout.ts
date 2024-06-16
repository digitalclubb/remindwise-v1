import { dev } from '$app/environment';
import { init, trackEvent } from '@aptabase/web';

if (!dev) {
	init('A-EU-1548251116', { appVersion: '1' });
	trackEvent('app_load');
}
