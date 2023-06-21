/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type LayerCakeContext = {
	data: any;
	xGet: any;
	yGet: any;
	xRange: SvelteStore<
		[min: number, max: number] & Function & string[] & number[]
	>;
	xScale: SvelteStore<
		{
			bandwidth: Function;
			domain: Function;
			ticks: Function;
			range: Function;
		} & Function
	>;
	yScale: SvelteStore<
		{ bandwidth: Function; domain: Function; ticks: Function } & Function
	>;
	padding: SvelteStore<
		{
			top: number;
			right: number;
			bottom: number;
			left: number;
		} & {
			top?: number;
			right?: number;
			bottom?: number;
			left?: number;
		}
	>;
};
