import { browser, dev } from '$app/environment';
import { init, trackEvent } from '@aptabase/web';

if (!dev && browser) {
	init('A-EU-8881808042', { appVersion: '1' });
	trackEvent('app_load');
}
