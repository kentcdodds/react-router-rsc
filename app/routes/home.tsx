import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'React Router RSC Demo' },
		{
			name: 'description',
			content:
				"Demonstrating React Router's approach to React Server Components",
		},
	]
}

export function ServerComponent() {
	return (
		<main className="bg-background min-h-screen">
			<div className="mx-auto max-w-6xl px-6 py-16">
				<header className="mb-16 text-center">
					<h1 className="rr-heading mb-6 text-5xl font-bold">
						React Router RSC Demo
					</h1>
					<p className="rr-text mx-auto mb-8 max-w-3xl text-xl">
						Exploring React Router's approach to React Server Components
					</p>
				</header>

				{/* Progressive Demos */}
				<div className="mb-16">
					<h2 className="rr-heading mb-8 text-center text-3xl font-bold">
						Progressive React Router Demos
					</h2>
					<p className="rr-text mb-12 text-center text-lg">
						Follow the evolution from basic React Router to advanced RSC
						features
					</p>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{/* Demo 1 */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">🚀</span>
								<h3 className="rr-heading text-lg font-semibold">
									Demo 1: Basic React Router v7
								</h3>
							</div>
							<p className="rr-text mb-4 text-sm">
								Foundation - basic React Router v7 with loaders and client-side
								navigation.
							</p>
							<a href="/demo-1" className="rr-button">
								View Demo →
							</a>
						</div>

						{/* Demo 2 */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">⚡</span>
								<h3 className="rr-heading text-lg font-semibold">
									Demo 2: RSCs from Loaders
								</h3>
							</div>
							<p className="rr-text mb-4 text-sm">
								Return React Server Components directly from loaders for
								server-side rendering.
							</p>
							<a href="/demo-2" className="rr-button">
								View Demo →
							</a>
						</div>

						{/* Demo 3 */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">❤️</span>
								<h3 className="rr-heading text-lg font-semibold">
									Demo 3: Server Functions
								</h3>
							</div>
							<p className="rr-text mb-4 text-sm">
								Add server functions with 'use server' for favorites and
								automatic revalidation.
							</p>
							<a href="/demo-3" className="rr-button">
								View Demo →
							</a>
						</div>

						{/* Demo 4 */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">🎯</span>
								<h3 className="rr-heading text-lg font-semibold">
									Demo 4: Server Component Routes
								</h3>
							</div>
							<p className="rr-text mb-4 text-sm">
								Pure server component routes - maximum performance, no
								client-side JavaScript.
							</p>
							<a href="/demo-4" className="rr-button">
								View Demo →
							</a>
						</div>

						{/* Demo 5 */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">🎬</span>
								<h3 className="rr-heading text-lg font-semibold">
									Demo 5: 'use client' for Interactivity
								</h3>
							</div>
							<p className="rr-text mb-4 text-sm">
								Best of both worlds - server components + client components with
								YouTube trailers.
							</p>
							<a href="/demo-5" className="rr-button">
								View Demo →
							</a>
						</div>
					</div>
				</div>

				{/* Original Demos */}
				<div className="mb-16">
					<h2 className="rr-heading mb-8 text-center text-3xl font-bold">
						Original Feature Demos
					</h2>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
						{/* RSC from Loaders */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">🚀</span>
								<h2 className="rr-heading text-xl font-semibold">
									RSC from Loaders
								</h2>
							</div>
							<p className="rr-text mb-6">
								Return React elements directly from loaders/actions. Seamlessly
								integrate server-rendered content into your existing routes.
							</p>
							<a href="/products/1" className="rr-button">
								View Demo →
							</a>
						</div>

						{/* Server Component Routes */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">🎯</span>
								<h2 className="rr-heading text-xl font-semibold">
									Server Component Routes
								</h2>
							</div>
							<p className="rr-text mb-6">
								Full server-rendered routes with{' '}
								<span className="rr-code">ServerComponent</span> export. Zero
								JavaScript sent to browser for maximum performance.
							</p>
							<a href="/projects/1" className="rr-button">
								View Demo →
							</a>
						</div>

						{/* Server Functions */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">⚡</span>
								<h2 className="rr-heading text-xl font-semibold">
									Server Functions
								</h2>
							</div>
							<p className="rr-text mb-6">
								Automatic revalidation after server actions. Seamless data
								updates without manual cache management.
							</p>
							<a href="/movies" className="rr-button">
								View Demo →
							</a>
						</div>

						{/* Mixed Routes */}
						<div className="rr-card">
							<div className="mb-4 flex items-center gap-3">
								<span className="text-2xl">🔄</span>
								<h2 className="rr-heading text-xl font-semibold">
									Mixed Server/Client Routes
								</h2>
							</div>
							<p className="rr-text mb-6">
								Server routes + client routes in same app tree. Combine server
								performance with client interactivity.
							</p>
							<a href="/dashboard" className="rr-button">
								View Demo →
							</a>
						</div>
					</div>
				</div>

				<div className="rr-highlight">
					<h3 className="rr-heading mb-4 text-lg font-semibold">
						🎉 React Router's RSC Features
					</h3>
					<ul className="rr-text space-y-2">
						<li>
							•{' '}
							<strong className="rr-heading">RSC from Loaders/Actions:</strong>{' '}
							Return React elements directly from data functions
						</li>
						<li>
							•{' '}
							<strong className="rr-heading">
								Mixed Server/Client Routes:
							</strong>{' '}
							Same route tree, flexible rendering strategies
						</li>
						<li>
							• <strong className="rr-heading">Automatic Revalidation:</strong>{' '}
							Server actions seamlessly update your data
						</li>
						<li>
							• <strong className="rr-heading">Bundler Flexibility:</strong>{' '}
							Works with any RSC-enabled bundler
						</li>
						<li>
							• <strong className="rr-heading">Incremental Adoption:</strong>{' '}
							RSC from loaders bridges existing and new patterns
						</li>
					</ul>
				</div>
			</div>
		</main>
	)
}
