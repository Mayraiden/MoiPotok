import { useAuthStore } from '@entities/user/store/authStore'
import { useAuth } from '@features/auth/model/useAuth'
import { IButton } from '@shared/ui/IButton'
import { Sidebar } from '@shared/ui/Sidebar'
import { StatsCard } from '@shared/ui/StatsCard'

export const Profile = () => {
	const user = useAuthStore((state) => state.user)
	const { logOut } = useAuth()

	return (
		<div className="w-screen h-screen relative p-2 bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex flex-col gap-2 text-white">
			<div className="w-[84%] h-full ml-auto flex flex-col gap-2 rounded-md">
				<div className="w-full flex gap-2">
					{/* main profile block */}
					<div className="w-1/3 h-full py-4 px-2 shrink-0 flex flex-col gap-6 items-center backdrop-blur-md rounded-xl ring-1 ring-white/20">
						<h1 className="text-2xl font-medium">{`${user?.email}`}</h1>
						<div className="w-70 h-70 rounded-full ring-2 ring-indigo-400 drop-shadow-md drop-shadow-amber-300">
							<img
								className="w-full h-full rounded-full object-cover object-top"
								src="/test.jpg"
								alt="profile img"
							/>
						</div>
						<IButton
							type="button"
							text="выйти"
							className="w-20 h-8 text-lg cursor-pointer bg-amber-700 rounded-md hover:bg-amber-800 transition-colors duration-200"
							onClick={logOut}
						/>
					</div>
					{/* Stats block */}
					<div className="w-full h-full py-4 px-2 grid grid-cols-3 grid-rows-4 gap-2 backdrop-blur-md rounded-xl ring-1 ring-white/20">
						<StatsCard
							clasName="p-2 flex flex-col gap-2 bg-black/60 rounded-lg ring-1 ring-white/10"
							title="Всего челленджей"
						>
							<p className="w-fit text-4xl border-b border-green-400">43</p>
						</StatsCard>
						<StatsCard
							clasName="p-2 flex flex-col gap-2 bg-black/60 rounded-lg ring-1 ring-white/10"
							title="Завершенных"
						>
							<p className="w-fit text-4xl border-b border-green-400">32</p>
						</StatsCard>
						<StatsCard
							clasName="p-2 flex flex-col gap-2 bg-black/60 rounded-lg ring-1 ring-white/10"
							title="Дней без пропусков"
						>
							<p className="w-fit text-4xl border-b border-green-400">28</p>
						</StatsCard>
					</div>
				</div>
				{/* All challenges block */}
				<div className="w-full h-full py-4 px-2 backdrop-blur-md rounded-xl ring-1 ring-white/20"></div>
			</div>
			<Sidebar />
		</div>
	)
}
