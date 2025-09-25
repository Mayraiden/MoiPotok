import { Link } from '@tanstack/react-router'
import { WebhooksLogoIcon } from '@phosphor-icons/react'

export const Navigation = () => {
	return (
		<nav className="w-1/2 h-18 p-4 mb-32 flex items-center justify-between rounded-4xl border-1 border-white/60 backdrop-blur-xl text-white">
			<WebhooksLogoIcon size={42} weight="regular" />
			<ul className="flex items-center gap-2 text-lg">
				<li>
					<Link to="/">Блог</Link>
				</li>
				<li>
					<Link to="/">О проекте</Link>
				</li>
			</ul>
		</nav>
	)
}
