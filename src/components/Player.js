import { useFrame, useThree }	from "@react-three/fiber"
import { useSphere } 			from "@react-three/cannon"
import { useEffect, useRef, useLayoutEffect, useState } 	from "react"
import { Vector3 } 				from "three"
import { useKeyboard } 			from "../hooks/useKeyboard"
import { useStore } 			from "../hooks/useStore"
import { WebMidi } from "webmidi";

const JUMP_FORCE = 4 
const SPEED = 4
let channelOne;

export const Player = () => 
{
	const [mounted, setMounted] = useState(false);

	//*********************************** MIDI *****************************//
	useLayoutEffect(() => {

		WebMidi.enable()
			.then (onEnabled)
			.catch (err => alert(err));

    }, []);

	function startAudio() { channelOne.playNote ("C3"); }

	function stopAudio() { channelOne.stopNote ("C3"); }

	function mapValue (x, in_min, in_max, out_min, out_max) 
	{
		return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	function sendMIDI (inDistance)
	{
		let newValue = mapValue (inDistance, 0, 40, 20, 120);
		channelOne.sendControlChange (7, newValue);
		console.log (newValue);
	}

	function onEnabled() 
	{
		// Inputs
		WebMidi.inputs.forEach (input => console.log (input.name)); 
		// Outputs
		WebMidi.outputs.forEach (output => console.log (output.name));

		const myOutput = WebMidi.outputs[0]
		channelOne = myOutput.channels[1]

		setMounted (true);
		startAudio();
		console.log ("Enabled");
	}

	//***************************** Player movement ***********************/ 
	const [cubes, removeCube, addCube] = useStore ((state) => [state.cubes, state.removeCube, state.addCube])
	const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard()
	const { camera } = useThree()

	const[ref, api] = useSphere(()=> ({
		mass: 1, 
		type: 'Dynamic',
		position: [0,1,10]
	}))

	const pos = useRef ([0,0,0])
	useEffect (()=>{
		api.position.subscribe((p) => pos.current = p)
	}, [api.position])

	const vel = useRef ([0,0,0])
	useEffect (()=>{
		api.velocity.subscribe((v) => vel.current = v)
	}, [api.velocity])

	//***************************** Regenerate Cube **************************//
	//Round to decimals
	function roundToDecimals (inValue, inDecimals) { return parseFloat(inValue.toFixed(inDecimals)); }

	// Get 3D distance
	function distance3D (posA, posB) 
	{
		const dX = posA[0] - posB[0];
		const dY = posA[1] - posB[1];
		const dZ = posA[2] - posB[2];
		return Math.sqrt (dX * dX + dY * dY + dZ * dZ);
	}

	// Check if need to regenerate cube
	useEffect (()=>{

		if (mounted)
		{
			const xPlayer = roundToDecimals (pos.current[0], 1);
			const yPlayer = roundToDecimals (pos.current[1], 1);
			const zPlayer = roundToDecimals (pos.current[2], 1);
	
			const xCube	  = roundToDecimals (cubes[0].pos[0], 1);
			const yCube   = roundToDecimals (cubes[0].pos[1], 1);
			const zCube   = roundToDecimals (cubes[0].pos[2], 1);
	
			const distance = distance3D([xPlayer, yPlayer, zPlayer], [xCube, yCube, zCube]);
	
			sendMIDI (distance);
	
			/*console.log ("Player:", xPlayer, yPlayer, zPlayer)
			console.log ("Cube:", xCube, yCube, zCube)
			console.log ("Distance:", distance)*/
	
			if (distance <= 1.9)
			{
				removeCube (cubes[0].key)
				addCube (Math.floor(Math.random() * 20),
						 1,
						 Math.floor(Math.random() * 20))

				stopAudio();
			}
		}

	}, [pos.current[0], pos.current[1], pos.current[2]])

	//******************************* Move player **************************//
    useFrame (()=>{

        camera.position.copy (new Vector3(pos.current[0], pos.current[1], pos.current[2]))

        const direction = new Vector3()

        const frontVector = new Vector3 (0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0))

        const sideVector = new Vector3 ((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0)

        direction.subVectors(frontVector, sideVector)
				 .normalize()
				 .multiplyScalar(SPEED)
				 .applyEuler(camera.rotation)

        api.velocity.set (direction.x, vel.current[1], direction.z)

        if (jump && Math.abs(vel.current[1])< 0.005)
            api.velocity.set(vel.current[0], JUMP_FORCE,vel.current[2])
    })

    return ( <mesh ref = {ref}></mesh> )
}
