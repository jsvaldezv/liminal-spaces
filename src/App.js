import { Physics } from '@react-three/cannon';
import {Sky} from '@react-three/drei';
import {Stars} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {Ground} from './components/Ground'; 
import{Player} from './components/Player';
import {FPV} from './components/FPV';

function App() {
  return (
    <>
      <Canvas>
        <Sky distance={40000} sunPosition={[0.1,-1,0.01]}/>
        <FPV/>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.2}/>
        
        <Physics>
          <Player/>
          <Ground /> 
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
