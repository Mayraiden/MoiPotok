import { Challenges } from '@pages/challanges/Challenges'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges')({
	component: Challenges,
})
