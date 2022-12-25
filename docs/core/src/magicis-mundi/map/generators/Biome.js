/*class Biome {
	
	treeChance = 0;
	generator = null;
	
	constructor(name, temperature, humidity){
		this.name = name;
		this.temperature = temperature;
		//0 - 25
		this.humidity = humidity;
		//0 - 25
	}
	
	hasCustomGenerator(){
		return this.generator !== null;
	}
	
	getOccurrenceChance(temp, hum /*x, y ){
		let tempDifference = Math.abs(temp - this.temperature);
		let humDifference = Math.abs(hum - this.humidity);
		
		if(tempDifference > 10){
		        return 0;
				
		}else if(tempDifference > 5){
			
			if(humDifference > 10){
				return 0;
			}else if(humDifference > 5){
				return 40;
			}else if(humDifference > 2){
				return 55;
			}else if(humDifference <= 1){
				return 65;
			}
			
		}else if(tempDifference > 2){
			if(humDifference > 10){
				return 0;
			}else if(humDifference > 5){
				return 60;
			}else if(humDifference > 2){
				return 75;
			}else if(humDifference <= 1){
				return 85;
			}
			
		}else if(tempDifference <= 1){
			if(humDifference > 10){
				return 0;
			}else if(humDifference > 5){
				return 80;
			}else if(humDifference > 2){
				return 90;
			}else if(humDifference <= 1){
				return 100;
			}
		}
			
		//return occurence;
	}
}*/