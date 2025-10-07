import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('00', 'routes/00.playground/index.tsx'),
	route('00/:movieId', 'routes/00.playground/$movieId.tsx'),

	route('01', 'routes/01.basic-rr/index.tsx'),
	route('01/:movieId', 'routes/01.basic-rr/$movieId.tsx'),
	route('02', 'routes/02.loader-rsc/index.tsx'),
	route('02/:movieId', 'routes/02.loader-rsc/$movieId.tsx'),
	route('03', 'routes/03.loader-rsc/index.tsx'),
	route('03/:movieId', 'routes/03.loader-rsc/$movieId.tsx'),
	route('04', 'routes/04.rsc-route/index.tsx'),
	route('04/:movieId', 'routes/04.rsc-route/$movieId.tsx'),
	route('05', 'routes/05.use-client/index.tsx'),
	route('05/:movieId', 'routes/05.use-client/$movieId.tsx'),
] satisfies RouteConfig
