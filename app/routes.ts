import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('products/:productId', 'routes/products.$productId.tsx'),
	route('projects/:projectId', 'routes/projects.$projectId.tsx'),
	route('movies', 'routes/movies/index.tsx'),
	route('dashboard', 'routes/dashboard/index.tsx'),
	// Progressive demos
	route('demo-1', 'routes/demo-1/index.tsx'),
	route('demo-1/:movieId', 'routes/demo-1/$movieId.tsx'),
	route('demo-2', 'routes/demo-2/index.tsx'),
	route('demo-2/:movieId', 'routes/demo-2/$movieId.tsx'),
	route('demo-3', 'routes/demo-3/index.tsx'),
	route('demo-3/:movieId', 'routes/demo-3/$movieId.tsx'),
	route('demo-4', 'routes/demo-4/index.tsx'),
	route('demo-4/:movieId', 'routes/demo-4/$movieId.tsx'),
	route('demo-5', 'routes/demo-5/index.tsx'),
	route('demo-5/:movieId', 'routes/demo-5/$movieId.tsx'),
] satisfies RouteConfig
