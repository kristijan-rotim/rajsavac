<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import type { FootballTeam } from '$lib/types';

	export let data: { teams: FootballTeam[] };
	let teams = data.teams;

	const headers = ['Klub', '#', 'O', 'P', 'N', 'I', 'GR', 'B'] as const;

	async function updateTeam(id: string, field: keyof FootballTeam, value: number) {
		const res = await fetch(`/admin/football/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ [field]: value })
		});
		if (res.ok) {
			const updatedTeam = await res.json();
			teams = teams.map(team => team.id === id ? updatedTeam : team);
		}
	}

	function handleChange(event: Event, id: string, field: keyof FootballTeam) {
		const target = event.target as HTMLInputElement;
		const value = parseInt(target.value) || 0;
		updateTeam(id, field, value);
	}
</script>

<div class="p-4">
	<Table striped={true}>
		<TableHead>
			{#each headers as header}
				<TableHeadCell>{header}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each teams as team (team.id)}
				<TableBodyRow>
					<TableBodyCell>{team.club}</TableBodyCell>
					<TableBodyCell>
						<input
						  type="number"
						  class="w-16 p-1 border rounded"
						  value={team.position}
						  on:change={(e) => handleChange(e, team.id, 'position')}
						/>
					</TableBodyCell>
					<TableBodyCell>
						<input
						  type="number"
						  class="w-16 p-1 border rounded"
						  value={team.matches}
						  on:change={(e) => handleChange(e, team.id, 'matches')}
						/>
					</TableBodyCell>
					<TableBodyCell>
						<input
						  type="number"
						  class="w-16 p-1 border rounded"
						  value={team.wins}
						  on:change={(e) => handleChange(e, team.id, 'wins')}
						/>
					</TableBodyCell>
					<TableBodyCell>
						<input
						  type="number"
						  class="w-16 p-1 border rounded"
						  value={team.draws}
						  on:change={(e) => handleChange(e, team.id, 'draws')}
						/>
					</TableBodyCell>
					<TableBodyCell>
						<input
						  type="number"
						  class="w-16 p-1 border rounded"
						  value={team.losses}
						  on:change={(e) => handleChange(e, team.id, 'losses')}
						/>
					</TableBodyCell>
					<TableBodyCell>
						<input
						  type="number"
						  class="w-16 p-1 border rounded"
						  value={team.goalDiff}
						  on:change={(e) => handleChange(e, team.id, 'goalDiff')}
						/>
					</TableBodyCell>
					<TableBodyCell>
						<input
						  type="number"
						  class="w-16 p-1 border rounded"
						  value={team.points}
						  on:change={(e) => handleChange(e, team.id, 'points')}
						/>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>