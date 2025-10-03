import type { Route } from './+types/index'
import React, { useActionState, useOptimistic } from 'react'
import { getMovies, Movie, toggleFavorite } from './movies-data.ts'

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

export default function MoviesPage({ loaderData }: Route.ComponentProps) {
	const [failureChance, setFailureChance] = React.useState(0)
	const [actionState, toggleAction, isPending] = useActionState(
		toggleFavorite,
		null,
	)

	// Get error for specific movie
	const getMovieError = (movieId: number) => {
		return actionState?.movieId === movieId && !actionState?.success
			? actionState.error
			: null
	}

	// Check if a specific movie is pending
	const isMoviePending = (movieId: number) => {
		return isPending && actionState?.movieId === movieId
	}

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

					<div className="rr-card mb-8">
						<h3 className="rr-heading mb-4 font-semibold">
							Toggle Failure Control
						</h3>
						<div className="flex items-center gap-4">
							<label
								htmlFor="failure-chance"
								className="rr-text text-sm font-medium"
							>
								Failure Chance: {failureChance}%
							</label>
							<input
								id="failure-chance"
								type="range"
								min="0"
								max="100"
								value={failureChance}
								onChange={(e) => setFailureChance(Number(e.target.value))}
								className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200"
							/>
						</div>
						<p className="rr-text mt-2 text-xs text-gray-600">
							Adjust the slider to control the chance that toggle operations
							will fail (for demonstration purposes)
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{loaderData.movies.map((movie) => (
							<div key={movie.id} className="rr-card">
								<div className="mb-4 flex items-start justify-between">
									<h3 className="rr-heading text-lg font-semibold">
										{movie.title}
									</h3>
									<div className="flex flex-col items-end">
										<form action={toggleAction} className="inline">
											<input type="hidden" name="id" value={movie.id} />
											<input
												type="hidden"
												name="isFavorite"
												value={String(!movie.isFavorite)}
											/>
											<input
												type="hidden"
												name="failureChance"
												value={failureChance}
											/>
											<button
												type="submit"
												className={`rr-favorite-button text-2xl ${
													movie.isFavorite ? 'favorite' : ''
												} ${isMoviePending(movie.id) ? 'opacity-50' : ''}`}
												title={
													movie.isFavorite
														? 'Remove from favorites'
														: 'Add to favorites'
												}
											>
												{movie.isFavorite ? '❤️' : '🤍'}
											</button>
										</form>
										<div className="mt-1 h-4 text-right">
											{getMovieError(movie.id) ? (
												<p className="text-warning text-xs">
													{getMovieError(movie.id)}
												</p>
											) : null}
										</div>
									</div>
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
								• <span className="rr-code">useActionState</span> provides
								built-in error handling and pending states
							</li>
							<li>
								• Form submissions automatically trigger the server function
							</li>
							<li>
								• React Router revalidates the route data after the action
								completes
							</li>
							<li>• Modern error handling with automatic state management!</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	)
}
