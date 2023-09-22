export default function FoodItem(props) {
	const { index, foodItem } = props
	let hours = foodItem.timeStamp.getHours()%12;
	if (hours === 0) hours = 12;

	return (
		<div key={index}>
			<div className={'health-status ' + (foodItem.isHealthy ? 'healthy' : 'unhealthy')}>
				<div className='foodName'>
					{foodItem.food} 
				</div>
				<div className="timeStamp">
					{ `${hours}:${(foodItem.timeStamp.getMinutes()<10 ? '0'+foodItem.timeStamp.getMinutes() : foodItem.timeStamp.getMinutes())} ` + (foodItem.timeStamp.getHours()/12<1 ? 'AM' : 'PM') }
				</div>
			</div>
		</div>
	)

}