export interface Post {
	id: string;
	title: string;
	shortDescription: string;
	cover: string | null;
	topicId: string | null;
}

export interface Topic {
	id: string;
	name: string;
}

export interface CarouselImages {
	id: string;
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
