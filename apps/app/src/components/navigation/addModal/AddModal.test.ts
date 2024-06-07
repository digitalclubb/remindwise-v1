import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddModal from './AddModal.svelte';

describe('AddModal', () => {
	it('renders correctly with defaults', () => {
		render(AddModal, { showAddModal: true });
        console.log(screen.getByRole('radio', {name: 'break icon'}))
		expect(screen.getAllByRole('textbox')).toBeTruthy();
		expect(screen.getByRole('radio', {name: 'break icon'})).toBeTruthy();
	});

	// Can pass in 'a' element and needs href

	// Secondary type?
	// Delete type?
});
