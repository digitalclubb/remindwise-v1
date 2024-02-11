<script lang="ts">
	import { page } from '$app/stores';

	export let uploads: {
		name: string;
		url: string;
	}[] = [];

	let files: FileList;
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
</script>

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
	<input type="hidden" name="deleted" value={JSON.stringify(filesDeleted)} />
</fieldset>

<style>
	fieldset {
		all: unset;
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

	.uploadFiles button svg {
		width: 1.5rem;
	}

	button {
		all: unset;
		cursor: pointer;
		margin-left: 1rem;
	}
</style>
