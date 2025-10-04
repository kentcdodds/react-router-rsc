import type { Route } from './+types/index'
import React from 'react'
import { Link } from 'react-router'
import { getMovies } from '../movies/movies-data.ts'

export async function loader() {
	const movies = await getMovies()

	// Return RSCs from the loader - this is the new capability!
	const movieCards = movies.map((movie) => (
		<Link
			key={movie.id}
			to={`/demo-2/${movie.id}`}
			className="rr-card transition-shadow hover:shadow-lg"
		>
			<div className="mb-4">
				<img
					src={movie.poster}
					alt={`${movie.title} poster`}
					className="mb-4 h-64 w-full rounded-lg object-cover"
				/>
				<h3 className="rr-heading text-lg font-semibold">{movie.title}</h3>
				<p className="rr-text mb-2">Year: {movie.year}</p>
				<p className="rr-text mb-2">Rating: {movie.rating}/10</p>
				<p className="rr-text mb-4 text-sm text-gray-600">
					{movie.description}
				</p>
				<div className="flex items-center gap-2">
					<span className="rr-badge">
						{movie.isFavorite ? 'Favorite' : 'Not Favorite'}
					</span>
				</div>
			</div>
		</Link>
	))

	return {
		movies,
		movieCards, // This is the RSC returned from the loader!
	}
}

export function meta() {
	return [
		{ title: 'Demo 2: RSCs from Loaders' },
		{
			name: 'description',
			content: 'Demonstrating React Server Components returned from loaders',
		},
	]
}

export default function Demo2Page({ loaderData }: Route.ComponentProps) {
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
							⚡ Demo 2: RSCs from Loaders
						</h2>
						<p className="rr-text text-sm">
							Now we're returning React Server Components directly from the
							loader! This allows for server-side rendering of complex UI
							components.
						</p>
					</div>
				</div>

				<div className="mx-auto max-w-4xl">
					<h1 className="rr-heading mb-8 text-3xl font-bold">
						Movie Collection
					</h1>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{loaderData.movieCards}
					</div>

					<div className="rr-card mt-8">
						<h3 className="rr-heading mb-2 font-semibold">What's new:</h3>
						<ul className="rr-text space-y-1 text-sm">
							<li>
								• Loader now returns React Server Components via{' '}
								<span className="rr-code">movieCards</span>
							</li>
							<li>• Server-side rendering of complex UI components</li>
							<li>• Reduced client-side JavaScript bundle size</li>
							<li>• Better performance and SEO</li>
							<li>• Same data fetching, but with server-rendered UI</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	)
}
