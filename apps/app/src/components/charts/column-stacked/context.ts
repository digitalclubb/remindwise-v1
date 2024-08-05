/* eslint-disable @typescript-eslint/no-explicit-any */
type Func = (params?: any) => any;
export type LayerCakeContext = {
	data: any;
	xGet: any;
	yGet: any;
	zGet: any;
	xRange: SvelteStore<[min: number, max: number] & Func & string[] & number[]>;
	xScale: SvelteStore<
		{
			bandwidth: Func;
			domain: Func;
			ticks: Func;
			range: Func;
		} & Func
	>;
	yScale: SvelteStore<{ bandwidth: Func; domain: Func; ticks: Func } & Func>;
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
