# React Router's take on RSC - Talk Outline

## Talk Details

- **Duration**: 10 minutes (lightning talk)
- **Audience**: React developers at React Conf (already sold on RSC)
- **Goal**: Show React Router's unique approach to RSC integration

## Structure Overview

### 1. The React Router RSC Philosophy (1.5 minutes)

- **Key Message**: "We didn't just add RSC support - we reimagined our
  architecture"
- **Two Modes**: Framework Mode (file-based) vs Data Mode (API-based)
- **The Insight**: RSC let us simplify our codebase significantly
- **Demo**: Show both modes working in the same app

### 2. RSC from Loaders - The Incremental Gateway (2.5 minutes)

- **React Router's Unique Take**: Return React elements from loaders/actions
- **Why This Matters**: Incremental adoption without rewrites
- **Code Demo**: Show existing route enhanced with RSC content

```tsx
export async function loader({ params }) {
	let { contentBlocks } = await getProduct(params.productId)
	return {
		product,
		// React Router's unique feature: RSC content from loaders
		content: (
			<div>
				{contentBlocks.map((block) => {
					switch (block.type) {
						case 'image':
							return <ImageBlock {...block} />
						case 'video':
							return <VideoBlock {...block} />
						// Only rendered components go to browser!
					}
				})}
			</div>
		),
	}
}
```

### 3. Server Component Routes - The Full Vision (2 minutes)

- **React Router's Pattern**: `export async function ServerComponent()` instead
  of `default`
- **Mixed Architecture**: Server routes + client routes in same app tree
- **Zero Bundle**: These routes never send JS to browser
- **Show**: Route that's purely server-rendered

```tsx
export async function ServerComponent({ params }) {
	let project = await loadProduct(params.projectId)
	return (
		<>
			<title>{project.name}</title>
			<ProjectScreen project={project} />
		</>
	)
}
```

### 4. The Data Mode Revolution (2 minutes)

- **React Router's Innovation**: Lower-level RSC APIs
- **Framework Mode**: Built on top of Data Mode
- **Bundler Agnostic**: Works with Vite, Parcel, or custom setups
- **Show**: How Data Mode enables custom frameworks

```tsx
// Data Mode - pure React Router APIs
matchRSCServerRequest({
	routes: [{ path: '/', Component: Root }],
	generateResponse(match) {
		return new Response(renderToReadableStream(match.payload))
	},
})
```

### 5. Server Functions Integration (1.5 minutes)

- **React Router's Approach**: Automatic revalidation after server actions
- **No Cache Management**: React Router handles it all
- **Seamless UX**: Form submissions just work

```tsx
'use server'
export async function updateFavorite(formData: FormData) {
	let movieId = formData.get('id')
	await toggleFavorite(Number(movieId))
	// React Router automatically revalidates the route!
}
```

### 6. The Architectural Win (0.5 minutes)

- **Key Point**: React Router got simpler because React does more
- **Future**: Framework becomes optional, Data Mode is the foundation
- **Benefit**: Any bundler, any server, any JavaScript runtime

## Demo Strategy

- **Live Coding**: Build routes in the editor as "slides"
- **Show**: Both Framework Mode and Data Mode in action
- **Highlight**: React Router's unique RSC patterns

## Key Messages to Emphasize

1. **React Router's Unique Approach**: Not just RSC support, but reimagined
   architecture
2. **Incremental Adoption**: RSC from loaders bridges old and new
3. **Two-Mode Strategy**: Framework Mode for convenience, Data Mode for
   flexibility
4. **Bundler Agnostic**: Works with any RSC-enabled bundler
5. **Simplified Codebase**: RSC let React Router do less, React do more

## Call to Action

- Try the experimental templates (Framework Mode and Data Mode)
- Experiment with RSC from loaders in existing apps
- Give feedback on the Data Mode APIs
- Build custom frameworks on Data Mode

## Technical Notes

- Focus on React Router's unique contributions to RSC
- Emphasize the architectural decisions and trade-offs
- Show how Data Mode enables new possibilities
- Demonstrate that this isn't just following React's lead, but innovating on it

## React Router's Unique RSC Features

1. **RSC from Loaders/Actions**: No other framework does this
2. **Mixed Server/Client Routes**: Same route tree, different rendering
   strategies
3. **Data Mode APIs**: Lower-level foundation for custom frameworks
4. **Automatic Revalidation**: Server actions just work without cache management
5. **Bundler Flexibility**: Not tied to any specific bundler implementation
