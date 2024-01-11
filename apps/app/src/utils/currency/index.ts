export const getCurrency = (currency: string) => {
	switch (currency) {
		case 'GBP':
			return '£';
		case 'USD':
		case 'CAD':
		case 'AUD':
			return '$';
		case 'EUR':
			return '€';
		case 'JPY':
			return '¥';
	}
};
