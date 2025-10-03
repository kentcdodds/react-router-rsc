import type { Route } from './+types/products.$productId'

export async function loader({ params }: Route.LoaderArgs) {
	const { productId } = params
	const product = await getProduct(productId)

	return {
		product,
		// React Router's RSC feature: content from loaders
		content: (
			<div className="mx-auto max-w-4xl px-4">
				<h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
				<p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
					${product.price}
				</p>
				<div className="prose prose-lg max-w-none">
					{product.contentBlocks.map((block, index) => {
						switch (block.type) {
							case 'image':
								return (
									<ImageBlock
										key={index}
										src={block.src}
										alt={block.alt || ''}
										caption={block.caption || ''}
									/>
								)
							case 'video':
								return (
									<VideoBlock
										key={index}
										src={block.src}
										title={block.title || ''}
									/>
								)
							case 'text':
								return <TextBlock key={index} content={block.content || ''} />
							default:
								return null
						}
					})}
				</div>
			</div>
		),
	}
}

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: `${data.product.name} - React Router RSC Demo` },
		{ name: 'description', content: data.product.description },
	]
}

export default function ProductPage(props: Route.ComponentProps) {
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
					<div className="rr-highlight mb-8">
						<h2 className="rr-heading mb-2 text-lg font-semibold">
							🚀 RSC from Loaders Demo
						</h2>
						<p className="rr-text text-sm">
							This content is rendered on the server using React Router's RSC
							from loaders feature. Only the final rendered HTML is sent to the
							browser - no JavaScript for these components!
						</p>
					</div>
				</div>

				{/* This content comes from the loader as RSC */}
				{data.content}
			</div>
		</main>
	)
}

// Server Components for content blocks
function ImageBlock({
	src,
	alt,
	caption,
}: {
	src: string
	alt: string
	caption: string
}) {
	return (
		<div className="my-8">
			<div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-gray-800">
				<img src={src} alt={alt} className="h-full w-full object-cover" />
			</div>
			{caption && (
				<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					{caption}
				</p>
			)}
		</div>
	)
}

function VideoBlock({ src, title }: { src: string; title: string }) {
	return (
		<div className="my-8">
			<h3 className="mb-4 text-lg font-semibold">{title}</h3>
			<div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:bg-gray-800">
				<video
					controls
					className="h-full w-full object-cover"
					preload="metadata"
				>
					<source src={src} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	)
}

function TextBlock({ content }: { content: string }) {
	return (
		<div className="my-6">
			<p className="leading-relaxed text-gray-700 dark:text-gray-300">
				{content}
			</p>
		</div>
	)
}

// Mock data for demonstration
async function getProduct(productId: string) {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 100))

	return {
		id: productId,
		name: `Product ${productId}`,
		price: 99.99,
		description: 'This is a great product with amazing features!',
		contentBlocks: [
			{
				type: 'image' as const,
				src: 'https://picsum.photos/seed/book/800/400',
				alt: 'Product image',
				caption: 'Beautiful product showcase',
			},
			{
				type: 'video' as const,
				src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
				title: 'Product Demo Video',
			},
			{
				type: 'text' as const,
				content:
					'This product is designed with cutting-edge technology and user-friendly features that make it perfect for both beginners and professionals.',
			},
			{
				type: 'image' as const,
				src: 'https://picsum.photos/seed/pear/800/400',
				alt: 'Product details',
				caption: 'Detailed view of the product',
			},
		],
	}
}
