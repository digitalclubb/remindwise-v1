# Future tests

## Triggers use cases

**I added a monthly recurring reminder which started in July, today is September:**
- I need to update jul, aug, sept, oct, nov, dec on the month totals array
- I need to update total spent with cost x 3 months (July, Aug, Sep)
- I need to update total upcoming with cost x 3 months (Oct, Nov, Dec)

⠀
**I added a monthly recurring reminder which started today (Sep):**
- I need to update Sep, Oct, Nov and Dec on the month totals array
- I need to update total spent with cost x 1 month (Sep)
- I need to update total upcoming with cost x 3 months (Oct, Nov, Dec)


**I added a monthly recurring reminder which starts in November, today is September:**
- I need to update Nov and Dec on the month totals array
- Total spent remains untouched
- I need to update total upcoming with cost x 2 months (Oct, Nov, Dec)

⠀
**I deleted a monthly recurring reminder from today (Sep):**
- I need to update Oct, Nov and Dec on the month totals array
- Total spent remains untouched
- I need to update total upcoming with cost x 3 months (Oct, Nov, Dec)
