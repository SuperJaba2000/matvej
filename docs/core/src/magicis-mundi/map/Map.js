class Map{
	constructor(name, version){
		this.name = name;
		this.version = version;
		
		this.activeWorld = 0;
		
		this.SEED = 12345;
	    this.SIZE = 250;
	}
	
	generate(){
		this.worlds = [];
		
		let seed = this.SEED;
		
		this.worlds = [
		    new World('Basic World', seed, this.SIZE, 2, {
				cave: new CaveGenerator(seed),
				main: new TestWorldGenerator(seed)
			}), 
			
            new World('Darkness', seed, this.SIZE, 2, {
				cave: new CaveGenerator(seed),
				main: new DarknessWorldGenerator(seed)
			})
		];
		
		for(let world of this.worlds){
			world.generate();
		}
		
		Vars.changeable.player.position.x = Math.round(this.SIZE / 2)+5;
		Vars.changeable.player.position.y = Math.round(this.SIZE / 2)+4;
		
		Vars.changeable.camera.position.x = Math.round(this.SIZE / 2)+5;
		Vars.changeable.camera.position.y = Math.round(this.SIZE / 2)+4;
	}
	
	update(){
		this.worlds[this.activeWorld].update();
	}
	
	playerAdd(player, worldIndex, dimensionIndex){
		this.worlds[worldIndex].playerAdd(player, dimensionIndex);
	}
	
	getActiveWorld() {
		return this.worlds[this.activeWorld];
	}
}