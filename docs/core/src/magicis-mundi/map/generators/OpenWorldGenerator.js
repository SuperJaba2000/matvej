class OpenWorldGenerator extends BasicGenerator{
	constructor(seed){
		super(seed);
		
	    this.OCTAVES = [0.2, 0.4, 1.2, 3];
	    this.OCTAVES2 = [0.2, 0.84, 2.67];
	}
	
	genTile(x, y){
		let tile = super.genTile(x, y);

        var simplex = new SimplexNoiseObject(this.seed);
		
		let l = simplex.octaveNoise2(x, y, 20, this.OCTAVES2);
		let e = Math.abs(simplex.octaveNoise2(x, y, 45, this.OCTAVES2));
		let b = simplex.octaveNoise2(x, y, 295, [1, 0.2, 0.08]);
		let f = simplex.octaveNoise2(x, y, 400, [1, 0.6, 0.08]);
		
		if(l < -0.25){
			tile.biome = 'ocean';
			tile.floor = deepWater;
		}else if(l < -0.15 && e > 0.15){
                        tile.floor = water;
			tile.biome = 'ocean';
		}else if(l < 0 && e > 0.15){
                        tile.floor = sandFloor;
			tile.biome = 'ocean_beach';
		}else if(l < 0 && e < 0.15){
			tile.floor = Blocks.deepWater;
			tile.biome = 'river_mouth';
		}else{
		        if(e < 0.15){
	                        //if(b > 0.55){
			        //        tile.floor = random.chance(8) ? grassFloorSwamp : e < 0.14 ? deepWaterSwamp : waterSwamp;
                                //        tile.biome = swamp;					
			        //}else{
				        tile.floor = e < 0.1 ? deepWater : water;
				        tile.biome = river;
			       // }
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
}
