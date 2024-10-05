<script lang="ts">
	import Link from '../../../components/link/Link.svelte';
	import Header from '../../../components/header/Header.svelte';
</script>

<svelte:head>
	<title>Help · remindwise.io</title>
</svelte:head>

<Header title="Help" />

<article class="body">
	<p>
		Explore our frequently asked questions below to discover how Remindwise
		works.
	</p>

	<h2 class="heading-3">Categories</h2>

	<details>
		<summary>How do I add a new category for my reminders?</summary>
		<article>
			<p>You have two easy ways to add a category:</p>
			<ol>
				<li>
					<strong>From the Main Navigation:</strong>
					<ul>
						<li>
							Click on <strong>"Add a category"</strong> in the left sidebar.
						</li>
						<li>A prompt will pop up asking for a category name and icon.</li>
						<li>
							Enter the name and choose an icon, then click <strong
								>"Add category"</strong
							>. Your new category will appear in the sidebar, ready for use!
						</li>
					</ul>
				</li>
				<li>
					<strong>While Adding a New Reminder:</strong>
					<ul>
						<li>Go to <strong>"Add a new reminder"</strong>.</li>
						<li>
							If you type in a new category name that doesn't exist yet and
							don’t select an existing one, it will create the new category when
							you save your reminder.
						</li>
						<li>
							You can add an icon to this new category later through the main
							navigation.
						</li>
					</ul>
				</li>
			</ol>

			<p>Feel free to try either method!</p>
		</article>
	</details>

	<details>
		<summary>How do I update an existing category name or icon?</summary>
		<article>
			<p>To change an existing category:</p>
			<ol>
				<li>
					<strong>Hover Over the Category Name: </strong>
					<ul>
						<li>
							Move your mouse over the category name in the main navigation.
							Three dots will appear.
						</li>
					</ul>
				</li>
				<li>
					<strong>Access the Action Menu: </strong>
					<ul>
						<li>
							Click on the three dots to open a small menu with options to <strong
								>Edit</strong>
							or <strong>Delete</strong>.
						</li>
					</ul>
				</li>
				<li>
					<strong>Edit the Category: </strong>
					<ul>
						<li>
							Click on <strong>Edit</strong>. A popup will appear where you can
							rename the category or change the icon.
						</li>
					</ul>
				</li>
				<li>
					<strong>Save Your Changes: </strong>
					<ul>
						<li>
							After making your changes, click <strong>"Update category"</strong
							>. Your updates will be saved!
						</li>
					</ul>
				</li>
			</ol>
			<p>It’s that simple!</p>
		</article>
	</details>

	<h2 class="heading-3">Reminders</h2>

	<details>
		<summary>How do I add a new reminder?</summary>
		<article>
			<p>Adding a new reminder is easy! Here’s how:</p>
			<ol>
				<li>
					<strong>Go to the Main Navigation:</strong>
					<ul>
						<li>
							Click on the <strong>"Add a new reminder"</strong> button. This will
							take you to the reminder setup page.
						</li>
					</ul>
				</li>
				<li>
					<strong>Fill Out the Form: </strong>
					<ul>
						<li>
							You’ll see a form asking for details about your reminder. Here’s
							what you need to fill in:
							<ul>
								<li>
									<strong>Category Name:</strong>
									If you don’t have one, a new category will be created automatically.
								</li>

								<li>
									<strong>Reminder Name:</strong>
									Give your reminder a title.
								</li>
								<li>
									<strong>Type of Reminder:</strong>
									Choose between ongoing or single cost.
								</li>
								<li>
									<strong>Cost:</strong>
									Enter the amount.
								</li>
								<li>
									<strong>Charge Frequency:</strong>
									Select whether it’s charged annually or monthly for ongoing costs.
								</li>
								<li>
									<strong>Due Date: </strong>
									Specify when the reminder is due.
								</li>
								<li>
									<strong>Additional Files or Notes:</strong>
									You can attach any important documents or notes, like a policy
									number.
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<strong>Save Your Reminder: </strong>
					<ul>
						<li>
							Once you’ve filled everything out, click <strong
								>"Add this reminder"</strong> Your new reminder will be saved in
							its category!
						</li>
					</ul>
				</li>
			</ol>
			<p>And that's it! Your reminder is now set.</p>
		</article>
	</details>

	<details>
		<summary>How do I edit an existing reminder?</summary>
		<article>
			<p>Editing your existing reminder is simple! Here’s what to do:</p>
			<ol>
				<li>
					<strong>View Your Active Reminder: </strong>
					<ul>
						<li>Open the reminder you want to edit.</li>
					</ul>
				</li>
				<li>
					<strong>Click the Edit Button: </strong>
					<ul>
						<li>
							On the top right of the page, click the <strong
								>"Edit reminder"</strong> button. This will take you to the reminder
							form.
						</li>
					</ul>
				</li>
				<li>
					<strong>Make Your Changes: </strong>
					<ul>
						<li>
							You can update the cost, change notes or files, or even move the
							reminder to a different category.
						</li>
					</ul>
				</li>
				<li>
					<strong>Save Your Changes: </strong>
					<ul>
						<li>
							After you’ve updated the details, make sure to click <strong
								>"Update reminder"</strong
							>. Your changes will be saved!
						</li>
					</ul>
				</li>
				<li>
					<strong>Delete Option: </strong>
					<ul>
						<li>
							You can also choose to delete the reminder from this page if
							needed.
						</li>
					</ul>
				</li>
			</ol>
			<p>That’s it! Your reminder is now updated.</p>
		</article>
	</details>

	<h2 class="heading-3">Settings</h2>

	<details>
		<summary>How can I update my personal details?</summary>
		<article>
			<p>Updating your personal details is easy! Here’s how:</p>
			<ol>
				<li>
					<strong>Go to Settings:</strong>
					<ul>
						<li>
							Scroll to the bottom of the main navigation and click on
							<strong>"Settings"</strong>.
						</li>
					</ul>
				</li>
				<li>
					<strong>Manage Your Personal Details: </strong>
					<ul>
						<li>
							You’ll find options to:

							<ul>
								<li>Change your reminder notification frequency.</li>
								<li>Update your email address.</li>
								<li>Change your first or last name.</li>
								<li>Select your local currency.</li>
							</ul>
						</li>
					</ul>
				</li>

				<li>
					<strong>Save Your Changes: </strong>
					<ul>
						<li>
							After making your updates, click <strong>"Update account"</strong>
							to ensure your changes take effect right away.
						</li>
					</ul>
				</li>
			</ol>
			<p>And that’s it! Your personal details are now updated.</p>
		</article>
	</details>

	<details>
		<summary>How do I change my local currency?</summary>
		<article>
			<p>Changing your local currency is straightforward! Here’s how:</p>
			<ol>
				<li>
					<strong>Access the Settings Page: </strong>
					<ul>
						<li>
							Click on <strong>"Settings"</strong> at the bottom of the main navigation.
						</li>
					</ul>
				</li>
				<li>
					<strong>Select Your Currency: </strong>
					<ul>
						<li>
							You’ll see an option to choose a local currency. The available
							currencies are:

							<ul>
								<li>GBP (British Pound)</li>
								<li>USD (US Dollar)</li>
								<li>EUR (Euro)</li>
								<li>CAD (Canadian Dollar)</li>
								<li>AUD (Australian Dollar)</li>
								<li>JPY (Japanese Yen)</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<strong>Save Your Selection: </strong>
					<ul>
						<li>
							After choosing your desired currency, make sure to click <strong
								>"Update account"</strong> for the change to take effect.
						</li>
					</ul>
				</li>
			</ol>
			<p>That’s it! Your local currency is now updated.</p>
		</article>
	</details>

	<details>
		<summary>Can I change the frequency of the reminders I receive?</summary>
		<article>
			<p>
				Yes, you can easily change the frequency of your reminders! Here’s how:
			</p>
			<ol>
				<li>
					<strong>Go to the Settings Page: </strong>
					<ul>
						<li>
							Click on <strong>"Settings"</strong> at the bottom of the main navigation.
						</li>
					</ul>
				</li>
				<li>
					<strong>Adjust Your Reminder Frequency: </strong>
					<ul>
						<li>
							You’ll find options to choose a <strong>notice period</strong> and
							an <strong>interval</strong>.
						</li>
						<li>
							For example, if you want a reminder a week before something is
							due, set the notice period to <strong>7</strong> and select
							<strong>days</strong>. This means you’ll get a reminder 7 days in
							advance.
						</li>
						<li>
							You can also choose from intervals of days, months, or even years
							for more advanced planning!
						</li>
					</ul>
				</li>
				<li>
					<strong>Save Your Changes: </strong>
					<ul>
						<li>
							Make sure to click <strong>"Update account"</strong> to save your new
							settings.
						</li>
					</ul>
				</li>
			</ol>
			<p>That’s it! Your reminder frequency is now set to your liking.</p>
		</article>
	</details>

	<div class="contact">
		<p>Still can't find what you're looking for?</p>
		<Link type="button" href="/contact">Contact us</Link>
	</div>
</article>

<style>
	p {
		margin-bottom: 1.6rem;
	}

	h2 {
		color: var(--orange);
		margin-top: 4.5rem;
		margin-bottom: 1.6rem;
	}

	details {
		max-width: 69.8rem;
	}

	summary {
		background-color: var(--cream-light);
		font-size: 1.6rem;
		line-height: 2rem;
		padding: 1.4rem 2rem;
		margin-bottom: 1.2rem;
		cursor: pointer;
		border-radius: 0.6rem;
	}

	summary::marker {
		color: var(--orange);
	}

	details[open] > summary {
		background-color: var(--remindwise-grey);
		color: var(--cream-light);
	}

	details article {
		padding: 1.6rem;
	}

	details li {
		margin-top: 1.5rem;
	}

	ol {
		list-style-type: number;
		padding-inline-start: 4rem;
		margin-bottom: 1.5rem;
	}

	ul {
		list-style-type: circle;
		padding-inline-start: 4rem;
	}

	.contact {
		margin-top: 2.5rem;
	}
</style>
