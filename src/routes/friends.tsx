import { Friends } from '@pages/friends/Friends'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/friends')({
	component: Friends,
})
