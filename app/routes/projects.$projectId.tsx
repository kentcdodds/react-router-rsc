// Mock data for demonstration
async function loadProject(projectId: string) {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 150))

	return {
		id: projectId,
		name: `Project ${projectId}`,
		description:
			"A comprehensive project showcasing React Router's server component capabilities",
		status: 'active',
		createdAt: new Date().toISOString(),
		technologies: ['React', 'TypeScript', 'React Router', 'RSC'],
		metrics: {
			stars: Math.floor(Math.random() * 1000) + 100,
			forks: Math.floor(Math.random() * 100) + 10,
			issues: Math.floor(Math.random() * 50) + 5,
		},
	}
}

// Server Component - this is the key pattern!
export async function ServerComponent({
	params,
}: {
	params: { projectId: string }
}) {
	const project = await loadProject(params.projectId)

	return (
		<>
			<title>{project.name} - Server Component Route</title>
			<meta name="description" content={project.description} />

			<main className="min-h-screen bg-white dark:bg-gray-900">
				<div className="mx-auto max-w-6xl px-6 py-16">
					<div className="mb-8">
						<nav className="rr-text mb-6 text-sm">
							<a href="/" className="rr-link">
								← Back to Home
							</a>
						</nav>

						<div className="rr-highlight mb-8">
							<h2 className="rr-heading mb-2 text-lg font-semibold">
								🎯 Server Component Route Demo
							</h2>
							<p className="rr-text text-sm">
								This entire route is rendered on the server using React Router's
								ServerComponent export. Zero JavaScript is sent to the browser
								for this route!
							</p>
						</div>
					</div>

					<div className="mx-auto max-w-4xl">
						<header className="mb-8">
							<h1 className="rr-heading mb-4 text-4xl font-bold">
								{project.name}
							</h1>
							<p className="rr-text mb-6 text-xl">{project.description}</p>

							<div className="mb-6 flex flex-wrap gap-4">
								{project.technologies.map((tech) => (
									<span key={tech} className="rr-badge">
										{tech}
									</span>
								))}
							</div>
						</header>

						<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="rr-card">
								<h3 className="rr-heading mb-2 text-lg font-semibold">
									⭐ Stars
								</h3>
								<p
									className="text-3xl font-bold"
									style={{ color: 'var(--rr-red)' }}
								>
									{project.metrics.stars.toLocaleString()}
								</p>
							</div>

							<div className="rr-card">
								<h3 className="rr-heading mb-2 text-lg font-semibold">
									🍴 Forks
								</h3>
								<p
									className="text-3xl font-bold"
									style={{ color: 'var(--rr-gray-600)' }}
								>
									{project.metrics.forks.toLocaleString()}
								</p>
							</div>

							<div className="rr-card">
								<h3 className="rr-heading mb-2 text-lg font-semibold">
									🐛 Issues
								</h3>
								<p
									className="text-3xl font-bold"
									style={{ color: 'var(--rr-red)' }}
								>
									{project.metrics.issues.toLocaleString()}
								</p>
							</div>
						</div>

						<div className="rr-card">
							<h3 className="rr-heading mb-4 text-lg font-semibold">
								Project Details
							</h3>
							<dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<dt className="rr-text font-medium">Status</dt>
									<dd className="rr-heading capitalize">{project.status}</dd>
								</div>
								<div>
									<dt className="rr-text font-medium">Created</dt>
									<dd className="rr-heading">
										{new Date(project.createdAt).toLocaleDateString()}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
