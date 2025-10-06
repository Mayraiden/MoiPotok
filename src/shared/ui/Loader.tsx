type ILoaderProps = {
	isVisible: boolean
}
export const Loader = ({ isVisible }: ILoaderProps) => {
	if (!isVisible) return null

	return (
		<div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
			<div className="relative">
				<div className="w-12 h-12 border-4 border-white/20 rounded-full" />
				<div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin" />
			</div>
		</div>
	)
}
