import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@pages/signUp/SignUp'

export const Route = createFileRoute('/signUp')({
	component: SignUp,
})
