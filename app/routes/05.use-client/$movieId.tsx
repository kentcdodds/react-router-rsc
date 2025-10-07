import type { Route } from './+types/$movieId'
import React from 'react'
import { getMovie } from '#app/movies-data.ts'
import { MovieTrailer } from './movie-trailer'

export async function loader({ params }: Route.LoaderArgs) {
	const movie = await getMovie(Number(params.movieId))
	return { movie }
}

export function meta({ loaderData }: Route.MetaArgs) {
	return [
		{ title: `${loaderData.movie.title} - Demo 5` },
		{
			name: 'description',
			content: loaderData.movie.description,
		},
	]
}

// Server component as the main page
export default function Demo5MoviePage({ loaderData }: Route.ComponentProps) {
	const { movie } = loaderData

	return (
		<main className="bg-background min-h-screen">
			<div className="mx-auto max-w-4xl px-6 py-16">
				<div className="mb-8">
					<nav className="rr-text mb-6 text-sm">
						<a href="/demo-5" className="rr-link">
							← Back to Movies
						</a>
					</nav>

					<div className="rr-highlight mb-8">
						<h2 className="rr-heading mb-2 text-lg font-semibold">
							🎯 Demo 5: 'use client' for Interactive Elements
						</h2>
						<p className="rr-text text-sm">
							Movie detail page combining server and client components.
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

							{/* Interactive trailer component */}
							<MovieTrailer movie={movie} />
						</div>
					</div>
				</div>

				<div className="rr-card mt-8">
					<h3 className="rr-heading mb-2 font-semibold">What's happening:</h3>
					<ul className="rr-text space-y-1 text-sm">
						<li>
							• <span className="rr-code">MovieTrailer</span> is a client
							component with 'use client'
						</li>
						<li>• Interactive trailer toggle with state management</li>
						<li>
							• YouTube embeds using{' '}
							<span className="rr-code">react-lite-youtube-embed</span>
						</li>
						<li>• Server component for the main page structure</li>
						<li>
							• Optimal performance: server-rendered content + client
							interactivity
						</li>
					</ul>
				</div>
			</div>
		</main>
	)
}
