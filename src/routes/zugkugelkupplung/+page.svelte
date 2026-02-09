<script lang="ts">
	import { type Filter } from '$lib';
	import ResultsPage from '$lib/Components/ResultsPage.svelte';
	import { siteColumns } from '$lib/configs';
	import { writable, type Writable } from 'svelte/store';
	const title = 'Zugkugelkupplung';

	const columns = siteColumns['messwerte_stabikupplung'];

	let dateStringLower: string;
	let dateStringUpper: string;

	let now = new Date(),
		month,
		day,
		year;

	(month = '' + (now.getMonth() + 1)), (day = '' + now.getDate()), (year = now.getFullYear() - 1);

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	dateStringLower = [year, month, day].join('-');

	(month = '' + (now.getMonth() + 1)), (day = '' + now.getDate()), (year = now.getFullYear());

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	dateStringUpper = [year, month, day].join('-');

	const filters: Writable<{ [key: string]: Filter | null }> = writable({});
	$filters['DATUM'] = {
		id: 'DATUM',
		operator: 'Between',
		value: null,
		lower: dateStringLower,
		upper: dateStringUpper
	};
</script>

<ResultsPage {title} {columns} query_url={'query_zugkugelkupplung'} {filters} />
