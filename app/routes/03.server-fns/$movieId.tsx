import type { Route } from './+types/$movieId'
import React, { useActionState } from 'react'
import { getMovie, toggleFavorite } from '#app/movies-data.ts'

export async function loader({ params }: Route.LoaderArgs) {
	const movie = await getMovie(Number(params.movieId))
	return { movie }
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	return await toggleFavorite(null, formData)
}

export function meta({ loaderData }: Route.MetaArgs) {
	return [
		{ title: `${loaderData.movie.title} - Demo 3` },
		{
			name: 'description',
			content: loaderData.movie.description,
		},
	]
}

export default function Demo3MoviePage({ loaderData }: Route.ComponentProps) {
	const { movie } = loaderData
	const [failureChance, setFailureChance] = React.useState(0)
	const [actionState, toggleAction, isPending] = useActionState(
		toggleFavorite,
		null,
	)

	// Get error for this movie
	const getMovieError = () => {
		return actionState?.movieId === movie.id && !actionState?.success
			? actionState.error
			: null
	}

	// Check if this movie is pending
	const isMoviePending = () => {
		return isPending && actionState?.movieId === movie.id
	}

	return (
		<main className="bg-background min-h-screen">
			<div className="mx-auto max-w-4xl px-6 py-16">
				<div className="mb-8">
					<nav className="rr-text mb-6 text-sm">
						<a href="/demo-3" className="rr-link">
							← Back to Movies
						</a>
					</nav>

					<div className="rr-highlight mb-8">
						<h2 className="rr-heading mb-2 text-lg font-semibold">
							⚡ Demo 3: Server Functions with 'use server'
						</h2>
						<p className="rr-text text-sm">
							Movie detail page with server functions for toggling favorites.
						</p>
					</div>
				</div>

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
						Adjust the slider to control the chance that toggle operations will
						fail (for demonstration purposes)
					</p>
				</div>

				<div className="rr-card">
					<div className="flex flex-col gap-6 md:flex-row">
						<div className="md:w-1/3">
							<img
								src={movie.poster}
								alt={`${movie.title} poster`}
								className="h-96 w-full rounded-lg object-cover"
							/>
						</div>
						<div className="md:w-2/3">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<h1 className="rr-heading mb-4 text-3xl font-bold">
										{movie.title}
									</h1>
									<div className="mb-4 flex items-center gap-4">
										<span className="rr-text text-lg">{movie.year}</span>
										<span className="rr-badge">Rating: {movie.rating}/10</span>
										<span
											className={`rr-badge ${movie.isFavorite ? 'rr-badge-red' : ''}`}
										>
											{movie.isFavorite ? 'Favorite' : 'Not Favorite'}
										</span>
									</div>
									<p className="rr-text mb-6">{movie.description}</p>
								</div>
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
											className={`rr-favorite-button text-3xl ${
												movie.isFavorite ? 'favorite' : ''
											} ${isMoviePending() ? 'opacity-50' : ''}`}
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
										{getMovieError() ? (
											<p className="text-warning text-xs">{getMovieError()}</p>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="rr-card mt-8">
					<h3 className="rr-heading mb-2 font-semibold">What's happening:</h3>
					<ul className="rr-text space-y-1 text-sm">
						<li>
							• Server function <span className="rr-code">action</span> handles
							form submissions
						</li>
						<li>
							• <span className="rr-code">useActionState</span> manages pending
							states and errors
						</li>
						<li>• Automatic revalidation after server actions</li>
						<li>• Optimistic UI with error handling</li>
					</ul>
				</div>
			</div>
		</main>
	)
}
