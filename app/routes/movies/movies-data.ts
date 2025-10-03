'use server'

// Mock data for demonstration
let movies = [
	{
		id: 1,
		title: 'The Lord of the Rings: The Fellowship of the Ring',
		year: 2001,
		isFavorite: false,
	},
	{
		id: 2,
		title: 'The Lord of the Rings: The Two Towers',
		year: 2002,
		isFavorite: true,
	},
	{
		id: 3,
		title: 'The Lord of the Rings: The Return of the King',
		year: 2003,
		isFavorite: false,
	},
	{ id: 4, title: 'K-Pop Demon Hunters', year: 2025, isFavorite: true },
	{
		id: 5,
		title: 'Spider-Man: Into the Spider-Verse',
		year: 2018,
		isFavorite: false,
	},
	{
		id: 6,
		title: 'Spider-Man: Across the Spider-Verse',
		year: 2023,
		isFavorite: true,
	},
]

export type Movie = (typeof movies)[number]

export async function getMovies() {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 100))
	return movies
}

export async function toggleFavorite(prevState: any, formData: FormData) {
	const movieId = Number(formData.get('id'))
	const isFavorite = formData.get('isFavorite') === 'true'
	const failureChance = Number(formData.get('failureChance')) || 0

	// Simulate failure based on the failure chance
	if (failureChance > 0 && Math.random() * 100 < failureChance) {
		return {
			success: false,
			error: `Toggle operation failed! (${failureChance}% failure chance)`,
			movieId,
		}
	}

	// Update the movie's favorite status
	const movie = movies.find((m) => m.id === movieId)
	if (movie) {
		movie.isFavorite = isFavorite
	}

	return {
		success: true,
		error: null,
		movieId,
	}
}
