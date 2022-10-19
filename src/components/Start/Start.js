import "./Start.css"
import { useEffect, useState } from "react"
import rain from "../../assets/rainAlone.mp3"
//import scream from "../../assets/Scream.wav"
import scream from "../../assets/Maniacal.wav"

let screamObj;

export const Start = ({ started, setStarted, gain }) => 
{
	useEffect (() => {
		handleAudio (started);
	}, [started])

	useEffect (() => {
		window.addEventListener ('keydown', handleEsc);
	}, []);

	const handleClick = () => 
	{
		setStarted (!started);
		console.log("Click");
	}

	const handleAudio = (inState) => 
	{
		let audio = document.querySelector(".soundFile");
		screamObj = document.querySelector(".screamSound");
		
		console.log("Handle audio:", inState);

		if (inState)
		{
			audio.volume = 0.2;
			audio.play();

			screamObj.play();
			screamObj.loop = true;
		}

		else
		{
			audio.pause();
			screamObj.pause();
		}
	}

	const handleEsc = (event) => 
	{
		if (event.keyCode === 27){
			setStarted (false);
			console.log("Stop")
		}
	};

	useEffect (() => {
		changeVolume (gain)
		screamObj.volume = gain;
	}, [gain])

	const changeVolume = () => {
		console.log ("Start Sound:", gain);
	}

	return 	(
		<div className="start" style={{display: started ? "none" : "flex"}}>
			<h1>Welcome</h1>
			<button onClick = {handleClick}> Start </button>
			<audio src = {rain} className="soundFile"></audio>
			<audio src = {scream} className="screamSound"></audio>
		</div>
	)

}