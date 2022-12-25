class World{
	constructor(name, seed, size, height, generators){
		this.caveGenerator = generators.cave;
	    this.mainGenerator = generators.main;//new OpenWorldGenerator(seed);
	    //this.DUNGEON_GENERATOR = new CaveGenerator();
			
		this.activeDimension = 1;
		
		this.dimensions = [];
		
		this.name = name;
		this.SIZE = size;
		this.height = this.dimensions.length = height;
	}
	
	generate(){
		for(let height = 0; height < this.height; height++){
			if(height !== (this.height-1)){
			        this.dimensions[height] = new Dimension(this.SIZE, height, this.caveGenerator)
			}else{
				this.dimensions[height] = new Dimension(this.SIZE, height, this.mainGenerator);
			}
			this.dimensions[height].generate();
		}
	}
	
	getActiveDimension(){
		return this.dimensions[this.activeDimension];
	}
	
	playerAdd(player, dimensionIndex){
		this.dimensions[dimensionIndex].entities.add(player);
	}
	
	update(){
		this.dimensions[this.activeDimension].update();
	}
}
