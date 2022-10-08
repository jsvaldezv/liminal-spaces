import { useFrame, useThree }	from "@react-three/fiber"
import { useSphere } 			from "@react-three/cannon"
import { useEffect, useRef } 	from "react"
import { Vector3 } 				from "three"
import { useKeyboard } 			from "../hooks/useKeyboard"
import { useStore } 			from "../hooks/useStore"

const JUMP_FORCE = 4 
const SPEED = 4 

export const Player = () => {

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

	// Round to decimals
	function roundToDecimals (inValue, inDecimals) { return parseFloat(inValue.toFixed(inDecimals)); }

	// Get 3D distance
	function distance3D (posA, posB) 
	{
		const dX = posA[0] - posB[0];
		const dY = posA[1] - posB[1];
		const dZ = posA[2] - posB[2];
		return Math.sqrt (dX * dX + dY * dY + dZ * dZ);
	}

	useEffect (()=>{

		const xPlayer = roundToDecimals (pos.current[0], 1);
		const yPlayer = roundToDecimals (pos.current[1], 1);
		const zPlayer = roundToDecimals (pos.current[2], 1);

		const xCube	  = roundToDecimals (cubes[0].pos[0], 1);
		const yCube   = roundToDecimals (cubes[0].pos[1], 1);
		const zCube   = roundToDecimals (cubes[0].pos[2], 1);

		const distance = distance3D([xPlayer, yPlayer, zPlayer], [xCube, yCube, zCube]);

		/*console.log ("Player:", xPlayer, yPlayer, zPlayer)
		console.log ("Cube:", xCube, yCube, zCube)
		console.log ("Distance:", distance)*/

		if (distance <= 1.9)
		{
			removeCube (cubes[0].key)
			addCube (Math.floor(Math.random() * 20),
					 1,
					 Math.floor(Math.random() * 20))
		}

	}, [pos.current[0], pos.current[1], pos.current[2]])

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
