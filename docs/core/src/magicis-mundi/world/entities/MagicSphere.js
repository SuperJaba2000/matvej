class MagicSphere extends Entity{

	constructor(name, size, color, lifeTime){
		super(name, 10);
		
		this.color = color;
		this.size = size;
		this.lifeTime = lifeTime;
	}
	
	textureRegion(){
		return this.textures[0];
	}
	
	update(){
		if(Core.time - this.spawnTime >= this.lifeTime)
			this.kill();
		
		let timeScale = Core.time % Vars.changeable.fps;
		
		if(timeScale == 0)
			timeScale = 59;
		
		let positionDelta = Math.floor(10*(this.speed / Vars.changeable.fps)) / 10;
		
		switch(this.orientation){
			case 1:
			        this.position.offsetY -= positionDelta;
				this.position.offsetX = 16 * Math.sin(timeScale/4);
			            break;
			case 2:
			        this.position.offsetX += positionDelta;
			            break;
			case 3:
			        this.position.offsetY += positionDelta;
			            break;
			case 4:
			        this.position.offsetX -= positionDelta;
			            break;
		}
		
		if(this.position.offsetX >= Vars.tileSize / 2){
			this.position.x += Math.floor(this.position.offSetX / Vars.tileSize * 2);
			this.position.offsetX = Vars.tileSize/2;
			return;
		}
		if(this.position.offsetX <= -Vars.tileSize / 2){
			this.position.x += Math.floor(this.position.offSetX / Vars.tileSize * 2);
			this.position.offsetX = Vars.tileSize/2;
			return;
		}
		
		/*if(this.position.offsetY >= Vars.tileSize / 2){
			this.position.y += Math.floor(this.position.offSetY / Vars.tileSize * 2);
			this.position.offsetY = Vars.tileSize/2;
			return;
		}*/
		if(this.position.offsetY <= -16){
			this.position.y --//= Math.floor(this.position.offsetY / 16);
			this.position.offsetY += 32;
		}
	}
	
	at(map, x, y){
		this.spawnTime = Core.time;
		super.at(map, x, y);
	}
	
	kill(){
	        this.map.tiles.upd(this.position.x, this.position.y, {block: Blocks.fire});
		
		super.kill();
	}
}