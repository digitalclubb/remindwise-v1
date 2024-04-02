# Future tests

## Triggers use cases

**I added a monthly recurring reminder which started in July, today is September:**

- I need to update jul, aug, sept, oct, nov, dec on the month totals array
- I need to update total spent with cost x 3 months (July, Aug, Sep)
- I need to update total upcoming with cost x 3 months (Oct, Nov, Dec)

**I added a monthly recurring reminder which started today (Sep):**

- I need to update Sep, Oct, Nov and Dec on the month totals array
- I need to update total spent with cost x 1 month (Sep)
- I need to update total upcoming with cost x 3 months (Oct, Nov, Dec)

**I added a monthly recurring reminder which starts in November, today is September:**

- I need to update Nov and Dec on the month totals array
- Total spent remains untouched
- I need to update total upcoming with cost x 2 months (Nov, Dec)

**I deleted a monthly recurring reminder from today (Sep):**

- I need to update Oct, Nov and Dec on the month totals array
- Total spent remains untouched
- I need to update total upcoming with cost x 3 months (Oct, Nov, Dec)

**I update the date of a reminder from being on Jun to be July, today is Sep (in the future):**

- If it's a recurring do we want to update total spent as it's in the past? YES - minus one month
- If it's a one off or yearly do we want to move the total spent from the old month to the new month? YES

**I update the date of a reminder from being on Jun to be July, today is Jun (the present):**

- If it's a recurring do we want to update total upcoming as it's now in the future and remove it from total spent? YES
- If it's a one off or yearly do we want to move the total spent from the old month to the new month? YES - remove total spent

**I update the date of a reminder from being on Jun to be July, today is May (in the past):**

- If it's a recurring do we want to update total upcoming as it will be one less month? YES
- If it's a one off or yearly do we want to move the total upcoming from the old month to the new month? YES

**I update the cost of a reminder to be higher than it was:**

- If it's a recurring do we want to update total upcoming to reflect the new value? YES
- If it's a one off or yearly do we only update total upcoming if it hasn't happened yet? YES - total spent is unchanged though
