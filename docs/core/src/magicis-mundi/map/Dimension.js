class Dimension{
	constructor(size, elevation, gen){
		this.dayCircle = false;
		this.dayDuration = 1000;
		
		this.elevation = elevation;
		this.generator = gen;
		this.tiles = new Tiles(size, size);
	}
	
	generate(){
		this.entities = new EntitiesSet(Number.MAX_SAFE_INTEGER);
		
		let dayCircle = this.dayCircle;
		let dayDuration = this.dayDuration;
		
		let self = this;
		
		this.generator.generate(this.tiles, {
			dayCircle: dayCircle, 
			dayDuration: dayDuration,
			
			dimension: self
		}, this.entities);
		
		this.generateTime = Core.time;
	}
	
	update(){
		//this.entities.update();
	}
}