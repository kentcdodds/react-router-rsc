'use client'

import React from 'react'
import { Link } from 'react-router'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { type Movie } from '#app/movies-data.ts'

// Client component for interactive elements
export function MovieCard({ movie }: { movie: Movie }) {
	const [showTrailer, setShowTrailer] = React.useState(false)

	return (
		<div className="rr-card">
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

				{/* Interactive trailer button */}
				<div className="mb-4">
					<button
						onClick={() => setShowTrailer(!showTrailer)}
						className="rr-button"
					>
						{showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
					</button>
					{showTrailer && (
						<div className="mt-4">
							<LiteYouTubeEmbed
								id={movie.youtubeId}
								title={movie.title}
								params="autoplay=1&mute=0&rel=0&modestbranding=1"
								alwaysLoadIframe={true}
							/>
						</div>
					)}
				</div>

				<div className="flex items-center gap-2">
					<span className="rr-badge">
						{movie.isFavorite ? 'Favorite' : 'Not Favorite'}
					</span>
					<Link to={`/demo-5/${movie.id}`} className="rr-link text-sm">
						View Details →
					</Link>
				</div>
			</div>
		</div>
	)
}
