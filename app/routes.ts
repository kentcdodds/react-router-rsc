import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('products/:productId', 'routes/products.$productId.tsx'),
	route('projects/:projectId', 'routes/projects.$projectId.tsx'),
	route('movies', 'routes/movies/index.tsx'),
	route('dashboard', 'routes/dashboard/index.tsx'),
] satisfies RouteConfig
