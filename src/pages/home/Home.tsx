import { Navigation } from '../../widgets/navigatoin/ui/Navigation'
import Plasma from '../../shared/Plasma'
import { Link } from '@tanstack/react-router'

export const Home = () => {
	return (
		<>
			<div className="w-full h-full relative bg-black overflow-hidden">
				<Plasma
					color="#0460ff"
					speed={0.7}
					direction="forward"
					scale={1.2}
					opacity={1}
					mouseInteractive={false}
				/>

				<div className="w-screen h-screen pt-12 absolute inset-0 z-10 left-0 top-0 flex flex-col items-center">
					<Navigation />
					<h1 className="mb-12 text-5xl font-bold text-center leading-14 select-none text-white">
						Каждый день - шаг к себе. <br /> Начни прямо сейчас.
					</h1>
					<div className="w-[25%] flex justify-between gap-4">
						<Link
							className="w-38 h-10 px-4 py-6 flex items-center justify-center bg-white rounded-4xl"
							to="/auth"
						>
							Попробовать
						</Link>
						<Link
							className="w-38 h-10 px-4 py-6 flex items-center justify-center bg-white/5 text-white border-1 border-white rounded-4xl backdrop-blur-lg"
							to="/auth"
						>
							Узнать больше
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
