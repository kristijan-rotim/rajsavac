<script lang="ts">
	import { Carousel, Heading, P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import PostGrid from '../lib/components/PostGrid.svelte';
	import type { CarouselImages, FootballTeam, Post } from '$lib/types';

	export let data: {
		posts: Post[];
		carouselImages: CarouselImages[];
	};

	const footballData: FootballTeam[] = [
		{
			position: 1,
			club: 'NK Croatia Mihaljevci',
			matches: 13,
			wins: 10,
			draws: 1,
			losses: 2,
			goalsFor: 36,
			goalsAgainst: 13,
			goalDiff: 23,
			points: 31
		},
		{ position: 2, club: 'NK Graničar (Z)', matches: 13, wins: 8, draws: 3, losses: 2, goalsFor: 35, goalsAgainst: 18, goalDiff: 17, points: 27 },
		{ position: 3, club: 'BSK Buk', matches: 13, wins: 8, draws: 2, losses: 3, goalsFor: 55, goalsAgainst: 25, goalDiff: 30, points: 26 },
		{ position: 4, club: 'NK Kaptol', matches: 13, wins: 7, draws: 2, losses: 4, goalsFor: 42, goalsAgainst: 17, goalDiff: 25, points: 23 },
		{ position: 5, club: 'Požega', matches: 13, wins: 6, draws: 4, losses: 3, goalsFor: 25, goalsAgainst: 15, goalDiff: 10, points: 22 },
		{ position: 6, club: 'HNK Graševina', matches: 13, wins: 6, draws: 2, losses: 5, goalsFor: 20, goalsAgainst: 26, goalDiff: -6, points: 20 },
		{
			position: 7,
			club: 'NK Hrvatski Dragovoljac',
			matches: 13,
			wins: 6,
			draws: 1,
			losses: 6,
			goalsFor: 29,
			goalsAgainst: 20,
			goalDiff: 9,
			points: 19
		},
		{ position: 8, club: 'NK Kuzmica', matches: 13, wins: 5, draws: 3, losses: 5, goalsFor: 24, goalsAgainst: 23, goalDiff: 1, points: 18 },
		{
			position: 9,
			club: 'NK Dinamo Rajsavac',
			matches: 13,
			wins: 5,
			draws: 2,
			losses: 6,
			goalsFor: 18,
			goalsAgainst: 29,
			goalDiff: -11,
			points: 17
		},
		{ position: 10, club: 'HNK Dobrovc', matches: 13, wins: 3, draws: 0, losses: 10, goalsFor: 18, goalsAgainst: 34, goalDiff: -16, points: 9 },
		{
			position: 11,
			club: 'NK Slaven Gradac',
			matches: 13,
			wins: 1,
			draws: 3,
			losses: 9,
			goalsFor: 15,
			goalsAgainst: 39,
			goalDiff: -24,
			points: 6
		},
		{ position: 12, club: 'Graničar (B)', matches: 13, wins: 1, draws: 1, losses: 11, goalsFor: 5, goalsAgainst: 63, goalDiff: -58, points: 4 }
	];

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

<Carousel images={data.carouselImages.map(img => ({ src: img.src, alt: img.alt }))} let:Indicators>
	<Indicators />
</Carousel>

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

<div class="pt-16 text-center">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl">Novosti</Heading>
	<PostGrid posts={data.posts} />
</div>
