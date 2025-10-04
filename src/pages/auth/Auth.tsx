import DarkVeil from '@shared/ui/DarkVeils'
import { AuthForm } from '@features/auth/ui/AuthForm'

export const Auth = () => {
	return (
		<>
			<div className="h-screen w-screen relative overflow-hidden bg-[#141514]">
				<div className="w-full h-full absolute z-10 flex items-center justify-center text-white">
					<AuthForm />
				</div>

				<div className="w-full h-full relative z-2">
					<DarkVeil
						hueShift={0}
						noiseIntensity={0}
						scanlineIntensity={0}
						speed={0.7}
						scanlineFrequency={0}
						warpAmount={0}
						resolutionScale={1}
					/>
				</div>
			</div>
		</>
	)
}
