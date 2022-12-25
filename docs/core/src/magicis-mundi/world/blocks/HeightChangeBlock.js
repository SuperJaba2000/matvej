class HeightChangeBlock extends  Block{
	
	constructor(name, color, settings){
		super(name, color, settings);
		
		this.heightDelta = settings.heightDelta;
	}
	
	playerEntered(player, map){
	        let save = super.playerEntered(player, map);
	
	        map.getActiveWorld().getActiveDimension().entities.array = [];
	
	        map.getActiveWorld().activeDimension += this.heightDelta;
			
		let nextDimension = map.getActiveWorld().getActiveDimension();
		//nextDimension.entities.add(save.player);
		
       	        //nextDimension.tiles.upd(save.x, save.y, {block: Blocks.ladder});
	}
}