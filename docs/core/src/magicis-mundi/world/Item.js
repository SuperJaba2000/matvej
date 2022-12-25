class Item{
	
	color = "#000000";
	
	group = "items";
	
	animated = false;
			
	constructor(name, color, variants) {
		this.name = name;
	        this.color = color;
		this.textures.length = variants == 0 ? 1 : variants;
		
		this.variants = variants;
        }
	
        textureRegion(variant){
		return this.textures[variant];
        }
		
	use(player){
		//FOR OTHER CLASSES
	}
		
	textures = [];
}
