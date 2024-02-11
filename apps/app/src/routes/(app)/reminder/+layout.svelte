<script lang="ts">
	import { page } from '$app/stores';
	import Header from '../../../components/header/Header.svelte';
	import { getCurrency } from '../../../utils/currency';
	import type { LayoutData } from './$houdini';
	import { superForm } from 'sveltekit-superforms/client';
	import { reminderSchema } from './schema';
	import { Input, Radio } from 'components';

	export let data: LayoutData;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: reminderSchema,
	});

	let showCategories: boolean;
	$: ({ getCategories, getSettings } = data);

	$: currency = $getSettings.data?.settings?.list[0].setting.currency || '';
	$: currencySymbol = getCurrency(currency);

	$: categories = $getCategories.data?.categories?.list.filter((category) =>
		category.category.name
			.toLowerCase()
			.startsWith($form.category.toLowerCase())
	);

	let files: FileList;
	let uploads = data.files || [];
	let filesDeleted: string[] = [];

	$: if ($page.url.pathname === '/reminder/add') {
		uploads = [];
		filesDeleted = [];
	}

	const fileUpload = (files: FileList) => {
		const filenames = Array.from(files).map((file) => {
			// update the deleted files array in case file got re-added
			const index = filesDeleted.indexOf(file.name);
			filesDeleted.splice(index, 1);
			filesDeleted = [...filesDeleted];
			return {
				name: file.name,
				url: '',
			};
		});
		uploads = [...uploads, ...filenames];
	};

	const deleteFile = (fileName: string | undefined) => {
		const index = uploads.findIndex((upload) => upload.name === fileName);
		uploads.splice(index, 1);
		uploads = [...uploads];
		fileName && (filesDeleted = [...filesDeleted, fileName]);
	};

	const showCategoryList = () => {
		document.addEventListener('click', () => (showCategories = false));
		showCategories = true;
	};

	const hideCategoryList = () => {
		document.removeEventListener('click', () => (showCategories = false));
		showCategories = false;
	};
</script>

<Header title={$page.data.title} />

<div class="body">
	<form
		novalidate
		method="POST"
		action={$page.data.action}
		enctype="multipart/form-data"
		use:enhance>
		<div class="category">
			<Input
				label="Category"
				type="text"
				name="category"
				id="category"
				icon="icon-add"
				fullWidth
				placeholder="Type to select or create a new category"
				onInput={(e) => {
					$form.category = e.currentTarget?.value;
					if ($form.category.length > 1) {
						showCategoryList();
					} else {
						hideCategoryList();
					}
				}}
				autocomplete="off"
				aria-haspopup="listbox"
				aria-invalid={$errors.category ? 'true' : undefined}
				bind:value={$form.category}
				{...$constraints.category} />
			<input
				type="hidden"
				value={categories?.[0]?.category.id || ''}
				name="categoryId" />

			{#if $errors.category}
				<p class="error">{$errors.category}</p>
			{/if}
			{#if categories}
				<ul
					class="categories-list"
					class:show={showCategories}
					aria-labelledby="category">
					{#each categories as category}
						<li>
							<button
								type="button"
								on:click={() => {
									$form.category = category.category.name;
									hideCategoryList();
								}}
								><svg fill="var(--cream-dark)"
									><use xlink:href="#{category.category.iconId}" /></svg
								>{category.category.name}</button>
						</li>
					{/each}

					{#if categories.length === 0}
						<li>
							<button
								class="category-select"
								type="button"
								on:click={hideCategoryList}>
								Category not found. It will be created when you add the
								reminder.</button>
						</li>
					{/if}
				</ul>
			{/if}
		</div>

		<div>
			<Input
				label="Reminder name"
				type="text"
				name="name"
				id="name"
				placeholder="Enter a name for your reminder"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				fullWidth
				{...$constraints.name} />
			{#if $errors.name}
				<p class="error">{$errors.name}</p>
			{/if}
		</div>

		<div>
			<Radio
				required
				legend="What type of reminder is this?"
				name="type"
				options={[
					{ id: 'ongoing', label: 'Ongoing subscription', value: 'ONGOING' },
					{ id: 'single', label: 'Single record', value: 'SINGLE' },
				]}
				bind:group={$form.type}
				constraints={$constraints.type}
				aria-invalid={$errors.type ? 'true' : undefined} />

			{#if $errors.type}
				<p class="error">{$errors.type}</p>
			{/if}
		</div>

		<div>
			<Input
				label="Company"
				type="text"
				name="company"
				id="company"
				fullWidth
				placeholder="Enter the name of the company"
				aria-invalid={$errors.company ? 'true' : undefined}
				bind:value={$form.company}
				{...$constraints.company} />

			{#if $errors.company}
				<p class="error">{$errors.company}</p>
			{/if}
		</div>

		<div class="columns">
			<div>
				<label for="cost">
					{#if $form.type === 'SINGLE'}
						What is the total?<i aria-hidden="true">*</i>
					{:else}
						What is the re-occuring cost?<i aria-hidden="true">*</i>
					{/if}
				</label>
				<div class="currency">
					<span>{currencySymbol}</span>
					<input
						type="number"
						step="any"
						name="cost"
						id="cost"
						placeholder="How much is charged?"
						aria-invalid={$errors.cost ? 'true' : undefined}
						bind:value={$form.cost}
						{...$constraints.cost} />
				</div>
				{#if $errors.cost}
					<p class="error">{$errors.cost}</p>
				{/if}
			</div>

			{#if $form.type === 'ONGOING'}
				<div class="options-wrapper">
					<Radio
						required
						legend="When is it charged?"
						name="frequency"
						options={[
							{ id: 'annual', label: 'Annual', value: 'ANNUAL' },
							{ id: 'monthly', label: 'Monthly', value: 'MONTHLY' },
						]}
						bind:group={$form.frequency}
						constraints={$constraints.frequency}
						aria-invalid={$errors.frequency ? 'true' : undefined} />

					{#if $errors.frequency}
						<p class="error">{$errors.frequency}</p>
					{/if}
				</div>
			{/if}
		</div>

		<div class="columns">
			<div>
				<label for="date"
					>{#if $form.type === 'SINGLE'}
						What is the date?
					{:else}
						When is it due for renewal?
					{/if}</label>
				<input
					type="date"
					name="date"
					id="date"
					aria-invalid={$errors.date ? 'true' : undefined}
					bind:value={$form.date}
					{...$constraints.date} />

				{#if $errors.date}
					<p class="error">{$errors.date}</p>
				{/if}
			</div>

			{#if $form.type === 'ONGOING'}
				<div class="options-wrapper">
					<Radio
						legend="Will it auto-renew?"
						name="autoRenew"
						options={[
							{ id: 'yes', label: 'Yes', value: true },
							{ id: 'no', label: 'No', value: false },
						]}
						bind:group={$form.autoRenew}
						constraints={$constraints.autoRenew}
						aria-invalid={$errors.autoRenew ? 'true' : undefined} />

					{#if $errors.autoRenew}
						<p class="error">{$errors.autoRenew}</p>
					{/if}
				</div>
			{/if}
		</div>

		<div>
			<label for="notes">Notes</label>
			<textarea
				name="notes"
				id="notes"
				placeholder="Enter things like policy number, quick contact details for the company etc."
				aria-invalid={$errors.notes ? 'true' : undefined}
				bind:value={$form.notes}
				{...$constraints.notes} />

			{#if $errors.notes}
				<p class="error">{$errors.notes}</p>
			{/if}
		</div>

		<fieldset class="uploadFiles">
			<legend>
				{#if uploads.length > 0}
					Your documents
				{:else}
					Would you like to upload any documents?
				{/if}
			</legend>
			{#if uploads.length > 0}
				<ul class="">
					{#each uploads as upload}
						<li class="upload">
							<svg>
								<use xlink:href="#icon-pdf"></use>
							</svg>
							<span>{upload.name}</span>
							<button type="button" on:click={() => deleteFile(upload.name)}
								><svg>
									<use xlink:href="#icon-bin"></use>
								</svg></button>
						</li>
					{/each}
				</ul>
			{/if}
			<label for="documents"
				><svg>
					<use xlink:href="#icon-upload"></use>
				</svg>
				{#if uploads.length > 0}
					Add another document
				{:else}
					Browse for a file...
				{/if}</label>
			<div class="types">(.jpg, .jpeg, .png, .pdf)</div>
			<input
				type="file"
				id="documents"
				name="documents"
				multiple
				bind:files
				accept=".jpg, .jpeg, .png, .pdf"
				on:change={() => fileUpload(files)} />
			<input
				type="hidden"
				name="deleted"
				value={JSON.stringify(filesDeleted)} />
		</fieldset>

		<slot />

		<input
			type="hidden"
			name="userId"
			id="userId"
			value={$page.data.session?.user.id} />
	</form>
</div>

<style>
	form {
		max-width: 64rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.categories-list {
		border-radius: 6px;
		border: 1px solid var(--greyed-out);
		background: var(--cream-light);
		display: none;
	}

	.show {
		display: block;
	}

	.categories-list li {
		padding: 0.5rem 1rem;
	}

	.categories-list li:hover {
		background: var(--cream);
		cursor: pointer;
	}

	.categories-list li:hover svg {
		fill: var(--remindwise-grey);
	}

	.categories-list button {
		width: 100%;
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		margin-left: 0;
	}

	.categories-list svg {
		width: 1.8rem;
		height: 1.8rem;
		margin-right: 1rem;
		vertical-align: middle;
	}

	fieldset {
		all: unset;
	}

	label {
		display: inline-block;
		margin-bottom: 1rem;
	}

	i {
		font-style: normal;
		color: var(--red);
	}

	input {
		display: block;
		border: 1px solid var(--greyed-out);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
		width: 100%;
	}

	.options-wrapper {
		flex: 1;
	}

	.currency {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.currency span {
		color: var(--cream-dark);
		font-size: 2.4rem;
	}

	textarea {
		display: block;
		border: 1px solid var(--greyed-out);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
		width: 100%;
		min-height: 25rem;
	}

	.uploadFiles input {
		display: none;
	}

	.uploadFiles label {
		display: inline-flex;
		align-items: center;
		background-color: var(--cream-light);
		border: 1px solid var(--greyed-out);
		border-radius: 6.6rem;
		padding: 0.8rem 1.5rem;
		margin-bottom: 0;
		cursor: pointer;
	}

	.uploadFiles label:hover {
		background-color: var(--cream);
	}

	.uploadFiles svg {
		width: 2.5rem;
		height: 2.5rem;
	}

	.types {
		color: var(--grey-light);
	}

	.upload {
		background-color: var(--cream-light);
		border-radius: 0.6rem;
		padding: 1.2rem 1.5rem;
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}

	.upload span {
		flex: 1;
		margin-left: 1.5rem;
	}

	button {
		all: unset;
		cursor: pointer;
		margin-left: 1rem;
	}

	.uploadFiles button svg {
		width: 1.5rem;
	}

	@media screen and (min-width: 500px) {
		.columns {
			display: flex;
			flex-wrap: wrap;
			gap: 4rem;
		}

		.options {
			margin-top: 0;
		}

		input {
			width: 28.5rem;
		}

		.currency input {
			width: 26rem;
		}
	}
</style>
