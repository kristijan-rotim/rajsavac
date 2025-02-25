<script lang="ts">
	import { Heading, P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import type { FootballTeam } from '$lib/types';

	export let footballData: FootballTeam[];

	const tableHeaders = ['#', 'Klub', 'O', 'P', 'N', 'I', 'GR', 'B'] as const;
	const legendItems = [
		{ abbr: 'O', full: 'Odigrano' },
		{ abbr: 'P', full: 'Pobjede' },
		{ abbr: 'N', full: 'Neriješeno' },
		{ abbr: 'I', full: 'Izgubljeno' },
		{ abbr: 'GR', full: 'Gol razlika' },
		{ abbr: 'B', full: 'Bodovi' }
	] as const;
</script>

<div class="pt-16">
	<Heading tag="h1" class="text-center">Tablica</Heading>
	<div class="max-w-4xl mx-auto px-4">
		<Table striped={true} hoverable={true}>
			<TableHead>
				{#each tableHeaders as header}
					<TableHeadCell>{header}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each footballData as { position, club, matches, wins, draws, losses, goalDiff, points }}
					<TableBodyRow>
						<TableBodyCell>{position}</TableBodyCell>
						<TableBodyCell>{club}</TableBodyCell>
						<TableBodyCell>{matches}</TableBodyCell>
						<TableBodyCell>{wins}</TableBodyCell>
						<TableBodyCell>{draws}</TableBodyCell>
						<TableBodyCell>{losses}</TableBodyCell>
						<TableBodyCell>{goalDiff}</TableBodyCell>
						<TableBodyCell>{points}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<div class="mt-4 flex flex-wrap gap-4">
			{#each legendItems as { abbr, full }}
				<P color="text-gray-500" size="sm">{abbr} - {full}</P>
			{/each}
		</div>
	</div>
</div>