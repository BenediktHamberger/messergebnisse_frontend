<script lang="ts">
	import { type Filter } from '$lib';
	import { operatorDescriptions, operatorIcons } from '$lib/components/operator';
	import type { Writable } from 'svelte/store';

	export let column: {
		sql_name: string;
		display_name: string;
		visible: boolean;
		filterable: boolean;
		type: string;
		range: boolean;
	};

	export let filters: Writable<{ [key: string]: Filter | null }>;

	let operatorMap = ['EQ', 'Contains', 'NotContains', 'Between', 'GT', 'LT', 'Empty', 'NotEmpty'];

	let lower: string | null = null;
	let upper: string | null = null;
	let val = column.type == 'bool' ? false : '';
	let operator =
		column.type == 'string' ? 1 : column.type == 'date' || column.type == 'datetime' ? 3 : 0;

	function onChange() {
		if ($filters[column.sql_name]) {
			$filters[column.sql_name] = {
				id: column.sql_name,
				operator: operatorMap[operator],
				value: $filters[column.sql_name]!.value,
				lower: $filters[column.sql_name]!.lower,
				upper: $filters[column.sql_name]!.upper
			};
		} else {
			$filters[column.sql_name] = {
				id: column.sql_name,
				operator: operatorMap[operator],
				value: null,
				lower: null,
				upper: null
			};
		}
	}
</script>

<div class="dropdown-wrapper dropdown dropdown-hover">
	<div role="button" class="btn btn-sm operator-button">
		{@html operatorIcons[operator]}
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul class="dropdown-content z-[10] menu p-0 shadow bg-base-100 rounded-box w-64">
		{#each operatorIcons as icon, index}
			<li>
				<button
					on:click={() => {
						operator = index;
						onChange();
					}}
				>
					{@html icon}
					<span>{operatorDescriptions[index]}</span>
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	span {
		color: black;
	}
</style>
