import { dev } from '$app/environment';
import { init } from '@aptabase/web';

if (!dev) init('A-EU-8881808042');
