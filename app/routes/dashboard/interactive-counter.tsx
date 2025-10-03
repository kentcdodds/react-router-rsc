'use client'

import { useState } from 'react'

export function InteractiveCounter() {
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
