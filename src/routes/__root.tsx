import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
	<>
		<hr />
		<Outlet />
	</>
)

export const Route = createRootRoute({ component: RootLayout })
