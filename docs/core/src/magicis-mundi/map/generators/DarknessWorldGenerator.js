class DarknessWorldGenerator extends BasicGenerator{
	genTile(x, y){
		let tile = super.genTile(x, y);
		
		let dimension = this.settings.dimension;
		let dayCircle = true;
		let dayDuration = 15;
		
		var simplex = new SimplexNoiseObject(this.seed);
		
		//let land = simplex.octaveNoise2(x, y, 100, [0.2, 0.3, 1]);
		let river = Math.abs(simplex.octaveNoise2(x, y, 140, [0.3, 1]));
		//let forest = simplex.octaveNoise2(x, y, 60, [0.2, 0.3, 1]);
		
		tile.floor = Blocks.void;
		tile.biome = 'void';
		
		if(river > 0.3){
			tile.floor = Blocks.distortedGrass;
			tile.elevation = 1+Math.round(river*6);
			tile.biome = 'void-island';
		}
		
		tile.light = () => tile.light = () => {
			let dimensionTime = Core.time - dimension.generateTime;
			
		    let playerx = Vars.changeable.player.position.x;
			let playery = Vars.changeable.player.position.y;
			
			let distanceToPlayer = Math.round( Math.sqrt((x-playerx)**2 + (y-playery)**2) );
				
			return Math.max((Math.round(Vars.maxLight/2 * Math.cos(dimensionTime / dayDuration/2)) + Vars.maxLight - distanceToPlayer), 0);
		};
		
		return tile;
	}
}
