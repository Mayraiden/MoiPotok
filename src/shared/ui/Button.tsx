type IButtonProps = {
	type: 'submit' | 'button'
	text: string
	className: string
	disabled?: boolean
	onClick?: () => void
}
export const IButton = ({ ...props }: IButtonProps) => {
	return <button className={props.className}>{props.text}</button>
}
