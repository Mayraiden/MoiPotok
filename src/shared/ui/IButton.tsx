type IButtonProps = {
	type: 'submit' | 'button'
	text: string
	className: string
	disabled?: boolean
	onClick?: () => void
}
export const IButton = ({ ...props }: IButtonProps) => {
	return <button {...props}>{props.text}</button>
}
