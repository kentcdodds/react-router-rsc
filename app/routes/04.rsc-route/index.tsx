import type { Route } from './+types/index'
import React from 'react'
import { Link } from 'react-router'
import { getMovies } from '#app/movies-data.ts'

export async function loader() {
	return {
		movies: await getMovies(),
	}
}

export function meta() {
	return [
		{ title: 'Demo 4: Server Component Routes' },
		{
			name: 'description',
			content: 'Pure server component routes - no client-side interactivity',
		},
	]
}

// This is a pure server component - no client-side JavaScript!
export default function Demo4Page({ loaderData }: Route.ComponentProps) {
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
							🚀 Demo 4: Server Component Routes
						</h2>
						<p className="rr-text text-sm">
							Pure server component routes! This entire page is rendered on the
							server. No client-side JavaScript, no interactivity - but maximum
							performance.
						</p>
					</div>
				</div>

				<div className="mx-auto max-w-4xl">
					<h1 className="rr-heading mb-8 text-3xl font-bold">
						Movie Collection
					</h1>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{loaderData.movies.map((movie) => (
							<Link
								key={movie.id}
								to={`/demo-4/${movie.id}`}
								className="rr-card transition-shadow hover:shadow-lg"
							>
								<div className="mb-4">
									<img
										src={movie.poster}
										alt={`${movie.title} poster`}
										className="mb-4 h-64 w-full rounded-lg object-cover"
									/>
									<h3 className="rr-heading text-lg font-semibold">
										{movie.title}
									</h3>
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
						))}
					</div>

					<div className="rr-card mt-8">
						<h3 className="rr-heading mb-2 font-semibold">What's different:</h3>
						<ul className="rr-text space-y-1 text-sm">
							<li>• Pure server component - no client-side JavaScript</li>
							<li>• Maximum performance and SEO</li>
							<li>• No interactivity (no favorites toggle)</li>
							<li>• Smaller bundle size</li>
							<li>• Faster initial page load</li>
							<li>• Perfect for content-heavy pages</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	)
}
