import { dev } from '$app/environment';
import { init, trackEvent } from '@aptabase/web';

init('A-EU-8881808042');
trackEvent('app_load');
