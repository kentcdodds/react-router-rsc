import { useState } from 'react'
import type { Route } from './+types/dashboard'

// Mock data for demonstration
async function getDashboardData() {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 200))

	return {
		user: {
			name: 'John Doe',
			email: 'john@example.com',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
		},
		stats: {
			totalProjects: 12,
			activeTasks: 8,
			completedTasks: 45,
			teamMembers: 5,
		},
		recentActivity: [
			{
				id: 1,
				action: 'Created new project',
				timestamp: '2 hours ago',
				type: 'project',
			},
			{
				id: 2,
				action: 'Completed task',
				timestamp: '4 hours ago',
				type: 'task',
			},
			{
				id: 3,
				action: 'Added team member',
				timestamp: '1 day ago',
				type: 'team',
			},
			{
				id: 4,
				action: 'Updated documentation',
				timestamp: '2 days ago',
				type: 'doc',
			},
		],
	}
}

export async function loader() {
	return {
		dashboardData: await getDashboardData(),
	}
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

// Client component for interactivity
function InteractiveCounter() {
	const [count, setCount] = useState(0)

	return (
		<div className="rr-card">
			<h3 className="rr-heading mb-4 text-lg font-semibold">
				Interactive Counter (Client Component)
			</h3>
			<div className="flex items-center gap-4">
				<button onClick={() => setCount((c) => c - 1)} className="rr-button">
					-
				</button>
				<span className="rr-heading min-w-[3rem] text-center text-2xl font-bold">
					{count}
				</span>
				<button onClick={() => setCount((c) => c + 1)} className="rr-button">
					+
				</button>
			</div>
			<p className="rr-text mt-2 text-sm">
				This counter uses React state and runs in the browser
			</p>
		</div>
	)
}

// Another client component
function LiveUpdates() {
	const [isLive, setIsLive] = useState(false)
	const [lastUpdate, setLastUpdate] = useState(new Date())

	const toggleLive = () => {
		setIsLive(!isLive)
		if (!isLive) {
			setLastUpdate(new Date())
		}
	}

	return (
		<div className="rr-card">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="rr-heading text-lg font-semibold">
					Live Updates (Client Component)
				</h3>
				<button onClick={toggleLive} className="rr-button">
					{isLive ? 'Stop' : 'Start'} Live
				</button>
			</div>

			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<div
						className={`h-3 w-3 rounded-full ${isLive ? 'animate-pulse bg-green-500' : 'bg-gray-400'}`}
					></div>
					<span className="rr-text text-sm">
						Status: {isLive ? 'Live' : 'Offline'}
					</span>
				</div>
				<p className="rr-text text-sm">
					Last update: {lastUpdate.toLocaleTimeString()}
				</p>
			</div>
		</div>
	)
}

export default function DashboardPage(props: Route.ComponentProps) {
	const data = props.loaderData
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
								src={data.dashboardData.user.avatar}
								alt={data.dashboardData.user.name}
								className="h-16 w-16 rounded-full"
							/>
							<div>
								<h1 className="rr-heading text-3xl font-bold">
									Welcome back, {data.dashboardData.user.name}!
								</h1>
								<p className="rr-text">{data.dashboardData.user.email}</p>
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
								{data.dashboardData.stats.totalProjects}
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
								{data.dashboardData.stats.activeTasks}
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
								{data.dashboardData.stats.completedTasks}
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
								{data.dashboardData.stats.teamMembers}
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
								{data.dashboardData.recentActivity.map((activity: any) => (
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
								))}
							</div>
						</div>

						{/* Client component */}
						<InteractiveCounter />
					</div>

					{/* Additional client component */}
					<LiveUpdates />
				</div>
			</div>
		</main>
	)
}
