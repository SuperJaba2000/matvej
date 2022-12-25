class Block{	
	constructor(name, color, settings) {
		this.color = "#000000";
	    this.stillDrawFloor = false;
			
		this.hasShadow = true;
	    this.hasLight = false;
	    this.lightLevel = 20;
		
	    this.animated = false;
		this.frames = 1;
		
	    this.alwaysDrawFloor = false;
	
	    this.group = "blocks";

		//this.textures[0] = new Image(); this.textures[0].src = "assets/sprites/classicTexture.jpg";
		
		this.name = name;
	    this.color = color;
		
		this.variant = 0;
		
		for(let key in settings){
			this[key] = settings[key];
		}
			
		this.textures = [];
		this.textures.length = this.variants;
		
		Blocks.add(this);
    }
	
	/*draw(context, x, y){
		//???
	}*/
	
	getWithVariant(variant){
		const returned = Object.create(this);
		returned.variant = variant;
		
		return returned;
	}
	
    textureRegion(){
		if(!this.animated)
			return this.textures[this.variant];
						
		let timeScale = Core.time % (Vars.changeable.fps/this.frames);		
		let frame = Math.floor(timeScale / (Vars.changeable.fps/this.frames / this.variants));
						
		return this.textures[frame];
    }
		
	playerEntered(player, map){
		let save = {
			player: player,
			x: player.position.x,
			y: player.position.y,
		}
		return save;
	}
}

/*
function extendContent(c){
	return Object.assign(new c(arguments[1], arguments[2]), arguments[arguments.length - 1]);
}
*/