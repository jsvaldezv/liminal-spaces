import "./Start.css"

export const Start = ({started, changeStarted}) => 
{
	const handleClick = (e) => 
	{
		e.preventDefault();
		changeStarted();
	}

	return 	(
		<div className="start" style={{display: started ? "none" : "flex"}}>
			<h1>Welcome</h1>
			<button onClick={handleClick}>Start</button>
		</div>
	)

}