/*class ItemStack extends  Block{
	
	group = "overlays";
	
	maxItems = 1;
	
	items = [];
	
	hasShadow = false;
	
	constructor() {		
		super('item-stack', '#000000', 0);
        }
		
        with(){
		for(let i in arguments){
			if (i % 2 == 0)
				continue;
			
			for(let e = 0; e < arguments[i+1]; e++){
				this.items.push[arguments[i]];
				
				if(this.items.length >= this.maxItems)
					return this;
			}
		}
		
		return this;	
	}
}*/