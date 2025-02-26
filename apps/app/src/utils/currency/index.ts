export const getCurrency = (currency: string) => {
	switch (currency) {
		case 'GBP':
			return 'en-GB';
		case 'USD':
			return 'en-US';
		case 'CAD':
			return 'en-CA';
		case 'AUD':
			return 'en-AU';
		case 'EUR':
			return 'pt-PT';
		case 'JPY':
			return 'ja-JP';
	}
};
