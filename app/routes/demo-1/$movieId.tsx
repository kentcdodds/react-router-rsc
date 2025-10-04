import type { Route } from './+types/$movieId'
import React from 'react'
import { getMovie, getMovies } from '../movies/movies-data.ts'

export async function loader({ params }: Route.LoaderArgs) {
	const movie = await getMovie(Number(params.movieId))
	return { movie }
}

export function meta({ loaderData }: Route.MetaArgs) {
	return [
		{ title: `${loaderData.movie.title} - Demo 1` },
		{
			name: 'description',
			content: loaderData.movie.description,
		},
	]
}

export default function Demo1MoviePage({ loaderData }: Route.ComponentProps) {
	const { movie } = loaderData

	return (
		<main className="bg-background min-h-screen">
			<div className="mx-auto max-w-4xl px-6 py-16">
				<div className="mb-8">
					<nav className="rr-text mb-6 text-sm">
						<a href="/demo-1" className="rr-link">
							← Back to Movies
						</a>
					</nav>

					<div className="rr-highlight mb-8">
						<h2 className="rr-heading mb-2 text-lg font-semibold">
							🚀 Demo 1: Basic React Router v7
						</h2>
						<p className="rr-text text-sm">
							Movie detail page with basic React Router v7 routing and data
							loading.
						</p>
					</div>
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

							<div className="rr-card">
								<h3 className="rr-heading mb-2 font-semibold">
									What's happening:
								</h3>
								<ul className="rr-text space-y-1 text-sm">
									<li>
										• Dynamic route with{' '}
										<span className="rr-code">:movieId</span> parameter
									</li>
									<li>
										• <span className="rr-code">loader</span> fetches individual
										movie data
									</li>
									<li>
										• <span className="rr-code">meta</span> function sets page
										title and description
									</li>
									<li>• Standard React Router v7 behavior</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
