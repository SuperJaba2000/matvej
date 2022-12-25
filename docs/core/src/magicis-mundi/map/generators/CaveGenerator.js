class CaveGenerator extends BasicGenerator{
	genTile(x, y){
		let tile = super.genTile(x, y);
		
		var simplex = new SimplexNoiseObject(this.seed);
		
		//simplex.setSeed(this.seed);
		let andesite = simplex.octaveNoise2(x, y, 35, [0.3, 0.02, 1]);
		
		//simplex.setSeed(this.seed*this.seed);
		let block = simplex.octaveNoise2(x, y, 60, [0.04, 0.09, 0.4, 1]);
		let cracked = simplex.octaveNoise2(x, y, 20, [0.12, 1]);
		let block2 = Math.abs( simplex.octaveNoise2(x, y, 20, [0.2, 0.03, 1]) );
		
		//simplex.setSeed(this.seed**this.seed);
		let dirt = simplex.octaveNoise2(x, y, 20, [0.04, 0.2, 1]);
		
		if(andesite > 0.15)
			tile.floor = Blocks.andesite;
		
		if(block > -1){
			if(cracked > 0  && block2 > 0.4){
			        //tile.block = Blocks.stoneBlock;
		                tile.floor = Blocks.stone;
			}
		}
		
		/*if(dirt > 0.4)
			tile.floor = Blocks.dirt;*/
		
		return tile;
	}
}
