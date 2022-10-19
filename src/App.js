import { useState } 	from 'react';
import { Physics } 		from '@react-three/cannon';
import { Sky } 			from '@react-three/drei';
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

			<Sky distance={40000} sunPosition={[0.1,-1,0.01]}/>
			<FPV/>
			<Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
			<ambientLight intensity={0.2}/>	

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
