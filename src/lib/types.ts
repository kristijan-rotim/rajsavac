export interface Post {
	id: string;
	title: string;
	shortDescription: string;
	image: string | null;
	collectionId: string;
}

export interface CarouselImages {
	alt: string;
	src: string;
}

export interface FootballTeam {
	id: string;
	position: number;
	club: string;
	matches: number;
	wins: number;
	draws: number;
	losses: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDiff: number;
	points: number;
}
