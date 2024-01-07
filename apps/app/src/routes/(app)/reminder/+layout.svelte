<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Header from '../../../components/header/Header.svelte';
	import { getCurrency } from '../../../utils/currency';
	import type { LayoutData } from './$houdini';
	import type {
		getReminderStore,
		getReminder$result,
		QueryResult,
	} from '$houdini';

	export let data: LayoutData;
	let showCategories: boolean;
	$: ({ getCategories, getSettings } = data);

	let result = {} as QueryResult<getReminder$result>;

	$: reminder = result.data?.reminders?.list[0].reminder;
	$: currency = $getSettings.data?.settings?.list[0].setting.currency || '';
	$: currencySymbol = getCurrency(currency);

	$: if ($page.url.pathname === '/reminder/add') {
		result = {} as QueryResult<getReminder$result>;
	}

	$: ($page.data.getReminder as getReminderStore)?.subscribe((value) => {
		result = value;
	});

	$: categories = $getCategories.data?.categories?.list.filter((category) =>
		category.category.name.toLowerCase().startsWith(categoryName.toLowerCase())
	);

	$: type = reminder?.type || '';
	$: autoRenew = String(reminder?.autoRenewal) || '';
	$: frequency = reminder?.frequency || '';

	$: categoryName = reminder?.category?.name || '';
	$: categoryId = categories?.[0]?.category.id || '';

	let files: FileList;
	let uploads = data.files || [];
	let filesDeleted: string[] = [];

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
		method="POST"
		action={$page.data.action}
		enctype="multipart/form-data"
		use:enhance>
		<div class="category">
			<label for="category">Category<i aria-hidden="true">*</i></label>
			<div class="category-input">
				<svg class="add">
					<use xlink:href="#icon-add"></use>
				</svg>
				<input
					type="text"
					name="category"
					id="category"
					placeholder="Type to select or create a new category"
					value={categoryName}
					on:input={(e) => {
						categoryName = e.currentTarget.value;
						if (categoryName.length > 1) {
							showCategoryList();
						} else {
							hideCategoryList();
						}
					}}
					autocomplete="off"
					aria-haspopup="listbox"
					required />
				<input type="hidden" bind:value={categoryId} name="categoryId" />
			</div>

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
									categoryName = category.category.name;
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
			<label for="name">Reminder name<i aria-hidden="true">*</i></label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Enter a name for your reminder"
				value={reminder?.name || ''}
				required />
		</div>

		<fieldset class="options">
			<legend>What type of reminder is this?<i aria-hidden="true">*</i></legend>
			<div class="option option-first">
				<input
					type="radio"
					name="type"
					id="ongoing"
					value="ONGOING"
					checked={type === 'ONGOING'}
					on:change={() => (type = 'ONGOING')}
					required />
				<label for="ongoing">Ongoing subscription</label>
			</div>
			<div class="option option-last">
				<input
					type="radio"
					name="type"
					id="single"
					value="SINGLE"
					checked={type === 'SINGLE'}
					on:change={() => (type = 'SINGLE')}
					required />
				<label for="single">Single record</label>
			</div>
		</fieldset>

		<div>
			<label for="company">Company<i aria-hidden="true">*</i></label>
			<input
				type="text"
				name="company"
				id="company"
				placeholder="Enter the name of the company"
				value={reminder?.company || ''}
				required />
		</div>

		<div class="columns">
			<div>
				<label for="cost">
					{#if type === 'SINGLE'}
						What is the total?<i aria-hidden="true">*</i>
					{:else}
						What is the re-occuring cost?<i aria-hidden="true">*</i>
					{/if}
				</label>
				<div class="currency">
					<span>{currencySymbol}</span>
					<input
						type="number"
						min="0"
						step="any"
						name="cost"
						id="cost"
						placeholder="How much is charged?"
						value={reminder?.cost || ''}
						required />
				</div>
			</div>

			{#if type === 'ONGOING'}
				<fieldset class="options">
					<legend>When is it charged?</legend>
					<div class="option option-first">
						<input
							type="radio"
							name="frequency"
							id="annual"
							value="ANNUAL"
							required
							checked={frequency === 'ANNUAL'}
							on:change={() => (frequency = 'ANNUAL')} />
						<label for="annual">Annual</label>
					</div>
					<div class="option option-last">
						<input
							type="radio"
							name="frequency"
							id="monthly"
							value="MONTHLY"
							required
							checked={frequency === 'MONTHLY'}
							on:change={() => (frequency = 'MONTHLY')} />
						<label for="monthly">Monthly</label>
					</div>
				</fieldset>
			{/if}
		</div>

		<div class="columns">
			<div>
				<label for="date"
					>{#if type === 'SINGLE'}
						What is the date?
					{:else}
						When is it due for renewal?
					{/if}</label>
				<input type="date" name="date" id="date" value={reminder?.date || ''} />
			</div>

			{#if type === 'ONGOING'}
				<fieldset class="options">
					<legend>Will it auto-renew?</legend>
					<div class="option option-first">
						<input
							type="radio"
							name="autoRenew"
							id="yes"
							value="true"
							checked={autoRenew === 'true'}
							on:change={() => (autoRenew = 'true')} />
						<label for="yes">Yes</label>
					</div>
					<div class="option option-last">
						<input
							type="radio"
							name="autoRenew"
							id="no"
							value="false"
							checked={autoRenew === 'false'}
							on:change={() => (autoRenew = 'false')} />
						<label for="no">No</label>
					</div>
				</fieldset>
			{/if}
		</div>

		<div>
			<label for="notes">Notes</label>
			<textarea
				name="notes"
				id="notes"
				placeholder="Enter things like policy number, quick contact details for the company etc."
				value={reminder?.notes || ''} />
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

	.category-input {
		position: relative;
	}

	.category-input svg {
		display: block;
		color: var(--orange);
		width: 1.4rem;
		height: 1.4rem;
		position: absolute;
		top: 50%;
		left: 1.3rem;
		transform: translateY(-50%);
	}

	.category-input input {
		width: 100%;
		padding-left: 3.8rem;
	}

	label,
	legend {
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

	fieldset {
		all: unset;
	}

	.options {
		margin-top: 2rem;
	}

	.options,
	.option {
		display: flex;
		flex: 1;
	}

	.option input {
		position: absolute;
		visibility: hidden;
	}

	.option label {
		background-color: var(--cream-light);
		border-top: 1px solid var(--cream);
		border-bottom: 1px solid var(--cream);
		padding-top: 1rem;
		padding-bottom: 1rem;
		margin-bottom: 0;
		width: 100%;
		text-align: center;
	}

	.option-first label {
		border-top-left-radius: 2rem;
		border-bottom-left-radius: 2rem;
		border-right: 1px solid var(--cream);
	}

	.option-last label {
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
	}

	.option label:hover {
		background-color: var(--cream);
		cursor: pointer;
	}

	.options input[type='radio']:checked + label {
		background-color: var(--orange);
		color: var(--white);
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
