<h1>Add a reminder</h1>

<form>
	<div>
		<label for="category">Category</label>
		<input list="category-list" id="category" name="category" />
		<datalist id="category-list">
			<option value="cat-1">Cat 1</option>
			<option value="cat-2">Cat 2</option>
			<option value="cat-3">Cat 3</option>
			<option value="cat-4">Cat 4</option>
			<option value="cat-5">Cat 5</option>
		</datalist>
		<button>Add new category</button>
	</div>

	<div>
		<label for="company">Company</label>
		<input type="text" id="company" />
	</div>
	<div>
		<label for="cost">Cost</label>
		<input type="text" id="cost" />
	</div>
	<fieldset>
		<legend>Renewal required</legend>
		<div>
			<label for="renewal">Date of renewal</label>
			<input type="datetime-local" id="renewal" />
		</div>
		<fieldset>
			<legend>Auto renewal</legend>
			<label for="auto-yes">Yes</label>
			<input type="radio" id="auto-yes" value="Yes" name="auto" />
			<label for="auto-no">No</label>
			<input type="radio" id="auto-no" value="No" name="auto" />
		</fieldset>
		<fieldset>
			<legend>Reminder type</legend>
			<label for="type-email">Email</label>
			<input type="checkbox" id="type-email" name="type-email" value="Email" />
			<label for="type-phone">Phone</label>
			<input type="checkbox" id="type-phone" name="type-phone" value="Phone" />
		</fieldset>
	</fieldset>

	<div>
		<label for="comments">Comments</label>
		<textarea id="comments" name="comments"></textarea>
	</div>

	<input type="submit" value="Add reminder" />
</form>

<style>
	div,
	fieldset {
		margin-bottom: 1.8rem;
	}

	fieldset {
		padding: 0;
		margin-left: 0;
		margin-right: 0;
		border: none;
	}

	label,
	legend {
		font-size: 1.4rem;
		margin-bottom: 0.5rem;
		width: 100%;
		display: block;
		user-select: none;
	}

	input[type='text'] {
		width: 100%;
		height: 5rem;
		border-radius: 0.5rem;
		border: 1px solid #ced6e0;
		transition: all 0.3s ease-in-out;
		font-size: 1.8rem;
		padding: 0.5rem 1.5rem;
	}
</style>
