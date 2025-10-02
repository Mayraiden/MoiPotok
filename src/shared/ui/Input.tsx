type IInputProps = {
	value?: string
	placeholder?: string
	type?: 'text' | 'password' | 'email'
	disabled?: boolean
	className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const IInput = (props: IInputProps) => {
	return <input {...props} />
}
