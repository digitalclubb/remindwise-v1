export const formatDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month, day);
	return new Intl.DateTimeFormat('en-GB').format(date);
};
