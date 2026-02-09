<script lang="ts">
	import * as XLSX from 'xlsx';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { onMount } from 'svelte';
	import Overlay from './Overlay.svelte';
	import OperatorButton from './OperatorButton.svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import { type Filter } from '$lib';

	export let title: string;
	export let columns: {
		sql_name: string;
		display_name: string;
		visible: boolean;
		filterable: boolean;
		type: string;
		range: boolean;
	}[];
	export let query_url: string;

	export let filters: Writable<{ [key: string]: Filter | null }>;

	let overlayOpen = false;
	let url = '';

	let data: any[] = [];
	const handler = new DataHandler(data, { rowsPerPage: 500 });
	const rows = handler.getRows();

	$: data, handler.setRows(data);

	let promise: Promise<any>;

	let dateStringLower: string;
	let dateStringUpper: string;
	let col_idx: { [key: string]: any } = {};

	columns.forEach((c) => {
		if (c.filterable && !$filters[c.sql_name]) {
			$filters[c.sql_name] = {
				id: c.sql_name,
				operator:
					c.type == 'string'
						? 'Contains'
						: c.type == 'date' || c.type == 'datetime'
						? 'Between'
						: 'EQ',
				value: null,
				lower: null,
				upper: null
			};
		}
	});

	function onChange(id: string, event: any, val_l_u: number = 0) {
		let val = event.target.value;
		if ($filters[id]) {
			if ((val == '' || val == null) && val_l_u == 0) {
				$filters[id] = {
					id: id,
					operator: $filters[id]!.operator,
					value: null,
					lower: null,
					upper: null
				};
			} else {
				$filters[id] = {
					id: id,
					operator: $filters[id]!.operator,
					value: val_l_u == 0 ? val : $filters[id]!.value,
					lower: val_l_u == 1 ? val : $filters[id]!.lower,
					upper: val_l_u == 2 ? val : $filters[id]!.upper
				};
			}
		} else {
			$filters[id] = {
				id: id,
				operator: 'EQ',
				value: val,
				lower: null,
				upper: null
			};
		}
	}

	//Generate Date
	let now = new Date(),
		month,
		day,
		year;

	onMount(() => {
		url = window.location.href;
		(month = '' + (now.getMonth() + 1)), (day = '' + now.getDate()), (year = now.getFullYear() - 1);

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		dateStringLower = [year, month, day].join('-');

		(month = '' + (now.getMonth() + 1)), (day = '' + now.getDate()), (year = now.getFullYear());

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		dateStringUpper = [year, month, day].join('-');
	});

	// Export data as xlsx workbook
	function exportToExcel() {
		let worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: false });
		const new_workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(new_workbook, worksheet, 'worksheet');
		XLSX.writeFile(new_workbook, 'Messwerte' + dateStringUpper + '.xls');
	}

	// send form data as search params to +server.ts
	async function handleSubmit(event: Event) {
		let temp = Object.keys($filters).map((k) => $filters[k]);
		temp = temp.filter(
			(n) => n?.value || n?.lower || n?.upper || n?.operator == 'Empty' || n?.operator == 'NotEmpty'
		);

		promise = fetch('http://127.0.0.1:3001/' + query_url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json'
			},
			body: `{
		    "filters": ${JSON.stringify(temp)}
		}` // body data type must match "Content-Type" header
		})
			.then((response) => {
				if (response.ok) {
					response
						.json()
						.then((temp_data: any[][]) => {
							// data.shift();
							const keys = temp_data.shift();

							data = temp_data.reduce((agg, arr) => {
								agg.push(
									arr.reduce((obj, item, index) => {
										obj[keys![index]] = item;
										return obj;
									}, {})
								);
								return agg;
							}, []);
						})
						.catch((err: any) => {
							console.error(err);
							return undefined;
						});
				} else {
					response.text().then((text: string) => {
						console.error(text);
					});
					return undefined;
				}
			})
			.catch((err: any) => {
				console.error(err);
				return undefined;
			});
		// promise = fetch(url + '/api', {
		// 	method: 'POST', // *GET, POST, PUT, DELETE, etc.
		// 	mode: 'cors', // no-cors, *cors, same-origin
		// 	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// 	credentials: 'same-origin', // include, *same-origin, omit
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: `{
		//     "filters": ${JSON.stringify(temp)}
		// }` // body data type must match "Content-Type" header
		// });
	}
</script>

<main>
	<title>{title}</title>
	<Overlay {overlayOpen} />
	<div class="header">
		<div class="grid-header" />
		<!--input form-->
		<form class="grid-toolbar" method="GET" action="/api" on:submit|preventDefault={handleSubmit}>
			{#each columns as column}
				{#if column.filterable}
					<div class="grid-item-label">
						<label for={column.sql_name}>{column.display_name}</label>
						<OperatorButton {column} bind:filters />
					</div>
					{#if $filters[column.sql_name] && $filters[column.sql_name]?.operator == 'Between'}
						{#if column.type == 'number'}
							<input
								id={column.sql_name + 'Lower'}
								class="grid-item-input-left"
								type="number"
								placeholder="Type a Value"
								name={column.sql_name + 'Lower'}
								on:change={(c) => onChange(column.sql_name, c, 1)}
							/>

							<input
								id={column.sql_name + 'Upper'}
								class="grid-item-input-right"
								type="number"
								placeholder="Type a Value"
								name={column.sql_name + 'Upper'}
								on:change={(c) => onChange(column.sql_name, c, 2)}
							/>
						{/if}
						{#if column.type == 'date' || column.type == 'datetime'}
							<input
								id={column.sql_name + 'Lower'}
								class="grid-item-input-left"
								type="date"
								placeholder="Type a Value"
								name={column.sql_name + 'Lower'}
								value={dateStringLower}
								on:change={(c) => onChange(column.sql_name, c, 1)}
							/>

							<input
								id={column.sql_name + 'Upper'}
								class="grid-item-input-right"
								type="date"
								placeholder="Type a Value"
								name={column.sql_name + 'Upper'}
								value={dateStringUpper}
								on:change={(c) => onChange(column.sql_name, c, 2)}
							/>
						{/if}
						{#if column.type == 'string'}
							<input
								id={column.sql_name + 'Lower'}
								class="grid-item-input-left"
								type="text"
								placeholder="Type a Value"
								name={column.sql_name + 'Lower'}
								on:change={(c) => onChange(column.sql_name, c, 1)}
							/>

							<input
								id={column.sql_name + 'Upper'}
								class="grid-item-input-right"
								type="text"
								placeholder="Type a Value"
								name={column.sql_name + 'Upper'}
								on:change={(c) => onChange(column.sql_name, c, 2)}
							/>
						{/if}
					{:else if $filters[column.sql_name]?.operator != 'Empty' && $filters[column.sql_name]?.operator != 'NotEmpty'}
						{#if column.type == 'number'}
							<input
								id={column.sql_name}
								class="grid-item-input"
								type="text"
								placeholder="Type a Value"
								on:change={(c) => onChange(column.sql_name, c, 0)}
							/>
						{/if}
						{#if column.type == 'date' || column.type == 'datetime'}
							<input
								id={column.sql_name + 'Lower'}
								class="grid-item-input"
								type="date"
								placeholder="Type a Value"
								name={column.sql_name + 'Lower'}
								on:change={(c) => onChange(column.sql_name, c, 0)}
							/>
						{/if}
						{#if column.type == 'string'}
							<input
								id={column.sql_name + 'Lower'}
								class="grid-item-input"
								type="text"
								placeholder="Type a Value"
								name={column.sql_name + 'Lower'}
								on:change={(c) => onChange(column.sql_name, c, 0)}
							/>
						{/if}
					{/if}
				{/if}
			{/each}
			<!-- submit button -->
			<button type="submit" class="btn btn-primary btn-sm search-button">
				<i class="fa-solid fa-magnifying-glass" /></button
			>
			<!-- export excel button -->
			<button type="button" class="btn btn-success btn-sm excel-button" on:click={exportToExcel}>
				<i class="fa-solid fa-file-excel" /></button
			>
			<button
				class="info-button"
				type="button"
				on:click={() => {
					overlayOpen = true;
				}}>i</button
			>
		</form>
	</div>
	<!--actual Datatable-->
	<Datatable
		{handler}
		search={false}
		rowsPerPage={false}
		rowCount={false}
		pagination={false}
		class="positions-container"
	>
		<table class="table table-auto table-zebra">
			<thead>
				<tr>
					<!--dynamically render table headers with sort option-->
					{#each columns as column}
						{#if column.visible}
							<Th {handler} orderBy={column.sql_name}>{column.display_name}</Th>
						{/if}
					{/each}
				</tr>
				<tr>
					{#each columns as column}
						{#if column.visible}
							<ThFilter {handler} filterBy={column.sql_name} class="py-0" />
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody>
				<!--render waiting when awaiting data fetch-->
				{#await promise}
					<p>waiting ...</p>
				{:then data}
					<!--dynamically render all rows -->
					{#each $rows as row}
						<tr>
							{#each columns as column}
								{#if column.visible}
									{#if column.type === 'date'}
										<td>{new Date(row[column.sql_name]).toLocaleDateString('de-de')}</td>
									{:else if column.type === 'datetime'}
										<td
											>{new Date(row[column.sql_name]).toLocaleDateString('de-de') +
												' ' +
												new Date(row[column.sql_name]).toLocaleTimeString()}</td
										>
									{:else if column.type === 'bool'}
										<td>
											<input
												type="checkbox"
												disabled={true}
												class="checkbox"
												checked={row[column.sql_name]}
											/>
										</td>
									{:else if column.type == 'number'}
										{#if isNaN(Number(row[column.sql_name]))}
											<td>{row[column.sql_name]}</td>
										{:else}
											<td>{Math.round(Number(row[column.sql_name]) * 100) / 100}</td>
										{/if}
									{:else}
										<td>{row[column.sql_name]}</td>
									{/if}
								{/if}
							{/each}
						</tr>
					{/each}
				{/await}
			</tbody>
		</table>
	</Datatable>
</main>

<style>
	main {
		width: 100%;
		height: 100vh;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
	}

	.header {
		margin: 1.5rem 1.5rem 0rem 1.5rem;
	}

	.grid-header {
		background: oklch(var(--s)) !important;
		height: 1.5rem;
		border: 1px solid oklch(var(--b3));
	}
	.grid-toolbar {
		background: oklch(var(--s)) !important;
		border: 1px solid oklch(var(--b3));
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.5rem;
		text-align: right;
		align-items: center;
		padding-bottom: 0.2rem;
	}
	.grid-item-label {
		color: oklch(var(--sc));
		grid-column: 2 / 2;
		vertical-align: middle;
	}

	.grid-item-input {
		grid-column: 3 / 5;
	}
	.grid-item-input-left {
		grid-column: 3 / 4;
	}
	.grid-item-input-right {
		grid-column: 4 / 5;
	}
	.search-button {
		grid-column: 5;
		grid-row: 2;
		transition-duration: 200ms;
		position: relative;
		left: 50%;
	}
	.excel-button {
		grid-column: 5;
		grid-row: 5;
		transition-duration: 200ms;
		position: relative;
		left: 50%;
	}
	.info-button {
		grid-column: 1;
		grid-row: 1;
		color: oklch(var(--sc));
		font-size: 18pt;
		position: absolute;
		border: none;
		left: 2rem;
		top: 4rem;
		width: 48px;
		height: 48px;
		background-color: oklch(var(--p));
		border-radius: 50%;
		cursor: help;
		transition-duration: 1s;
	}

	.info-button:hover {
		background-color: oklch(var(--p));
	}

	Button {
		width: 50%;
	}

	:global(.positions-container) {
		height: 100%;
		margin-inline: 1.5rem;
		overflow-y: hidden;
	}

	table {
		border: 1px solid oklch(var(--b3));
		table-layout: auto;
		border-collapse: separate;
		overflow-y: hidden !important;
	}
	thead > tr {
		background: oklch(var(--s)) !important;
	}

	tbody {
		overflow-y: scroll;
	}

	:global(Th) {
		border: 1px solid oklch(var(--b3));
		color: oklch(var(--sc));
		cursor: pointer;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	:global(th:hover) {
		background: oklch(var(--s) / 0.8) !important;
	}

	:global(th > div > strong) {
		font-size: 12px !important;
		white-space: nowrap !important;
	}

	tr {
		color: rgb(0, 0, 0);
		height: 23px;
	}

	tr:nth-child(even) {
		background-color: oklch(var(--sc));
	}
	tr:nth-child(odd) {
		background-color: oklch(var(--s) / 0.1);
	}

	td {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 12px;
		color: #343e41;
		white-space: nowrap;
		text-align: left;
	}

	table tbody tr td {
		padding: 0 !important;
	}

	tr:hover {
		background: oklch(var(--s) / 0.8) !important;
	}
</style>
