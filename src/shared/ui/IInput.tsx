type IInputProps = {
	value?: string
	placeholder?: string
	type?: 'text' | 'password' | 'email'
	disabled?: boolean
	className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const IInput = ({ className, ...props }: IInputProps) => {
	return (
		<input
			className={`px-3 bg-white/10 rounded-2xl backdrop-blur-md autofill:!text-white focus:outline-1 focus:outline-indigo-500 ${className}`}
			{...props}
		/>
	)
}
