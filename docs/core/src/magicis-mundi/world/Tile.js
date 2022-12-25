class Tile{	
	constructor(x, y, data){
		this.x = x; this.y = y;
		this.biome = null;
		
		this.light = () => Vars.maxLight;
        this.elevation = data.elevation||0;
		
		this.floor = data.floor||null;
		this.block = data.block||null;
		this.overlay = data.overlay||null;
	}
}
