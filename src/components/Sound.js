import React from "react"
import { Howl } from "howler"

export const Sound = () =>  {

	const soundSource = "https://freesound.org/people/InspectorJ/sounds/401276/download/401276__inspectorj__rain-moderate-b.wav"
	const callMySound = (src) => {
		const sound = new Howl({
			src,
			html5:true
		});
		sound.play();
	};

	return	(
		<div>
			<div onClick={() => callMySound(soundSource)}> Click </div>
		</div>
	);
}