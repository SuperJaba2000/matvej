class TestWorldGenerator extends BasicGenerator{
	genTile(x, y){
		let tile = super.genTile(x, y);
		
		let dimension = this.settings.dimension;
		let dayCircle = this.settings.dayCircle;
		let dayDuration = this.settings.dayDuration;
		
		var simplex = new SimplexNoiseObject(this.seed);
		
		let land = simplex.octaveNoise2(x, y, 100, [0.2, 0.3, 1]);
		let path = Math.abs(simplex.octaveNoise2(x, y, 150, [0.3, 1]));
		let river = Math.abs(simplex.octaveNoise2(x, y, 140, [0.3, 1]));
		let forest = simplex.octaveNoise2(x, y, 60, [0.2, 0.3, 1]);
		
		
		let rand = new Random();
		
		tile.floor = Blocks.grass.getWithVariant(rand.basic(0, Blocks.grass.variants-1));
		
		if(land <= -0.4){
			//ocean
			tile.floor = land < -0.5 ? Blocks.deepWater : Blocks.water;
			tile.elevation = 0;
			tile.biome = 'ocean';
		}else{
			if(river <= 0.03){
				//rivers
				tile.floor = Blocks.water;
				tile.biome = 'river';
			}else if(river <= 0.1){
				//bitches
				tile.floor = Blocks.sand;
				tile.biome = 'beach';
				
				if(river >= 0.07 && path <= 0.02)
					tile.floor = Blocks.dirt;
			}else{
			    //land
			    if(rand.chance(1))
			        tile.overlay = Blocks.flowers.getWithVariant(rand.basic(0, Blocks.flowers.variants-1));
				
				if(rand.chance(1))
			        tile.overlay = Blocks.pebbles.getWithVariant(rand.basic(0, Blocks.pebbles.variants-1));
			
				tile.elevation = Math.round(river * 5);
				tile.biome = 'meadow';
				
				if(forest >= 0.1)
					tile.biome = 'forest';
				
				if(river >= 0.55){
                    tile.elevation = 3;
			        tile.floor = Blocks.stone;
					
					tile.biome = 'plateau';
				}
				
				if(path <= 0.02)
					tile.floor = Blocks.dirt;
            }	
        }
		
		/*if(land > -0.4 && tile.biome != 'river')
		    tile.elevation += Math.floor(land*2)*/
		
		if(dayCircle)
			tile.light = () => {
				let dimensionTime = Core.time - dimension.generateTime;
				
				let playerx = Vars.changeable.player.position.x;
				let playery = Vars.changeable.player.position.y;
				
				let distanceToPlayer = Math.round( Math.sqrt((x-playerx)**2 + (y-playery)**2) );
				
				return Math.max((Math.round(Vars.maxLight/2 * Math.cos(dimensionTime / dayDuration/2)) + Vars.maxLight - distanceToPlayer), 0);
			};
		
		return tile;
	}
	
	postGenerate(){
		super.postGenerate();
		
		let rand = new Random();
		
		/* generate structures */
		for(let y = 0; y < this.height; y++){
		    for(let x = 0; x < this.width; x++){
				let tile = this.tiles.get(x, y);
				
				if(tile.biome == 'ocean')
					continue;
				
				if(tile.biome == 'forest'){
			        if(rand.chanceSeed(this.seed+(x**y), 10+3) && Structures.tree.canSet(this.tiles, x, y))
				        Structures.tree.set(this.tiles, x, y);
				}
					
		        if(tile.biome == 'plateau'){
					if(rand.chanceSeed(this.seed+(x**y), 10+0.01) && Structures.mine.canSet(this.tiles, x, y))
				        Structures.mine.set(this.tiles, x, y);
				}
	        }
	    }	
	}
}
