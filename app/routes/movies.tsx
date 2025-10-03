import type { Route } from './+types/movies'
import { useOptimistic } from 'react'

// Mock data for demonstration
let movies = [
	{ id: 1, title: 'The Matrix', year: 1999, isFavorite: false },
	{ id: 2, title: 'Inception', year: 2010, isFavorite: true },
	{ id: 3, title: 'Interstellar', year: 2014, isFavorite: false },
	{ id: 4, title: 'Blade Runner 2049', year: 2017, isFavorite: true },
	{ id: 5, title: 'Dune', year: 2021, isFavorite: false },
]

async function getMovies() {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 100))
	return movies
}

// Server function with automatic revalidation
export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const movieId = Number(formData.get('id'))
	const actionType = formData.get('action') as string

	if (actionType === 'toggle-favorite') {
		// Update the movie's favorite status
		const movie = movies.find((m) => m.id === movieId)
		if (movie) {
			movie.isFavorite = !movie.isFavorite
		}

		// React Router automatically revalidates the route after this action!
		return { success: true, movieId, isFavorite: movie?.isFavorite }
	}

	return { success: false }
}

export async function loader() {
	return {
		movies: await getMovies(),
	}
}

export function meta() {
	return [
		{ title: 'Movies - Server Functions Demo' },
		{
			name: 'description',
			content:
				"Demonstrating React Router's server functions with automatic revalidation",
		},
	]
}

export default function MoviesPage(props: Route.ComponentProps) {
	const data = props.loaderData

	if (!data || !data.movies) {
		return (
			<main className="bg-background min-h-screen">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<div className="text-center">
						<h1 className="rr-heading mb-4 text-2xl font-bold">Loading...</h1>
						<p className="rr-text">Please wait while we load the movies.</p>
					</div>
				</div>
			</main>
		)
	}

	const [optimisticMovies, addOptimisticMovie] = useOptimistic(
		data.movies,
		(
			state,
			{ movieId, isFavorite }: { movieId: number; isFavorite: boolean },
		) =>
			state.map((movie: any) =>
				movie.id === movieId ? { ...movie, isFavorite } : movie,
			),
	)

	return (
		<main className="bg-background min-h-screen">
			<div className="mx-auto max-w-6xl px-6 py-16">
				<div className="mb-8">
					<nav className="rr-text mb-6 text-sm">
						<a href="/" className="rr-link">
							← Back to Home
						</a>
					</nav>

					<div className="rr-highlight mb-8">
						<h2 className="rr-heading mb-2 text-lg font-semibold">
							⚡ Server Functions Demo
						</h2>
						<p className="rr-text text-sm">
							Click the heart icons to toggle favorites. React Router
							automatically revalidates the route data after each server action
							- seamless data updates!
						</p>
					</div>
				</div>

				<div className="mx-auto max-w-4xl">
					<h1 className="rr-heading mb-8 text-3xl font-bold">
						Movie Collection
					</h1>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{optimisticMovies.map((movie: any) => (
							<div key={movie.id} className="rr-card">
								<div className="mb-4 flex items-start justify-between">
									<h3 className="rr-heading text-lg font-semibold">
										{movie.title}
									</h3>
									<form method="post" className="inline">
										<input type="hidden" name="id" value={movie.id} />
										<input
											type="hidden"
											name="action"
											value="toggle-favorite"
										/>
										<button
											type="submit"
											onClick={() =>
												addOptimisticMovie({
													movieId: movie.id,
													isFavorite: !movie.isFavorite,
												})
											}
											className={`rr-favorite-button text-2xl ${
												movie.isFavorite ? 'favorite' : ''
											}`}
											title={
												movie.isFavorite
													? 'Remove from favorites'
													: 'Add to favorites'
											}
										>
											{movie.isFavorite ? '❤️' : '🤍'}
										</button>
									</form>
								</div>

								<p className="rr-text mb-2">Year: {movie.year}</p>

								<div className="flex items-center gap-2">
									<span
										className={`rr-badge ${movie.isFavorite ? 'rr-badge-red' : ''}`}
									>
										{movie.isFavorite ? 'Favorite' : 'Not Favorite'}
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="rr-card mt-8">
						<h3 className="rr-heading mb-2 font-semibold">How it works:</h3>
						<ul className="rr-text space-y-1 text-sm">
							<li>
								• Server functions are defined with the{' '}
								<span className="rr-code">action</span> export
							</li>
							<li>
								• <span className="rr-code">useOptimistic</span> provides
								immediate UI updates before server responds
							</li>
							<li>
								• Form submissions automatically trigger the server function
							</li>
							<li>
								• React Router revalidates the route data after the action
								completes
							</li>
							<li>
								• Seamless optimistic updates with automatic rollback on errors!
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	)
}
