import type { Route } from './+types/index'
import { getDashboardData } from './dashboard-data.ts'
import { InteractiveCounter } from './interactive-counter'

export async function loader() {
	return { dashboardData: await getDashboardData() }
}

export function ServerComponent({ loaderData }: Route.ComponentProps) {
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
							🔄 Mixed Server/Client Demo
						</h2>
						<p className="rr-text text-sm">
							This page combines server-rendered content (user data, stats) with
							client components (interactive counter, live updates). Both server
							and client routes coexist in the same app tree!
						</p>
					</div>
				</div>

				<div className="mx-auto max-w-6xl">
					{/* Server-rendered header */}
					<header className="mb-8">
						<div className="mb-6 flex items-center gap-4">
							<img
								src={loaderData.dashboardData.user.avatar}
								alt={loaderData.dashboardData.user.name}
								className="h-16 w-16 rounded-full"
							/>
							<div>
								<h1 className="rr-heading text-3xl font-bold">
									Welcome back, {loaderData.dashboardData.user.name}!
								</h1>
								<p className="rr-text">{loaderData.dashboardData.user.email}</p>
							</div>
						</div>
					</header>

					{/* Server-rendered stats */}
					<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						<div className="rr-card">
							<h3 className="rr-heading mb-2 text-lg font-semibold">
								📁 Projects
							</h3>
							<p
								className="text-3xl font-bold"
								style={{ color: 'var(--rr-red)' }}
							>
								{loaderData.dashboardData.stats.totalProjects}
							</p>
						</div>

						<div className="rr-card">
							<h3 className="rr-heading mb-2 text-lg font-semibold">
								✅ Active Tasks
							</h3>
							<p
								className="text-3xl font-bold"
								style={{ color: 'var(--rr-gray-600)' }}
							>
								{loaderData.dashboardData.stats.activeTasks}
							</p>
						</div>

						<div className="rr-card">
							<h3 className="rr-heading mb-2 text-lg font-semibold">
								🎯 Completed
							</h3>
							<p
								className="text-3xl font-bold"
								style={{ color: 'var(--rr-red)' }}
							>
								{loaderData.dashboardData.stats.completedTasks}
							</p>
						</div>

						<div className="rr-card">
							<h3 className="rr-heading mb-2 text-lg font-semibold">
								👥 Team Members
							</h3>
							<p
								className="text-3xl font-bold"
								style={{ color: 'var(--rr-gray-600)' }}
							>
								{loaderData.dashboardData.stats.teamMembers}
							</p>
						</div>
					</div>

					{/* Mixed content: server-rendered data + client components */}
					<div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
						{/* Server-rendered recent activity */}
						<div className="rr-card">
							<h3 className="rr-heading mb-4 text-lg font-semibold">
								Recent Activity (Server-rendered)
							</h3>
							<div className="space-y-3">
								{loaderData.dashboardData.recentActivity.map(
									(activity: any) => (
										<div key={activity.id} className="flex items-center gap-3">
											<div
												className={`h-2 w-2 rounded-full ${
													activity.type === 'project'
														? 'bg-blue-500'
														: activity.type === 'task'
															? 'bg-green-500'
															: activity.type === 'team'
																? 'bg-purple-500'
																: 'bg-gray-500'
												}`}
											></div>
											<div className="flex-1">
												<p className="rr-heading text-sm">{activity.action}</p>
												<p className="rr-text text-xs">{activity.timestamp}</p>
											</div>
										</div>
									),
								)}
							</div>
						</div>

						{/* Client component */}
						<InteractiveCounter />
					</div>
				</div>
			</div>
		</main>
	)
}

export function meta() {
	return [
		{ title: 'Dashboard - Mixed Server/Client Demo' },
		{
			name: 'description',
			content:
				'Demonstrating mixed server and client components in React Router',
		},
	]
}
