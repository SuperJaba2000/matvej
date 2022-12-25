const Blocks = new ContentList(
	function load(){
		//region environment
		
	    this.stone = new Floor('stone', '#676a78', { 
		    variants: 1, 
			priority: 5 
		});
		
	    this.andesite = new Floor('andesite', '#807a8a', { 
		    variants: 1, 
			priority: 6 
		});
		
		this.stoneBlock = new Block('stone-block', '#575a68', { 
		    variants: 1 
		});
		
		
		this.pebbles = new Overlay('pebbles', '#676a78', { 
		    variants: 2 
		});
		
		this.flowers = new Overlay('flowers', '#ffffff', { 
		    variants: 1 
		});
	
		
	    this.grass = new Floor('grass', '#00FF00', { 
		    variants: 2, 
			priority: 9 
		});
		
	    this.dirt = new Floor('dirt', '#69392b', { 
		    variants: 1, 
			priority: 7 
		});
			
		this.mud = new Floor('mud', '#69392b', { 
		    variants: 1, 
			priority: 8 
		});
		
	    this.sand = new Floor('sand', '#FFFF00', { 
		    variants: 1, 
			priority: 10 
		});
	
	
	    this.water = new Floor('water', '#0000FF', { 
		    variants: 1, 
			priority: 4 
		});
		
	    this.deepWater = new Floor('deep-water', '#0000AA', { 
		    variants: 1, 
			priority: 3,
			canWalk: false
		});
		
		this.void = new Floor('void', '#000000', {
			variants: 1, 
			priority: -1,
			canWalk: false
		});
		
		this.distortedGrass = new Floor('distorted-grass', '#000000', {
			variants: 2, 
			priority: 9 
		});
	
	    //endregion
	    //region special
			
		this.mine = new MultiBlock('mine', '#000000', {
			width: 3,
			height: 3,
			
			playerEntered: function(player, map){
	            //map.getActiveWorld().getActiveDimension().entities.array = [];
	            map.activeWorld = 1;
			
		        //let nextDimension = map.getActiveWorld().getActiveDimension();
		        //nextDimension.entities.add(save.player);
		
       	        //nextDimension.tiles.upd(save.x, save.y, {block: Blocks.ladder});
			}
		});
		
		this.tree = new MultiBlock('tree', '#000000', {
			width: 2,
			height: 3,
			alwaysDrawFloor: true
		});
			
	    this.fire = new Block('fire', '#FF0000', { 
		    variants: 3, 
			frames: 3,
			animated: true, 
			alwaysDrawFloor: true,
			hasLight: true
		});
	    this.ladder = new HeightChangeBlock('ladder', '#8a5139', {
			heightDelta: 1,
			variants: 1
		});
		
		//endregion
	}, true
);

//Blocks.ladder.alwaysDrawFloor = true;