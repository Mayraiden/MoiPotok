type IInputProps = {
	value: string
	placeholder?: string
	type?: 'text' | 'password' | 'email'
	disabled?: boolean
	className?: string
	onChange: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const IInput = ({ ...props }: IInputProps) => {
	return <input {...props} />
}
