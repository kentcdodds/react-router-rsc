import type { Route } from './+types/data-mode'

// Mock data for demonstration
async function getDataModeData() {
	await new Promise((resolve) => setTimeout(resolve, 100))
	return {
		message: 'Hello from Data Mode!',
		timestamp: new Date().toISOString(),
		features: [
			'Lower-level RSC APIs',
			'Bundler agnostic',
			'Custom framework foundation',
			'Pure React Router APIs',
		],
	}
}

// Data Mode demonstration component
function DataModeDemo({ data }: { data: any }) {
	return (
		<div className="mx-auto max-w-4xl">
			<div className="rr-highlight mb-8">
				<h2 className="rr-heading mb-4 text-2xl font-bold">
					🔧 Data Mode APIs Demo
				</h2>
				<p className="rr-text mb-4">
					This demonstrates React Router's lower-level RSC APIs that enable
					custom frameworks. Data Mode provides the foundation that Framework
					Mode is built on top of.
				</p>
				<div className="rr-card">
					<h3 className="rr-heading mb-2 font-semibold">Key Features:</h3>
					<ul className="rr-text space-y-1 text-sm">
						{data.features.map((feature: string, index: number) => (
							<li key={index}>• {feature}</li>
						))}
					</ul>
				</div>
			</div>

			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="rr-card">
					<h3 className="rr-heading mb-4 text-lg font-semibold">
						Framework Mode
					</h3>
					<p className="rr-text mb-4">
						Built on top of Data Mode, provides file-based routing and
						convenient conventions.
					</p>
					<div className="rounded bg-gray-50 p-3 font-mono text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
						<div>// File-based routes</div>
						<div>app/routes/home.tsx</div>
						<div>app/routes/products.$id.tsx</div>
					</div>
				</div>

				<div className="rr-card">
					<h3 className="rr-heading mb-4 text-lg font-semibold">Data Mode</h3>
					<p className="rr-text mb-4">
						Lower-level APIs that work with any bundler and enable custom
						frameworks.
					</p>
					<div className="rounded bg-gray-50 p-3 font-mono text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
						<div>matchRSCServerRequest({`{`}</div>
						<div> routes: [...],</div>
						<div> generateResponse() {`{`}</div>
						<div> return new Response(...)</div>
						<div> {`}`}</div>
						<div>{`}`})</div>
					</div>
				</div>
			</div>

			<div className="rr-card mb-8">
				<h3 className="rr-heading mb-4 text-lg font-semibold">
					Data Mode Benefits
				</h3>
				<div className="rr-text grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<h4 className="rr-heading mb-2 font-semibold">Bundler Agnostic</h4>
						<p className="text-sm">Works with Vite, Parcel, or custom setups</p>
					</div>
					<div>
						<h4 className="rr-heading mb-2 font-semibold">Custom Frameworks</h4>
						<p className="text-sm">
							Build your own framework on top of Data Mode
						</p>
					</div>
					<div>
						<h4 className="rr-heading mb-2 font-semibold">
							Server Flexibility
						</h4>
						<p className="text-sm">Any JavaScript runtime, any server</p>
					</div>
					<div>
						<h4 className="rr-heading mb-2 font-semibold">Pure APIs</h4>
						<p className="text-sm">
							Direct access to React Router's RSC capabilities
						</p>
					</div>
				</div>
			</div>

			<div className="rr-card">
				<h3 className="rr-heading mb-4 text-lg font-semibold">
					Example: Custom Framework Implementation
				</h3>
				<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-green-400">
					<div>
						import {`{ matchRSCServerRequest }`} from "react-router/server";
					</div>
					<div>
						import {`{ renderToReadableStream }`} from "react-dom/server";
					</div>
					<div></div>
					<div>// Custom framework built on Data Mode</div>
					<div>matchRSCServerRequest({`{`}</div>
					<div> routes: [</div>
					<div> {`{ path: "/", Component: HomePage }`},</div>
					<div> {`{ path: "/products/:id", Component: ProductPage }`}</div>
					<div> ],</div>
					<div> generateResponse(match) {`{`}</div>
					<div> return new Response(</div>
					<div> renderToReadableStream(match.payload)</div>
					<div> );</div>
					<div> {`}`}</div>
					<div>{`}`});</div>
				</div>
			</div>
		</div>
	)
}

export async function loader() {
	return {
		dataModeData: await getDataModeData(),
	}
}

export function meta() {
	return [
		{ title: 'Data Mode APIs - React Router RSC Demo' },
		{
			name: 'description',
			content:
				"Demonstrating React Router's lower-level RSC APIs for custom frameworks",
		},
	]
}

export default function DataModePage(props: Route.ComponentProps) {
	const data = props.loaderData

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-6xl px-6 py-16">
				<div className="mb-8">
					<nav className="rr-text mb-6 text-sm">
						<a href="/" className="rr-link">
							← Back to Home
						</a>
					</nav>
				</div>

				<DataModeDemo data={data.dataModeData} />
			</div>
		</main>
	)
}
