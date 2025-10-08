import { UserIcon, UsersIcon, TrendUpIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'

export const Sidebar = () => {
	return (
		<aside className="absolute left-2 top-2 w-[15%] h-[97.6%] ring-1 ring-white/20 backdrop-blur-2xl rounded-2xl">
			<nav className="w-full h-full p-2">
				<ul className="w-full">
					<li className="w-full flex gap-1">
						<UserIcon size={20} />
						<Link to="/profile">Профиль</Link>
					</li>
					<li className="w-full flex gap-1">
						<UsersIcon size={20} />
						<Link to="/friends">Друзья</Link>
					</li>
					<li className="w-full flex gap-1">
						<TrendUpIcon size={20} />
						<Link to="/challenges">Мои челленджи</Link>
					</li>
				</ul>
			</nav>
		</aside>
	)
}
