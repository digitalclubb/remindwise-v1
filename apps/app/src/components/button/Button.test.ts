import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte/svelte5';
import Button from './Button.svelte';

describe('Button', () => {
	it('renders correctly with defaults', () => {
		render(Button, { type: 'submit' });
		expect(screen.getByRole('button')).toBeTruthy();
	});

	// Can pass in 'a' element and needs href

	// Secondary type?
	// Delete type?
});
