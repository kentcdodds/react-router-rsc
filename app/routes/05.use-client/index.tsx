import type { Route } from './+types/index'
import React from 'react'
import { getMovies } from '#app/movies-data.ts'
import { MovieCard } from './movie-card'

// Server component as the main page
export async function ServerComponent() {
	const movies = await getMovies()
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
							🎯 Demo 5: 'use client' for Interactive Elements
						</h2>
						<p className="rr-text text-sm">
							The best of both worlds! Server components for content, client
							components for interactivity. Click "Watch Trailer" to see YouTube
							embeds in action.
						</p>
					</div>
				</div>

				<div className="mx-auto max-w-4xl">
					<h1 className="rr-heading mb-8 text-3xl font-bold">
						Movie Collection
					</h1>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{movies.map((movie) => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</div>

					<div className="rr-card mt-8">
						<h3 className="rr-heading mb-2 font-semibold">What's happening:</h3>
						<ul className="rr-text space-y-1 text-sm">
							<li>
								• <span className="rr-code">MovieCard</span> is a client
								component with 'use client'
							</li>
							<li>• Interactive trailer buttons with state management</li>
							<li>
								• YouTube embeds using{' '}
								<span className="rr-code">react-lite-youtube-embed</span>
							</li>
							<li>• Server component for the main page structure</li>
							<li>
								• Optimal performance: server-rendered content + client
								interactivity
							</li>
							<li>• Best of both worlds!</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	)
}

export function meta() {
	return [
		{ title: 'Demo 5: use client for Interactive Elements' },
		{
			name: 'description',
			content:
				'Combining server components with client components for optimal performance',
		},
	]
}
