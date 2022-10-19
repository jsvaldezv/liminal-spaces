import "./Start.css"
import { useEffect, useState } from "react"
import rain from "../assets/rainAlone.mp3"

export const Start = ({ started, setStarted }) => 
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
		console.log("Handle audio:", inState);

		if (inState)
			audio.play();

		else
			audio.pause();
	}

	const handleEsc = (event) => {
		if (event.keyCode === 27){
			setStarted (false);
			console.log("Stop")
		}
	};

	return 	(
		<div className="start" style={{display: started ? "none" : "flex"}}>
			<h1>Welcome</h1>
			<button onClick = {handleClick}> Start </button>
			<audio src = {rain} className="soundFile"></audio>
		</div>
	)

}