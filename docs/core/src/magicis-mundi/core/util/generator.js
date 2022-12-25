class BaseGenerator {
	width = 0; height = 0;
	SEED = Math.random();
	
	constructor(){};
	
	setSeed(value){
		typeof (Number(value)) == "number" ? this.SEED = value : console.error("Seed must be a number!");
		noise.setSeed(this.SEED);
	}
	
	CX(){ return -(this.width - Math.round(this.width / 2)) }
        CY(){ return (this.height - Math.round(this.height / 2)) }
		
	genTile(y, x){
		let tile = new Tile(n, n, n);
		tile.x = this.CX()+x; tile.y = this.CY()-y;
                return tile;
	}
	
        generate(){
		let tiles = Array(this.height).fill().map(()=>Array(this.width).fill());
	        tiles.length = this.height;
			
	        for(var y = 0; y < this.height; y++){
	    	        tiles[y].length = this.width;
		        for(var x = 0; x < this.width; x++){
			        tiles[y][x] = this.genTile(x, y)
					
				//generation barriers around map
				if(y == 0 || x == 0) tiles[y][x].block = barrierBlock;
				if(y == (this.height-1) || x == (this.width-1)) tiles[y][x].block = barrierBlock;
		        }
	        }	
			
	        return this.postGenerate(tiles);
	}
	
	postGenerate(tiles){return tiles};
}

class CaveGenerator extends BaseGenerator {
	
	arr = {
		floors: [],
		blocks: []
	}
	
	SPAWN = {x: 150, y: 150};
	
	genTile(x, y) {
		var tile = super.genTile(x, y);
		
		if(this.isAir(x, y, -0.2, 45, false)){
			tile.floor = stoneFloor;
		}else{
			tile.floor = stoneFloor;
			if(this.isAir(x, y, 0.1, 65, true)){
				//air
			}else{
			        tile.block = leavesBlock;
			}
		}
		
		return tile;
	}
	
	isAir(x, y, threshold, scale, abs) {
		let n = abs ? Math.abs(noise.octaveSimplex(x, y, scale, [1.4, 1, 0.67, 0.24, 0.11, 0.08])) : noise.octaveSimplex(x, y, scale, [1, 0.47, 0.24]);
		
		if(n >= threshold) 
			return false;
		
		return true;
		
	}
	
}

class OpenWorldGenerator extends BaseGenerator {
	
	OCTAVES = [0.2, 0.4, 1.2, 3];
	OCTAVES2 = [0.2, 0.84, 2.67];
	STRUCTURES = [spawnShip, test_tree];
	
	SPAWN = {};
	
	genTile(x, y) {
		var tile = super.genTile(x, y);
		let l = noise.octaveSimplex(x, y, 20, this.OCTAVES2);
		let e = Math.abs(noise.octaveSimplex(x, y, 45, this.OCTAVES2));
		let b = noise.octaveSimplex(x, y, 295, [1, 0.2, 0.08]);
		let f = noise.octaveSimplex(x, y, 400, [1, 0.6, 0.08]);
		
		if(l < -0.25){
			tile.biome = ocean;
			tile.floor = deepWater;
		}else if(l < -0.15 && e > 0.15){
                        tile.floor = water;
			tile.biome = ocean;
		}else if(l < 0 && e > 0.15){
                        tile.floor = sandFloor;
			tile.biome = ocean_beach;
		}else if(l < 0 && e < 0.15){
			tile.floor = deepWater;
			tile.biome = river_mouth;
		}else{
		        if(e < 0.15){
	                        if(b > 0.55){
			                tile.floor = random.chance(8) ? grassFloorSwamp : e < 0.14 ? deepWaterSwamp : waterSwamp;
                                        tile.biome = swamp;					
			        }else{
				        tile.floor = e < 0.1 ? deepWater : water;
				        tile.biome = river;
			        }
	                }else if(e < 0.35){
	                        if(b > 0.55){
			                tile.floor = random.chance(26) ? waterSwamp : (random.chance(8) ? grassFloor : grassFloorSwamp);
                                        tile.biome = swamp;					
			        }else{
				        tile.floor = sandFloor;
				        tile.biome = river_beach;
			        }
	                }else if(e < 0.66){
                                if(b > 0.55){
			                tile.floor = grassFloorSwamp;
                                        tile.biome = swamp;					
			        }else{
				        tile.floor = grassFloor;
				        tile.biome = (f > 0.2 ? forest :  meadow);
			        }
	                }else if(e < 0.84){
			        tile.floor = stoneFloor;
			        tile.biome = classic_mountains;
		        }else{
			        tile.floor = snowFloor;	
                                tile.biome = classic_mountains;				
		        }
		}
		
		return tile;
	}
	
	postGenerate(ts){
		//generate structures
		
		var tiles = ts;
		
		for(var y = 0; y < this.height; y++){
		        for(var x = 0; x < this.width; x++){
				let tile = tiles[y][x];
				noise.setSeed(this.SEED + Math.round((x*2)+(y/2)) );
				
				if(noise.simplex2(x/30, y/30) > 0.9){
					if(tile.biome == "swamp" && (tile.floor == water || tile.floor == deepWater) ){
						tile.block = nenuphar;
					}
				}
				tiles[y][x] = tile;
		        }
	        }
		

		/*while(this.SPAWN.x == undefined){
			var x = random.basic(1, this.widht);
			var y = random.basic(1, this.height);
			
			//console.log(tiles[y][x]);//
			
			if(tile.biome == "ocean-beach"){
				this.SPAWN.x = x;
				this.SPAWN.y = y;
				
				tile.floor = stoneFloor;
				tiles[y][x] = tile;
			}
		}*/
		
		for(var y = 0; y < this.height; y++) {
                        for (var x = 0; x < this.width; x++) {
                                if(y % (random.basic(2, 7) -random.basic(0, 1)) == 0 && x % (random.basic(2, 7) -random.basic(0, 1)) == 0){
					if(
					        tiles[y][x].biome !== null &&
					        tiles[y][x].biome.treeChance !== 0  &&
						random.chance(tiles[y][x].biome.treeChance)
					) tiles = this.STRUCTURES[1].set(tiles, x, y);			
				}	
                        }
                }
		
		tiles = this.STRUCTURES[0].set(tiles, 150, 150);
		
		
		return tiles;	
	}
}