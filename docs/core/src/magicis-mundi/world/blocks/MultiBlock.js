class MultiBlock extends Block{	
	constructor(name, color, settings) {
		settings.variants = settings.width*settings.height;
		
        super(name, color, settings);
		
		this.isMultiBlock = true;

		//this.textures[0] = new Image(); this.textures[0].src = "assets/sprites/classicTexture.jpg";
			
		//this.textures.length = this.size*this.size;
    }
}

/*
function extendContent(c){
	return Object.assign(new c(arguments[1], arguments[2]), arguments[arguments.length - 1]);
}
*/