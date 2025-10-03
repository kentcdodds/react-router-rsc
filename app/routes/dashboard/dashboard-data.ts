// Mock data for demonstration
export async function getDashboardData() {
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
