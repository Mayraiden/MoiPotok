type IStatsProps = {
	title?: string
	clasName?: string
	children?: React.ReactNode
}
export const StatsCard = ({ title, clasName, children }: IStatsProps) => {
	return (
		<article className={clasName}>
			{children}
			<p>{title}</p>
		</article>
	)
}
