import { render, screen } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
	it('renders correctly with defaults', () => {
		render(Button, { type: 'submit' });
		expect(screen.getByRole('button')).toBeTruthy();
	});
});
