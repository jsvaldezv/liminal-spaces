import create from "zustand"
import { nanoid } from "nanoid"

const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const useStore = create((set) => ({
	
	texture:"dirt",
	cubes: [{
		key: nanoid(),
		pos: [2, 0.5, 0],
		texture: "glass"
	}],

	addCube: (x,y,z) => {
		set((prev) => ({
			cubes: [
				...prev.cubes,
				{ 
					key: nanoid(),
					pos: [x, y, z],
					texture: prev.texture
				}
			]
		}))
	},

	removeCube: (x, y, z) => {
		set((prev) => ({
			cubes: prev.cubes.filter(cube => {
				const [X, Y, Z] = cube.pos
				return X !== x || Y !== y || Z !== z
			})

		}))
	},

	saveWorld: () => {
		set((prev) => {
			setLocalStorage('cubes', prev.cubes)
		})
	},

	resetWorld: () => {
		set(() => ({
			cubes: []
		}))
	},

}))