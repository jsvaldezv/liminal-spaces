import { useState } 	from 'react';
import { Physics } 		from '@react-three/cannon';
import { Sky } 			from '@react-three/drei';
import { Shadow } 			from '@react-three/drei';
import { Cloud } 			from '@react-three/drei';
import { Stars } 		from '@react-three/drei';
import { Canvas } 		from '@react-three/fiber';
import { Ground } 		from './components/Ground'; 
import { Player } 		from './components/Player';
import { FPV } 			from './components/FPV';
import { Cubes } 		from './components/Cubes';
import { Sound } 		from './components/Sound';
import { Start }		from "./components/Start/Start"

function App() 
{
	const [started, setStarted] = useState (false);
	const [gain, setGain] = useState (0.0);

  	return (
		<>
		<Start started = {started} setStarted = {setStarted} gain = {gain} />
		<Canvas>

			<Sky distance={400} sunPosition={[0,0,0]} exposure={0} elevation={0} turbidity={1.6} rayleigh={0.3}/>
			<FPV/>
			<Stars radius={100} depth={50} count={5000} factor={5} saturation={0} fade speed={1} />
			<ambientLight intensity={0.05}/>	
			<Shadow
  				color="black"
 			 	colorStop={100}
  				opacity={0.5}
  				fog={true} />	
			<Cloud
				opacity={1}
				speed={0.4} // Rotation speed
				width={10} // Width of the full cloud
				depth={1.5} // Z-dir depth
				segments={200} />		
			<Physics>
				<Player started = {started} setGain = {setGain}/>
				<Cubes />
				<Ground /> 
			</Physics>

		</Canvas>
		<Sound />
		</>
  	);
}

export default App;
