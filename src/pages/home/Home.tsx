import { Navigation } from '../../widgets/navigatoin/ui/Navigation'
import Silk from '@shared/ui/Silk'
import { Link } from '@tanstack/react-router'

export const Home = () => {
	return (
		<>
			<div className="w-full h-full relative bg-black overflow-hidden">
				<Silk
					speed={5}
					scale={1}
					color="#4A00FF"
					noiseIntensity={1.5}
					rotation={0}
				/>

				<div className="w-screen h-screen pt-12 absolute inset-0 z-10 left-0 top-0 flex flex-col items-center">
					<Navigation />
					<h1 className="mb-12 text-5xl font-bold text-center leading-14 select-none text-white">
						Каждый день - шаг к себе. <br /> Начни прямо сейчас.
					</h1>
					<div className="w-[25%] flex justify-between gap-4">
						<Link
							className="w-38 h-10 px-4 py-6 flex items-center justify-center bg-white rounded-4xl hover:bg-indigo-600 hover:text-white transition-colors duration-200"
							to="/auth"
						>
							Попробовать
						</Link>
						<Link
							className="w-38 h-10 px-4 py-6 flex items-center justify-center bg-white/5 text-white border-1 border-white rounded-4xl backdrop-blur-lg hover:bg-white/10 transition-colors duration-200"
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
