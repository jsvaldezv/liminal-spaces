import create from "zustand"
import { nanoid } from "nanoid"

const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const useStore = create ((set) => ({

	cubes: [{
		key: nanoid(),
		pos: [1.0, 1.0, 1.0],
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

	removeCube: (x, y, z, key) => {
		set ((prev) => ({
			cubes: prev.cubes.filter (cube => cube.key === key)
			
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